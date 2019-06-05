const { Settings } = require('../database/models')
const trunks = require('trunks-log')
const log = new trunks('SETTINGS')
const rp = require('preq')
const rp2 = require('request-promise')
const fs = require("fs")
const embed = require("embed-video")
const cheerio = require('cheerio')

exports.store = async (req, res) => {
    let data = req.body

	Settings.findOneAndUpdate({_id: data._id}, {$set: data}, {new: true}).then(async (settings) => {
		settings = JSON.parse(JSON.stringify(settings))

		log.success('Updated settings: {}', settings._id)
		return res.status(200).json({ data: settings, method: 'update' })
	})

}

exports.show = async (req, res) => {
    Settings.findById(req.params.id).then(async (settings) => {
        settings = JSON.parse(JSON.stringify(settings))

        res.status(200).json({
            data: settings
        })
    }).catch(() => {
        res.status(200).json({
            data: null
        })
    })
}