

require('./index.css');
require('page/common/nav-simple/index.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');


var _mm = require('util/mm.js');
var navSide =  require('page/common/nav-side/index.js');
var _user = require('service/user-service.js');
//模板
var templateIndex = require('./index.string');


var page = {

    init:function(){
        //初始化显示
        this.onLoad();

    },
    bindEvent:function(){

    },
    onLoad:function(){
        navSide.init({name:'user-center'});
        this.loadUserInfo();
    },
    loadUserInfo:function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _mm.renderHtml(templateIndex,res);
            $('.panel-body').html(userHtml);
        },function(errMsg){
            _mm.errorTips(errMsg);
        })
    }
}

$(function(){
    page.init();
});