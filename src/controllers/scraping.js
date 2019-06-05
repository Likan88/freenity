const _ = require('lodash')
const _url = require('url')
const embed = require("embed-video")
const cheerio = require('cheerio')
const htmlMetadata = require('html-metadata')
const moment = require('moment')
const rp = require('request-promise')
const preq = require('preq')
const zlib = require('zlib')
const iconv = require('iconv-lite')
const detectCharacterEncoding = require('detect-character-encoding')

let response = {
    title: null,
    description: null,
    site_name: null,
    url: null,
    files: [],
    author: {},
    date: moment().format('D.M.YYYY')
}

async function returnResults(url, data, isDomainInEncodingList) {
    await getResponse(data, url, isDomainInEncodingList)
    
    return {
        response: response
    }
}

function getBuildedMetaObject(data) {
    let buildedMeta = {
        general: {},
        openGraph: {},
        twitter: {},
        schemaOrg: {}
    }

    let schemaOrg = {}

    parseMetaObjects(data.schemaOrg, 'schemaOrg')

    function parseMetaObjects(item, index, prevIndex) {
        if (item instanceof Object) {
            for (let _index in item) {
                parseMetaObjects(item[_index], _index, index)
            }
        } else {
            schemaOrg[prevIndex] = item
        }
    }

    if (data.general) {
        buildedMeta.general = {
            title: data.general.title,
            description: data.general.description
        }
    }
    if (data.openGraph) {
		if (data.general.author=='NDR') {
			buildedMeta.openGraph = {
				title: data.openGraph.title,
				description: data.openGraph.description,
				site_name: 'NDR',
				url: 'https://www.ndr.de/',
				image: 'https://www.ndr.de/apple-touch-icon-152x152.png'
			}
		} else {
			buildedMeta.openGraph = {
				title: data.openGraph.title,
				description: data.openGraph.description,
				site_name: data.openGraph.site_name,
				url: data.openGraph.url,
				image: data.openGraph.image.url
			}			
		}
    }
	
    if (data.twitter) {
        buildedMeta.twitter = {
            title: data.twitter.title,
            description: data.twitter.description,
            site: data.twitter.site,
            image: data.twitter.image
        }
    }
    if (schemaOrg) {
        buildedMeta.schemaOrg = {
            title: schemaOrg.name,
            description: schemaOrg.description,
            thumbnail_url: schemaOrg.thumbnailUrl,
            embed_url: schemaOrg.embedURL || schemaOrg.embedUrl,
            date: schemaOrg.datePublished
        }
    }
    if (data.general) {
        buildedMeta.general = {
            title: data.general.title,
            description: data.general.description
        }
    }

    return buildedMeta
}

async function getFilesObject(url, image, passedEmbed) {
    let file = []

    if (passedEmbed) {
        file = [{ type: 'iframe', url: passedEmbed, preview: image }]
    } else {
        let embedData = embed(url)

        if (embedData) {
            let embedDataIframe = cheerio.load(embedData)
            let embedDataUrl = embedDataIframe('iframe').prop('src')

            await getVideoPreview(url).then(result => {
                file = [{ type: 'iframe', url: embedDataUrl, preview: result }]
            }).catch(() => {
                file = [{ type: 'iframe', url: embedDataUrl, preview: image }]
            })
        } else {
            if (image) {
                file = [{ type: 'image', url: image, preview: image }]
            }
        }
    }

    return file
}

function getVideoPreview(url) {
    return new Promise((res, rej) => {
        embedImagePromise(url)
        .then(result => {
            res(result)
        })
    })
}

function embedImagePromise(url) {
    return new Promise((res, rej) => {
        embed.image(url, {image: 'mqdefault'}, function (err, thumbnail) {
            if (err) rej()
    
            res(thumbnail.src)
        })
    })
}

async function getResponse(data, url, isDomainInEncodingList) {

	urls=url.split('.');
	
	if (urls[urls.length - 1]=='jpg' || urls[urls.length - 1]=='jpeg' || urls[urls.length - 1]=='gif' || urls[urls.length - 1]=='png') {

 		response.title = null
		response.description = null
		response.url = null
		response.site_name = null
		response.author = {}
		response.files = [{ type: 'image', url: url, preview: url }]

	} else {
	let meta = getBuildedMetaObject(data)
	
	let title = meta.general.title || meta.openGraph.title || meta.twitter.title || meta.schemaOrg.title
	let description = meta.general.description || meta.openGraph.description || meta.twitter.description || meta.schemaOrg.description
	let image = meta.openGraph.image || meta.twitter.image || meta.schemaOrg.thumbnail_url
	
	if (title) {
		if (isDomainInEncodingList)
			title = iconv.decode(new Buffer(title, 'binary'), detectCharacterEncoding(new Buffer(title, 'binary')).encoding)

		response.title = title
	} else {
		response.title = null
	}

	if (description) {
		if (isDomainInEncodingList)
			description = iconv.decode(new Buffer(description, 'binary'), detectCharacterEncoding(new Buffer(description, 'binary')).encoding)

		response.description = description
	} else {
		response.description = null
	}

	if (meta.openGraph.url) {
		response.url = meta.openGraph.url
	} else {
		response.url = url
	}

	response.site_name = _url.parse(response.url).hostname

	if (meta.twitter.site) {
		if (isDomainInEncodingList)
			meta.twitter.site = iconv.decode(new Buffer(meta.twitter.site, 'binary'), detectCharacterEncoding(new Buffer(meta.twitter.site, 'binary')).encoding)
 
		response.author = { name: meta.twitter.site, url: '//twitter.com/' + meta.twitter.site }
	} else {
		response.author = {}
	}

	let images=image;

	if (typeof image === 'object' && image !== null) images=image.src;

	response.files = await getFilesObject(response.url, images, meta.schemaOrg.embed_url)
	}
}

exports.meta = async (req, res) => {
	
	let img = false

	urls=req.body.url.split('?')[0].split('.')
	
	if (urls[urls.length - 1]=='jpg' || urls[urls.length - 1]=='jpeg' || urls[urls.length - 1]=='gif' || urls[urls.length - 1]=='png') img = true

	if (img) req.body.url=req.body.url.split('?')[0];
			
	let pageUrl = decodeURIComponent(req.body.url)
	
	if (img) {
		let response = await returnResults(pageUrl, '', false)
		res.status(200).json(response)	
	} else {
		
    let protocol = _.includes(pageUrl, 'https:') ? 'https' : 'http'

    if (!_.includes(pageUrl, 'https') && !_.includes(pageUrl, 'http')) {
        protocol = 'https'
        pageUrl = protocol + '://' + pageUrl
    }

    let headers = {
        'Accept-Language': 'en-EN'
    }

    if (_.includes(pageUrl, 'facebook.com')) {
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36',
            'Accept-Language': 'en-EN'
        }
    }
	
    let encodingList = [
        'fontanka.ru',
    ]

    let isDomainInEncodingList = false

    encodingList.some(function (domain) {
        if (_.includes(pageUrl, domain)) {
            isDomainInEncodingList = true
        } else {
            isDomainInEncodingList = false
        }
        return _.includes(pageUrl, domain)
    })		
		
		
		htmlMetadata({
			url: pageUrl,
			headers: headers,
			encoding: isDomainInEncodingList ? 'binary' : null
		}).then(async function (result) {
			let response = await returnResults(pageUrl, result, isDomainInEncodingList)
			res.status(200).json(response)
		}).catch(error => {
			if (error.status === 504 && protocol === 'https') {
				const httpUrl = pageUrl.replace('https:', 'http:')
				htmlMetadata({
					url: httpUrl,
					headers: headers,
					encoding: 'binary'
				}).then(async function (result) {
					let response = await returnResults(httpUrl, result)
					return res.status(200).json(response)
				}).catch(error2 => {
					error2.message = 'Unable to get data according to your request.'
					return res.status(error2.status || 400).json(error2)
				})
			}
			else {
				error.message = 'Unable to get data according to your request.'
				return res.status(error.status || 400).json(error)
			}
		})
	
	}
}