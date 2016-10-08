const path = require('path');
const fs = require('fs');
const autoprefixer = require('autoprefixer');

const PATHS = {
  js: path.join(__dirname, 'js'),
  build: path.join(__dirname, '../wag_ftheatre/static/scripts/')
};

function getDirs(dir) {
  const entries = {};
  const files = fs.readdirSync(dir);
  files.forEach(function(f) {
    const fullPath = path.join(dir, f);
    if (fs.statSync(fullPath).isDirectory() && f !== 'utils') {
      entries[f] = fullPath;
    }
  });
  return entries;
}

module.exports = {
  entry: getDirs(PATHS.js),
  output: {
    path: PATHS.build,
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
          plugins: [
            'transform-object-assign',
          ],
        },
        exclude: /(node_modules|bower_components)/,
      },
      {
        // desandros non compatible modules
        test: /(masonry-layout|outlayer|get-size|fizzy-ui-utils)/,
        loader: 'imports?define=>false&this=>window',
      },
      { test: /\.css$/, loader: 'style!css' },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'postcss', 'sass'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ['url'],
      },
    ],
  },
  /*
  plugins: [
    new webpack.optimize.CommonsChunkPlugin("init.js")
  ],
  */
  postcss: function() {
    return [autoprefixer];
  },
};
