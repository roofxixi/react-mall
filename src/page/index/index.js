/*
 * @Author: roofxixi 
 * @Date: 2017-11-21 16:22:35 
 * @Last Modified by: roofxixi
 * @Last Modified time: 2017-11-26 18:00:44
 */
 
// console.log('我是首页');
// var $$ = require('jquery');
// require('../common.js');
// 配置的css-loader和style-loader
require('./index.css');

//简单头部
require('page/common/nav-simple/index.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');

require('util/slider/index.js');
var templateBanner = require('./index.string');
var _mm = require('util/mm.js');

$(function (){
    //渲染banner的html
    var bannerHtml = _mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    var $slider = $('.banner').unslider(
        {
            dots:true,
        }
    );
    //前一张后一张
    $('.banner-arrow').click(function(){
        var forward = $(this).hasClass('prev')?'prev':'next';
        //加入逻辑
        $slider.data('unslider')[forward]();
    });

    
})








