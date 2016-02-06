const path = require('path');
const app = require('express')();
const port = 3000;

// Webpack config for hot module replacement.
if (process.argv[2] === '-webpack') {
    app.use(require('./middleware/webpackDev'));
}

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../../index.html'));
});

app.listen(port, function () {
    console.log('Listening on port', port); // eslint-disable-line no-console
});
