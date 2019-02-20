# WkWebView Cookies POC

A simple POC to showcase cookies support for WkWebView.

## Getting Started

For running node server (running on 3000):
```bash
$ npm install
$ node server.js

# Nodemon to start server with a watcher
$ nodemon server.js
```

For running Cordova:
```bash
$ npm install
$ cordova platform add ios

# emulator for iOS
$ npm run emulate:ios

# build for iOS
$ npm run build:ios

# build and start on connected iOS device
$ npm run start:ios
```

## Problems

Current solution in this POC supports cookies with default hostname and scheme (`ionic://localhost`), however, setting custom custom values provided in the  [cordova-plugin-ionic-webview](https://github.com/ionic-team/cordova-plugin-ionic-webview) documentation breaks cookies.

1. Custom Hostname: Add these values to the `config.xml` to set a custom `hostname`
```xml
<allow-navigation href="ionic://app/*" />
<allow-navigation href="http://app/*" />
<preference name="Hostname" value="app" />
```

2. Custom Scheme: Add these values to the `config.xml` to set a custom `scheme`
```xml
<allow-navigation href="httpsionic://*"/>
<allow-navigation href="https://*"/>
<preference name="Scheme" value="https" />
<preference name="iosScheme" value="httpsionic" />
```

3. Although cookies work with default settings, they are never visible. That is, developers cannot inspect cookies inside of Safari's devtools (under application cookie storage).