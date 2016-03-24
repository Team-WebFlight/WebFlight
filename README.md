
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://www.standardjs.com)

# WebFlight
WebFlight enables the users visiting a site to serve the content of that site. P2P content sharing technology powered with :heart: by [WebTorrent](https://webtorrent.io)!

### Install
```bash
npm install webflight
```

### Usage

It's easy to incorporate WebFlight into your existing site! Just provide us with a few details on where to find the assets you want to seed, and we'll take care of the rest.

#### Initialize WebFlight

```javascript
const WebFlight = require('webflight')

const wf = new WebFlight(options, path)

wf.init()
```

##### Options

```siteUrl``` - Your website url
<br>```assetsPath``` - The absolute path(s) to the folder(s) containing your assets
<br>```assetsRoute``` - The server route(s) to your assets
<br>```routes: { '/route': '/path/to/route.html' }``` - The routes and corresponding paths to your html files
<br>```userCount``` - The number of simultaneous users on your site at which WebFlight will begin to send subsequent users to the peer-hosted version of your site
<br>```wfPath``` - (optional) The folder WebFlight files will appear in
<br>```wfRoute``` - (optional) The route that retrieves WebFlight files
<br>```seedScript``` - (optional) The script that will initialize seeding your assets so they're ready to be downloaded by users after the **userCount** threshold is passed
<br>`path` - The root path on your server
<br>`statusBar` - Dropdown element that will appear on your website that shows users what is being seeded

```
{
  siteURL: String             // Required
  assetsPath: String|Array    // Required
  assetsRoute: String|Array   // Required
  routes: Object              // Required
  userCount: Number           // Optional - defaults to 10
  wfPath: String              // Optional - defaults to '/wfPath'
  wfRoute: String             // Optional - defaults to '/wfRoute'
  seedScript: String          // Optional - defaults to 'wf-seed.js'
  statusBar: Boolean          // Optional - defaults to true
}
```

## `webflight.redirect(req, res, next)`
Once seeding threshold is met, redirect requests to webflight routes.

## `webflight.start()`
Call starts the seeding process.

## `webflight.watch(req, res, next)`
Watches for http requests to server. Based on a threshold specified in opts, `.watch()` will call `.start()` to begin seeding. When peers are connected, initial seeds are no longer necessary and are killed

---

### License
MIT License (MIT)

Copyright (c) Team WebFlight

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
