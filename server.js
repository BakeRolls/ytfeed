'use strict'

let express = require('express')
let ytdl = require('youtube-dl')
let YouTube = require('./YouTube')
let Feed = require('./Feed')
let config = require('./config')

let app = express()
let feed = new Feed()

let https = (req) => req.headers['x-forwarded-proto'] == 'https'
let build = (data, json) => (json || false) ? data : feed.build(data)

app.get('/', (req, res) => {
	res.setHeader('content-type', 'application/rss+xml')
	res.send(build({
		title: 'Error',
		link: 'https://192k.pw/2015/12/06/youtube-podcast-feeds/',
		description: '/:channel/:filter?'
	}, !!req.query.json))
})

app.get('/v/:id([a-z0-9_\-]{10,20})/:format([a-z0-9]{3,4})?', (req, res) => {
	ytdl.getInfo(req.params.id, (err, info) => {
		if(err) res.send(build({
			title: 'Error',
			description: 'Video not found.'
		}, !!req.query.json))

		let format = info.formats.filter((format) => {
			return format.format_id == config.formats[req.params.format || config.defaultFormat].id
		})[0]

		res.redirect((format && format.url) ? format.url : info.url)
	})
})

app.get('/:channel([a-z0-9_\-]{1,50})/:filter([a-z0-9_\-]{1,50})?', (req, res) => {
	res.setHeader('content-type', 'application/rss+xml')

	let channel = req.params.channel
	let filter = req.params.filter || ''
	let host = 'http' + (https(req) ? 's' : '') + '://' + config.host
	let path = req.originalUrl
	let format = (config.formats[req.query.format]) ? req.query.format : config.defaultFormat
	let title = (req.query.title) ? req.query.title.substring(0, 50) : undefined

	new YouTube(channel, filter, format, title, host, path).then((data) => {
		res.send(build(data, !!req.query.json))
	}, (err) => {
		res.send(build({
			title: 'Error',
			description: 'Channel not found.'
		}, !!req.query.json))
	})
})

app.listen(config.port)
