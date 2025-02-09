// create express server running on port 8080
const express = require('express');
const path = require('path');
const routes = require('./routes/Routes');

var app = express();
var port = process.env.PORT || 8080;
// Middleware to parse JSON bodies
app.use(express.json());

// set static files location
// used for requests that our frontend will make
app.use(express.static(path.join(__dirname, '../build')));
// Serve static files from the 'logs' directory
app.use('/logs', express.static(path.join(__dirname, 'logs')));
// start the server
app.listen(port ,() => {
    console.log('server started on port ' + port);
});
// Use the routes defined in Routes.js, mounted at /api
app.use('/api', routes);
// Catch-all route to serve index.html for client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});
