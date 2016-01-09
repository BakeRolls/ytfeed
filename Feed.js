'use strict'

let xml2js = require('xml2js')
let config = require('./config')

class Feed {
	constructor() {
		this.builder = new xml2js.Builder({
			cdata: true,
			xmldec: { allowSurrogateChars: true }
		})
	}

	parse(xml) {
		return new Promise((resolve, reject) => {
			xml2js.parseString(xml, (err, res) => {
				if(err) reject(err)

				resolve(res.feed)
			})
		})
	}

	build(channel, item) {
		channel = channel || {}
		item = item || []

		return this.buildObject({
			rss: {
				$: config.feedHeader,
				channel: channel,
				item: item
			}
		})
	}

	buildObject(json) {
		return this.builder.buildObject(json)
	}
}

module.exports = Feed
