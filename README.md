loopback-component-recurly
==============================

[![Greenkeeper badge](https://badges.greenkeeper.io/fullcube/loopback-component-recurly.svg)](https://greenkeeper.io/)

Connect Loopback with Recurly.

INSTALL
=============

```bash
npm install loopback-component-recurly --save
```

SERVER.JS
=============

In your `server/server.js` file add the following line before the
`boot(app, __dirname);` line.

```javascript
// Initialize the Recurly connector.
var recurly = require('loopback-component-recurly');

recurly.setupModels(app, {
  apiKey: '8c569d08675a4316aa80403fb97b9172',
  prefix: 'Account1'
});

recurly.setupModels(app, {
  apiKey: '7c919d08675a4316aa80403fb97b9367',
  prefix: 'Account2'
});
```

TESTING
=============

Run the test suites.

```bash
  npm test
```

Run with debugging output on:

```bash
  export RECURLY_API_KEY_1=8c569d08675a4316aa80403fb97b9172
  export RECURLY_API_KEY_1=7c919d08675a4316aa80403fb97b9367
  DEBUG='loopback-component-recurly' npm test
```
