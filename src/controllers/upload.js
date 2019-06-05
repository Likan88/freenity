const trunks = require('trunks-log')
const mime = require('mime-types')
const { thumbnail } = require('easyimage')
const fs = require('fs')
const log = new trunks('UPLOAD')

exports.index = async (req, res) => {
    if (!req.files || Object.keys(req.files).length == 0) {
        return res.status(400).json({
            message: 'No files were uploaded.'
        })
    }

    let file = req.files.file
    let file_mimetype = file.mimetype
    let path = 'files/' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + '-' + file.name
    let preview_path = 'files/' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + '-preview-' + file.name

    await file.mv('public/' + path)
        .then(() => {
            let objectType = null

            if (file_mimetype.includes('image')) {
                objectType = 'image'

                thumbnail({
                    src: 'public/' + path,
                    width: 1320,
                    height: 1320
                }).then(function (result) {
                    let source = fs.createReadStream(result.path)
                    let destination = fs.createWriteStream('public/' + preview_path)

                    source.pipe(destination)

                    source.on('end', function () {
                        log.success('Preview moved successfully to {}', preview_path)

                        return res.status(200).json({
                            data: { type: objectType, name: file.name, url: path, preview: preview_path }
                        })
                    })

                    source.on('error', function () { 
                        log.error(err, 'Preview not moved')
                    })
                }).catch(err => {
                    log.error(err, 'Preview not created')
                })
            } else if (file_mimetype.includes('video')) {
                objectType = 'video'

                return res.status(200).json({
                    data: { type: objectType, name: file.name, url: path, preview: preview_path }
                })
            } else if (file_mimetype.includes('audio')) {
                objectType = 'audio'

                return res.status(200).json({
                    data: { type: objectType, name: file.name, url: path, preview: preview_path }
                })
            } else {
                objectType = 'file'

                return res.status(200).json({
                    data: { type: objectType, name: file.name, url: path, preview: preview_path }
                })
            }

            log.success('File uploaded to {}', path)
        }).catch(err => {
            log.error(err, 'File not uploaded')
            return res.status(400).json({
                message: 'File not uploaded'
            })
        })
}