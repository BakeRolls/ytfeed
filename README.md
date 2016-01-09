# ytfeed

Just a simple express-server, rewriting YouTubes [account-feeds](https://www.youtube.com/feeds/videos.xml?user=coldmirror) (so it doesn't need to access Googles APIs) podcast-friendly and providing audio/video links.

Subscribe to `YourServer/(channelName|ChannelId)/` with the optional parameters `format` (`144`, `240`, `360`, `720` or `m4a` (audio only)), `title` or `json=true` (please don't).

Example: [`/coldmirror/podcast?format=m4a&title=Harry%20Podcast`](https://yt.192k.pw/coldmirror/podcast?format=m4a&title=Harry%20Podcast)
