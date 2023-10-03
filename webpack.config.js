const path = require('path');

  
module.exports = {
  mode: 'production',
  entry: './src/XoConnect.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'xo-connect.js',
    library: 'XoConnect', 
    libraryTarget: 'umd', 
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader', 
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
