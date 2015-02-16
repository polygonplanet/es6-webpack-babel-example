// Gruntfile.js
'use strict';

var webpack = require('webpack');

module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    // webpackの設定
    webpack: {
      build: {
        progress: true,
        entry: {
          // メインjsファイル (ここでは app.js とする)
          app: './public/js/app.js'
        },
        output: {
          // 出力ファイル (ここでは assets/js に出力)
          path: './public/assets/js',
          filename: 'bundle.js'
        },
        module: {
          loaders: [{
            // .jsに対してbabel-loaderを指定してES6で書けるようにする
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          }]
        },
        resolve: {
          // 読み込む際に拡張子を省略できるようにする
          extenstions: ['', '.js']
        }
      }
    },
    // JS圧縮(minify)/最適化
    uglify: {
      options: {
        // Source Mapをつける
        sourceMap: true,
        sourceMapName: './public/assets/js/bundle.map'
      },
      build: {
        files: {
          // 出力ファイル: 元ファイル
          './public/assets/js/bundle.min.js': './public/assets/js/bundle.js'
        }
      }
    },
    // ファイルの変更/更新を監視
    watch: {
      js: {
        files: [
          // js/ 以下を再帰的に監視する
          './public/js/**/*.js',
        ],
        tasks: ['webpack', 'uglify']
      }
    }
  });

  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // デフォルトタスクの登録
  grunt.registerTask('default', ['webpack', 'uglify']);
};
