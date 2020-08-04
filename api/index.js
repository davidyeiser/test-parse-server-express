// base setup below copied from
// https://github.com/parse-community/Parse-Server#parse-server--express

var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');
var app = express();

var appId = 'devTestApp';
var masterKey = 'dev-test-app-master-key';
var serverURL = 'http://localhost:3001/parse';

var api = new ParseServer({
  databaseURI: 'mongodb://localhost:27017/dev-test', // Connection string for your MongoDB database
  cloud: __dirname + '/cloud/main.js', // Absolute path to your Cloud Code
  appId: appId,
  masterKey: masterKey, // Keep this key secret!
  serverURL: serverURL, // Don't forget to change to https if needed
  publicServerURL: serverURL
});

var dashboard = new ParseDashboard({
  apps: [{
    appId: appId,
    appName: 'Dev. Test App',
    masterKey: masterKey,
    serverURL: serverURL
  }],
  users: [{
    user: 'test',
    pass: 'test'
  }]
}, true);

// Serve the Parse API on the /parse URL prefix
app.use('/parse', api);
app.use('/dashboard', dashboard);

app.listen(3001, function() {
  console.log('parse-server-example running on port 3001.');
});
