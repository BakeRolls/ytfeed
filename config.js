module.exports = {
	port: 61737,
	lang: 'de-DE',
	baseAPI: 'https://www.youtube.com/feeds/videos.xml?',
	formats: {
		144: { id: 17, type: 'video/mp4' },
		240: { id: 36, type: 'video/mp4' },
		360: { id: 18, type: 'video/mp4' },
		720: { id: 22, type: 'video/mp4' },
		m4a: { id: 140, type: 'audio/m4a' }
	},
	defaultFormat: 720,
	feedHeader: {
		version: '2.0',
		'xmlns:content': 'http://purl.org/rss/1.0/modules/content/',
		'xmlns:wfw': 'http://wellformedweb.org/CommentAPI/',
		'xmlns:dc': 'http://purl.org/dc/elements/1.1/',
		'xmlns:atom': 'http://www.w3.org/2005/Atom',
		'xmlns:sy': 'http://purl.org/rss/1.0/modules/syndication/',
		'xmlns:slash': 'http://purl.org/rss/1.0/modules/slash/',
		'xmlns:itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd',
		'xmlns:rawvoice': 'http://www.rawvoice.com/rawvoiceRssModule/',
		'xmlns:googleplay': 'http://www.google.com/schemas/play-podcasts/1.0'
	}
}
