'use strict'

let axios = require('axios')
let Feed = require('./Feed')
let config = require('./config')

class YouTube {
	constructor(channel, filter, format, title, host, path) {
		this.channel = this.normalize(channel)
		this.filter = this.normalize(filter)
		this.format = format
		this.title = title
		this.host = host
		this.path = path
		this.feed = new Feed()

		return new Promise((resolve, reject) => {
			this.resolve = resolve
			this.reject = reject

			this.get()
		})
	}

	get() {
		let params = {}

		params[(this.channel.length >= 20) ? 'channel_id' : 'user'] = this.channel

		axios.get(config.baseAPI, { params: params }).then((res) => {
			return this.feed.parse(res.data)
		}, (err) => {
			this.reject({
				title: err.status,
				description: err.statusText
			})
		}).then((res) => {
			this.parse(res)
		}, (err) => {
			this.reject({
				title: 'Error',
				description: 'Could not parse the feed.'
			})
		})
	}

	parse(feed) {
		feed.entry = feed.entry.filter((entry) => {
			return ~this.normalize(entry.title[0].toLowerCase()).indexOf(this.filter.toLowerCase())
		}).map((entry) => {
			return {
				title: entry.title[0],
				link: entry.link[0].$.href,
				guid: entry.link[0].$.href,
				pubDate: new Date(entry.published[0]).toUTCString(),
				description: entry['media:group'][0]['media:description'],
				enclosure: { $: {
					url: this.host + '/v/' + entry['yt:videoId'] + '/' + this.format,
					type: config.formats[this.format].type,
					length: 0
				} },
				'itunes:image': { $: {
					href: entry['media:group'][0]['media:thumbnail'][0].$.url
				} }
			}
		})

		this.resolve({
			title: this.title || feed.title,
			link: feed.author[0].uri,
			description: this.filter,
			language: config.lang,
			image: {
				title: feed.title,
				link: feed.author[0].uri,
				url: 'https://i.ytimg.com/i/' + feed['yt:channelId'][0].substring(2) + '/hq1.jpg'
			},
			'atom:link': { $: {
				href: this.host + this.path,
				rel: 'self',
				type: 'application/rss+xml'
			} },
			'itunes:author': feed.author[0].name,
			'itunes:owner': {
				'itunes:name': feed.author[0].name,
				'itunes:email': feed.author[0].name + '@youtube.com'
			},
			'itunes:category': {
				$: { text: 'Technology' },
				'itunes:category': { $: { text: 'Podcasting' } }
			},
			'itunes:image': { $: {
				href: 'https://i.ytimg.com/i/' + feed['yt:channelId'][0].substring(2) + '/hq1.jpg'
			} },
			'itunes:explicit': 'clean',
			item: feed.entry
		})
	}

	normalize(str) {
		return str.replace(/[^a-zA-Z0-9_\-]/g, '')
	}
}

module.exports = YouTube
