'use strict';

const _ = require('lodash')
const _url = require('url')
const embed = require("embed-video")
const cheerio = require('cheerio')
const htmlMetadata = require('html-metadata')
const CDP = require('chrome-remote-interface')

const parseDOM = (domString, pageSel, complete, deep) => {
	const getElementReference = $element => ($element[0].name) + ($element.attr('class') ? '_'+$element.attr('class').replace(/ /g, '_') : '') + ($element.attr('id') ? '$'+$element.attr('id') : '');

	const traverseChildren = function (parentObj, obj, i, elem) {
		const $node = $(elem);
		const nodeRef = getElementReference($node);
		if ($node.children().length > 0) {
			obj[nodeRef] = obj[nodeRef] || {};
			if ($node.text().length > 0) {
				obj[nodeRef].$text = $node.text();
			}
			$node.children().each(traverseChildren.bind(undefined, obj, obj[nodeRef]));
		}
		else {
			obj[nodeRef] = $node.text();
		}
		if ($node.text() === _.get(parentObj, '$text')) {
			delete parentObj.$text;
		}
	};

	const $ = cheerio.load(domString);
	const resultArray = $(pageSel).map(function (i, el) {
		if (complete) {
			return $(this).toString();
		}
		else if (deep) {
			let deepObj = {};
			traverseChildren(undefined, deepObj, undefined, this);
			return deepObj;
		}	
		else {
			return $(this).text();
		}
    }).get();
    
	return resultArray;
};

async function returnResults (url, metadata) {
	let response = {
		title: null,
		description: null,
		site_name: null,
		url: url,
		files: [],
		author: {},
		date: new Date()
	};

	response = await fillResponseObject(metadata, response)
	//await fillResponseFileObject

	return response;
};

async function fillResponseFileObject(url, image) {
	let embedData = embed(url)

	if (embedData) {
		let embedDataIframe = cheerio.load(embedData);
		let embedDataUrl = embedDataIframe('iframe').prop('src');

		await embed.image(response.url, {image: 'mqdefault'}, async function (err, thumbnail) {
			try {
				response.files = await [{ type: 'video', url: embedDataUrl, preview: thumbnail.src }];
				console.log(thumbnail.src)
				console.log('1 - ' + new Date().getMilliseconds())
			} catch(error) {
				if (image) {
					response.files = await [{ type: 'image', url: image, preview: null }]
				}
			}
		});
	} else {
		if (image) {
			response.files = [{ type: 'image', url: image, preview: null }]
		}
	}
}

async function fillResponseObject(metadata, response) {
	let mergedMetadata = {};

	function parseObject(item, index) {
		if (index == 'player') {
			mergedMetadata[index] = item;
		} else if (item instanceof Object) {
			for (let _index in item) {
				parseObject(item[_index], _index);
			}
		} else if (item instanceof Array) {
			for (let _index in item) {
				parseObject(item[_index], _index);
			}
		} else {
			mergedMetadata[index] = item;
		}
	}

	for (let index in metadata) {
		if (index == 'general' || index == 'openGraph' || index == 'twitter')
			parseObject(metadata[index], index);
	}

	if (mergedMetadata.title) {
		response.title = mergedMetadata.title;
	}

	if (mergedMetadata.description) {
		response.description = mergedMetadata.description;
	}

	if (mergedMetadata.url) {
		response.url = mergedMetadata.url;
	}

	if (mergedMetadata.site_name) {
		response.site_name = mergedMetadata.site_name;
	} else {
		response.site_name = _url.parse(response.url).hostname;
	}

	if (mergedMetadata.site) {
		response.author = { name: mergedMetadata.site, url: '//twitter.com/' + mergedMetadata.site };
	} else if (mergedMetadata.creator) {
		response.author = { name: mergedMetadata.creator, url: '//twitter.com/' + mergedMetadata.creator };
	} else if (mergedMetadata.author) {
		response.author = { name: mergedMetadata.author, url: '//' + mergedMetadata.author }
	}

	response.files = await fillResponseFileObject(response.url, mergedMetadata.image)
		.then(result => {
			console.log(result);
		})

	return response
}

exports.scrapeChrome = async (req, res, next) => {
	const pageUrl = decodeURIComponent(req.query.url);
	// Use $ instead of # to allow for easier URL parsing
	const pageSelector = decodeURIComponent(req.query.selector || 'body').replace(/\$/g, '#');
	const loadExtraTime = req.query.time || 0;
	const deepResults = req.query.deep || false;
	const completeResults = req.query.complete || false;
	const timeStart = Date.now();

	console.log(`Scrape: "${pageUrl}", "${pageSelector}", ${loadExtraTime} ms`);

	CDP((client) => {
        const {Page, Runtime} = client;
        
		Promise.all([
			Page.enable()
		]).then(() => {
			return Page.navigate({ url: pageUrl });
		});

		Page.loadEventFired(() => {
			setTimeout(() => {
				Runtime.evaluate({ expression: 'document.body.outerHTML' }).then((result) => {
					const selectorsArray = pageSelector.split(',');
					const resultsObj = selectorsArray.map((sel) => {
						const resultArray = parseDOM(result.result.value, sel, completeResults, deepResults);
						return { selector: sel, count: resultArray.length, items: resultArray };
					});
					const timeFinish = Date.now();
					client.close();
					res.json({ time: (timeFinish-timeStart), results: resultsObj });
				});
			}, loadExtraTime);
		});
	}).on('error', (err) => {
		console.error('Cannot connect to browser:', err);
		res.status(400).json({ error: err });
	});
};

exports.scrapeMeta = async (req, res) => {
	const pageUrl = decodeURIComponent(req.query.url);
	const protocol = _.includes(pageUrl, 'https:') ? 'https' : 'http';

	htmlMetadata(pageUrl)
		.then(async function (result) {
			let response = await returnResults(pageUrl, result);
			res.status(200).json(response);
		})
		.catch(function (error) {
			if (error.status === 504 && protocol === 'https') {
				const httpUrl = pageUrl.replace('https:', 'http:');
				htmlMetadata(httpUrl)
					.then(function (result) {
						let response = returnResults(httpUrl, result);
						res.status(200).json(response);
					})
					.catch(error2 => res.status(error2.status || 400).json(error2));
			}
			else {
				res.status(error.status || 400).json(error);
			}
		});
};