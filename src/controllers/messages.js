const { Message, Favourite } = require('../database/models')
const trunks = require('trunks-log')
const log = new trunks('MESSAGES')
const rp = require('preq')
const rp2 = require('request-promise')
const fs = require("fs")
const embed = require("embed-video")
const cheerio = require('cheerio')
const googleTranslate = require('google-translate')('AIzaSyDM6cogIKTjY-9qqihVxoFonxwvK2vhqTk')

exports.index = async (req, res) => { 
    Message.find()
        .sort([['created_at', -1]])
        .skip(parseInt(req.query.offset))
        .limit(10)
        .exec().then(async (messages) => {
            messages = JSON.parse(JSON.stringify(messages))

            await Promise.all(messages.map(async (message) => {
                await Favourite.findOne({ user_id: req.user === undefined ? null : req.user._id, message_id: message._id })
                    .exec().then((favourite) => {
                        if (favourite) {
                            message.is_favourite = true
                        } else {
                            message.is_favourite = false
                        }
                    }).catch(() => {
                        message.is_favourite = false
                    })
                
                await rp({
                    uri: message.url,
                    resolveWithFullResponse: true
                }).then(response => {
                    if (response.headers['x-frame-options'] == 'SAMEORIGIN' || response.headers['x-frame-options'] == 'DENY' || response.headers['x-frame-options'] == 'ALLOW-FROM') {
                        message.allow_iframe = false
                    } else {
                        message.allow_iframe = true
                    }
                }).catch(err => {
                    message.allow_iframe = false
                })

                if (message.url) {
                    if (embed(message.url)) {
                        let embedDataIframe = cheerio.load(embed(message.url))
                        message.embed = embedDataIframe('iframe').prop('src')
                    }
                }
            }))

            messages = messages.reverse()

            log.success('Retrieved all {} messages', messages.length)
            res.json({ data: messages })
        })
        .catch(err => {
            log.error(err, 'Could not retrieve messages: {}', err.message) 
            res.json({ data: [] })
        })
}

exports.store = async (req, res) => {
    let data = req.body

    if (data._id) {
        Message.findOneAndUpdate({_id: data._id}, {$set: data}, {new: true}).then(async (message) => {
            message = JSON.parse(JSON.stringify(message))

            await Favourite.findOne({ user_id: req.user === undefined ? null : req.user._id, message_id: message._id })
            .exec().then((favourite) => {
                if (favourite) {
                    message.is_favourite = true
                } else {
                    message.is_favourite = false
                }
            }).catch(() => {
                message.is_favourite = false
            })

            await rp({
                uri: message.url,
                resolveWithFullResponse: true
            }).then(response => {
                if (response.headers['x-frame-options'] == 'SAMEORIGIN' || response.headers['x-frame-options'] == 'DENY' || response.headers['x-frame-options'] == 'ALLOW-FROM') {
                    message.allow_iframe = false
                } else {
                    message.allow_iframe = true
                }
            }).catch(err => {
                message.allow_iframe = false
            })

            if (message.url) {
                if (embed(message.url)) {
                    let embedDataIframe = cheerio.load(embed(message.url))
                    message.embed = embedDataIframe('iframe').prop('src')
                }
            }

            log.success('Updated Message: {}', message._id)
            return res.status(200).json({ data: message, method: 'update' })
        })
    } else {
        data.user_id = req.user._id
        let message = new Message(req.body)

        if (message.files[0] && message.files[0].type=='video') {
			await rp2('http://progbuilder.ru/showvideo.php?video='+message.files[0].url)
			.then(function(htmlString) {
                arr=message.files[0].url.split('/')
				message.files[0].preview='files/'+arr[1]+'.jpg';
			})
			.catch(function(error) {
			  console.log('Error: ', error);
			});
                }

		if (message.title) {
			await rp2('https://translation.googleapis.com/language/translate/v2?key=AIzaSyDM6cogIKTjY-9qqihVxoFonxwvK2vhqTk&target=en&q=' + encodeURIComponent(message.title))
			.then(function(htmlString) {
				data = JSON.parse(htmlString.replace(/&quot;/g,'"').replace(/&#39;/g,''));
				message.title_en=data.data.translations[0].translatedText
			})
			.catch(function(error) {
			  console.log('Error: ', error);
			});
		}

		if (message.description) {
			await rp2('https://translation.googleapis.com/language/translate/v2?key=AIzaSyDM6cogIKTjY-9qqihVxoFonxwvK2vhqTk&target=en&q=' + encodeURIComponent(message.description))
			.then(function(htmlString) {
				data = JSON.parse(htmlString.replace(/&quot;/g,'"').replace(/&#39;/g,''));
				message.description_en=data.data.translations[0].translatedText
			})
			.catch(function(error) {
			  console.log('Error: ', error);
			});
		}

		if (message.comment) {
			await rp2('https://translation.googleapis.com/language/translate/v2?key=AIzaSyDM6cogIKTjY-9qqihVxoFonxwvK2vhqTk&target=en&q=' + encodeURIComponent(message.comment))
			.then(function(htmlString) {
				data = JSON.parse(htmlString.replace(/&quot;/g,'"').replace(/&#39;/g,''));
				message.comment_en=data.data.translations[0].translatedText
			})
			.catch(function(error) {
			  console.log('Error: ', error);
			});
		}

        await message.save().then(async (message) => {
            message = JSON.parse(JSON.stringify(message))

            await Favourite.findOne({ user_id: req.user === undefined ? null : req.user._id, message_id: message._id })
            .exec().then((favourite) => {
                if (favourite) {
                    message.is_favourite = true
                } else {
                    message.is_favourite = false
                }
            }).catch(() => {
                message.is_favourite = false
            })

            await rp({
                uri: message.url,
                resolveWithFullResponse: true
            }).then(response => {
                if (response.headers['x-frame-options'] == 'SAMEORIGIN' || response.headers['x-frame-options'] == 'DENY' || response.headers['x-frame-options'] == 'ALLOW-FROM') {
                    message.allow_iframe = false
                } else {
                    message.allow_iframe = true
                }
            }).catch(err => {
                message.allow_iframe = false
            })

            if (message.url) {
                if (embed(message.url)) {
                    let embedDataIframe = cheerio.load(embed(message.url))
                    message.embed = embedDataIframe('iframe').prop('src')
                }
            }

            log.success('Created Message: {}', message._id)
            return res.status(200).json({ data: message, method: 'create' })
        })
        .catch(err => {
            log.error(err, 'Error creating message: {}', message._id)
            let errStatus = err.name === 'ValidationError' ? 400 : 500
            let errMessage = []

            if (err.name == 'ValidationError') {
                for (field in err.errors) {
                    errMessage.push(err.errors[field].message)
                }
            } else {
                errMessage.push('Something went wrong')
            }

            return res.status(errStatus).json({ message: errMessage.join(', ') })
        })
    }
}

exports.show = async (req, res) => {
    Message.findById(req.params.id).then(async (message) => {
        message = JSON.parse(JSON.stringify(message))

        await Favourite.findOne({ user_id: req.user === undefined ? null : req.user._id, message_id: message._id })
            .exec().then((favourite) => {
                if (favourite) {
                    message.is_favourite = true
                } else {
                    message.is_favourite = false
                }
            }).catch(() => {
                message.is_favourite = false
            })

        await rp({
                uri: message.url,
                resolveWithFullResponse: true
            }).then(response => {
                if (response.headers['x-frame-options'] == 'SAMEORIGIN' || response.headers['x-frame-options'] == 'DENY' || response.headers['x-frame-options'] == 'ALLOW-FROM') {
                    message.allow_iframe = false
                } else {
                    message.allow_iframe = true
                }
            }).catch(err => {
                message.allow_iframe = false
            })
        
            if (message.url) {
                if (embed(message.url)) {
                    let embedDataIframe = cheerio.load(embed(message.url))
                    message.embed = embedDataIframe('iframe').prop('src')
                }
            }

        res.status(200).json({
            data: message
        })
    }).catch(() => {
        res.status(200).json({
            data: null
        })
    })
}

exports.delete = async (req, res) => {
    Message.findById(req.params.id).remove().exec()
    res.json({
        message: 'Deleted'
    })
}

exports.seen = async (req, res) => {
    Message.findById(req.params.id).then(message => {
        message.set({ views: message.views + 1 }).save()
    }).catch(err => {})
    
    res.json({
        message: 'Views updated'
    })
}

exports.favourites = async (req, res) => {
    Message.find()
        .sort([['created_at', -1]])
        .exec().then(async (messages) => {
            messages = JSON.parse(JSON.stringify(messages))

            await Promise.all(messages.map(async (message) => {
                await Favourite.findOne({ user_id: req.user._id, message_id: message._id })
                .exec().then((favourite) => {
                    if (favourite) {
                        message.is_favourite = true
                    } else {
                        messages.splice(messages.indexOf(message), 1)
                    }
                }).catch(() => {
                    messages.splice(messages.indexOf(message), 1)
                })

                if (message.is_favourite) {
                    await rp({
                        uri: message.url,
                        resolveWithFullResponse: true
                    }).then(response => {
                        if (response.headers['x-frame-options'] == 'SAMEORIGIN' || response.headers['x-frame-options'] == 'DENY' || response.headers['x-frame-options'] == 'ALLOW-FROM') {
                            message.allow_iframe = false
                        } else {
                            message.allow_iframe = true
                        }
                    }).catch(err => {
                        message.allow_iframe = false
                    })
                }

                if (message.url) {
                    if (embed(message.url)) {
                        let embedDataIframe = cheerio.load(embed(message.url))
                        message.embed = embedDataIframe('iframe').prop('src')
                    }
                }
            }))

            messages = messages.splice(parseInt(req.query.offset), 10)

            messages = messages.reverse()

            log.success('Retrieved all favourite {} messages', messages.length)
            return res.json({ data: messages })
        })
        .catch(err => {
            log.error(err, 'Could not retrieve favourite messages: {}', err.message) 
            return res.json({ data: [] })
        })
}

exports.favourite = async (req, res) => {
    Message.findById(req.params.id).then(message => {
        Favourite.findOne({
            user_id: req.user._id,
            message_id: message._id
        }).then(favourite => {
            favourite.remove()
            log.success('Favourite unset by user {}', favourite.user_id)
            return res.status(200).json({ is_favourite: false, message: 'Favourite unset successfully' })
        }).catch(() => {
            new Favourite({
                user_id: req.user._id,
                message_id: message._id
            }).save().then(favourite => {
                log.success('New favourite by user {}', favourite.user_id)
                return res.status(200).json({ is_favourite: true, message: 'Favourite set successfully' })
            }).catch(err => {
                log.error(err, 'Favourite not set')
                return res.status(400).json({ message: 'Favourite not set' })
            })
        })
    })
}

exports.translationfile = async (req, res) => {
	let data = req.body
	let url = data.url;
	let lang = data.lang;
	let imgurl = data.files[0].preview;
	let title = eval('data.title_'+lang);
	let uid = data._id;
	
	await rp2('http://progbuilder.ru/mercury.php?url=' + encodeURIComponent(url))
	.then(function(data) {
		str = data.replace(/<\/?(img)\b[^<>]*>/g, "")
		googleTranslate.translate(str, lang, function(err, translation) {

			let img='';
			let content='';
			
			if (imgurl) img='<div style="text-align:center;padding:30px;"><img width="100%" src="'+imgurl+'"></div>';
			content='<h1 style="text-align:center;">'+title+'</h1>'+img+translation.translatedText;
			fs.writeFileSync("url/"+uid+"_"+lang+".txt", content);
			
		  return res.status(200).json({ message: 'OK' })
		});
	})
	.catch((e) => { return res.status(400).json({ message: e })} )

}

exports.savetranslation = async (req, res) => {
		let data = req.body

        data.user_id = req.user._id
        let message = new Message(req.body)

        await message.save().then(async (message) => {
            message = JSON.parse(JSON.stringify(message))

            await Favourite.findOne({ user_id: req.user === undefined ? null : req.user._id, message_id: message._id })
            .exec().then((favourite) => {
                if (favourite) {
                    message.is_favourite = true
                } else {
                    message.is_favourite = false
                }
            }).catch(() => {
                message.is_favourite = false
            })

            await rp({
                uri: message.url,
                resolveWithFullResponse: true
            }).then(response => {
                if (response.headers['x-frame-options'] == 'SAMEORIGIN' || response.headers['x-frame-options'] == 'DENY' || response.headers['x-frame-options'] == 'ALLOW-FROM') {
                    message.allow_iframe = false
                } else {
                    message.allow_iframe = true
                }
            }).catch(err => {
                message.allow_iframe = false
            })

            if (message.url) {
                if (embed(message.url)) {
                    let embedDataIframe = cheerio.load(embed(message.url))
                    message.embed = embedDataIframe('iframe').prop('src')
                }
            }

            log.success('Created Message: {}', message._id)
            return res.status(200).json({ data: message, method: 'create' })
        })
        .catch(err => {
            log.error(err, 'Error creating message: {}', message._id)
            let errStatus = err.name === 'ValidationError' ? 400 : 500
            let errMessage = []

            if (err.name == 'ValidationError') {
                for (field in err.errors) {
                    errMessage.push(err.errors[field].message)
                }
            } else {
                errMessage.push('Something went wrong')
            }

            return res.status(errStatus).json({ message: errMessage.join(', ') })
        })
}