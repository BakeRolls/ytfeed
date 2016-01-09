# ytfeed

Just a simple express-server, rewriting YouTubes [account-feeds](https://www.youtube.com/feeds/videos.xml?user=coldmirror) (so it doesn't need to access Googles APIs) podcast-friendly and providing audio/video links.

Subscribe to `YourServer/(channelName|channelId)` with the optional `/filter` and the parameters `format` (`144`, `240`, `360`, `720` or `m4a` (audio only)), `title` and `json=true` (please don't).

Example: [`/coldmirror/harrypodcast?format=m4a&title=Harry%20Podcast`](https://yt.192k.pw/coldmirror/harrypodcast?format=m4a&title=Harry%20Podcast) (A feed of the last ≤ 20 videos by `coldmirror` in `m4a`, containing `harrypodcast` with the feed-title `Harry Podcast`)
