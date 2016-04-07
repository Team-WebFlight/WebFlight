
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://www.standardjs.com)
[![Build
Status](https://travis-ci.org/Team-WebFlight/WebFlight.svg?branch=master)](https://travis-ci.org/Team-WebFlight/WebFlight)
# WebFlight
WebFlight enables the users visiting a site to serve the content of that site. P2P content sharing technology powered with :heart: by [WebTorrent](https://webtorrent.io)!

### Install
```bash
npm install webflight
```

### Usage

It's easy to incorporate WebFlight into your existing site! Just provide us with a few details on where to find the assets you want to seed, and we'll take care of the rest. __Note: WebFlight currently requires Node 5.x__

#### Initialize WebFlight

```javascript
const WebFlight = require('webflight')
const wf = new WebFlight(options, path)
const express = require('express')
const app = express()

// start up WebFlight
wf.init()

// then use it on your express routes
app.use(wf.redirect)

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
<br>`devMode` - Turns off xvcb by default. Xvcb is required to launch Electron
on a server, but breaks development on OSX. Set to false before deploying youru
app with WebFlight
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
  devMode: Boolean            // Optional - defaults to true
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

