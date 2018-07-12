//后边推荐的基本都是path
const path = require('path');

var webpack = require('webpack');
//单独打包css的模块
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//单独打包html
const HtmlWebpackPlugin = require('html-webpack-plugin');

//环境变量
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV)

var config = {
  //单入口
  // entry: './src/page/index/index.js',
  //多入口
  entry: {
    'common': ['./src/page/common/index.js'],
    'index': './src/page/index/index.js',
    'list': './src/page/list/index.js',
    'detail': './src/page/detail/index.js',
    'user-login': './src/page/user-login/index.js',
    'user-register': './src/page/user-register/index.js',
    'result': './src/page/result/index.js',
    'user-pass-reset': './src/page/user-pass-reset/index.js',
    'user-center': './src/page/user-center/index.js',
    'user-center-update': './src/page/user-center-update/index.js',
    'user-pass-update': './src/page/user-pass-update/index.js',
    'cart': './src/page/cart/index.js',
    'order-confirm': './src/page/order-confirm/index.js',
    'order-list': './src/page/order-list/index.js',
    'order-detail': './src/page/order-detail/index.js',
    'payment': './src/page/payment/index.js'

  },
  output: {
    publiPath:'./dist/view',
    //存在根目录的dist中
    path: path.resolve(__dirname, 'dist'),
    //这个是单入口的
    // filename: 'app.js'
    //多入口的多出口
    filename: 'js/[name].js',
    //这个是设置成生成的文件路径,不然还是错的
    publicPath: WEBPACK_ENV === 'dev' ? '/dist/view' : '//s.roofxixi.cn/',
  },
  //打包的时候取别名
  externals: {
    'jquery': 'window.jQuery'
  },
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   use: [ 'style-loader', 'css-loader' ]
      // }
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },

      {
        test: /\.(png|jpg|gif|woff|svg|ttf|eot)\??.*$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'resource/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.string$/,
        use: [
          {
            loader: 'html-loader',
          }
        ]
      },
    ]
  },
  plugins: [
    //独立通用模块和全局模块
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/base.js'
    }),
    //css打包到文件里面去
    new ExtractTextPlugin("css/[name].css"),
    //html模板处理
    getHtmlConfig('index', '首页'),
    getHtmlConfig('list', '商品列表页'),
    getHtmlConfig('detail', '商品详情页'),
    getHtmlConfig('user-login', '用户登录'),
    getHtmlConfig('result', '操作结果'),
    getHtmlConfig('user-register', '用户注册'),
    getHtmlConfig('user-pass-reset', '找回密码'),
    getHtmlConfig('user-center', '个人中心'),
    getHtmlConfig('user-center-update', '个人信息编辑'),
    getHtmlConfig('user-pass-update', '修改密码'),
    getHtmlConfig('cart', '购物车'),
    getHtmlConfig('order-confirm', '订单确认页'),
    getHtmlConfig('order-list', '我的订单'),
    getHtmlConfig('order-detail', '订单详情'),
    getHtmlConfig('payment', '订单支付'),
  ],
  resolve: {
    alias: {
      util: path.resolve(__dirname, 'src/util'),
      page: path.resolve(__dirname, 'src/page'),
      service: path.resolve(__dirname, 'src/service'),
      view: path.resolve(__dirname, 'src/view'),
      image: path.resolve(__dirname, 'src/image'),
      node_modules: path.resolve(__dirname, 'node_modules')
    }
  },

  //开发是跨域转发
  devServer: {

    port: 8088,
    proxy: {
      //  '/api': {
      //      target: 'http://test.com:80',
      //      secure: false,
      //      changeOrigin: true,
      //      pathRewrite: {'^/api': ''}
      //  },
    }
  },

};

//封装html模板打包模块
function getHtmlConfig(name, title) {
  return new HtmlWebpackPlugin({
    title: title,
    template: './src/view/' + name + '.html',//模板
    filename: 'view/' + name + '.html',//输出文件
    favicon: './favicon.ico',//这里是这个插件帮我们做了加入favicon的功能
    inject: true,
    hash: true,
    //这里是打包js模块到html中去
    chunks: ['common', name],
  })
}

//这个就是判断一下线上环境
if (WEBPACK_ENV === 'dev') {
  config.entry.common.push('webpack-dev-server/client?http://127.0.0.1:8088/')
}


module.exports = config;
