const webpack = require('webpack');
const webpackConfig = require('../../../webpack.config');
const webpackCompiler = webpack(webpackConfig);
const router = require('express').Router();

router.use(require('webpack-dev-middleware')(webpackCompiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
}));

router.use(require('webpack-hot-middleware')(webpackCompiler));

module.exports = router;
