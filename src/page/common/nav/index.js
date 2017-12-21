

//这个是通用复杂头部

require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');

var nav = {
    init:function () {
        this.bindEvent();//绑定事件
        this.loadUserInfo();//
        this.loadCartCount();
        return this//链式调用
    },
    bindEvent:function () {
        //登录点击事件
        $('.js-login').click(function () {
            //调用之前写的跳转登录
            _mm.doLogin();
        });
        //注册点击事件
        $('.js-register').click(function(){
            window.location.href = './register.html'
        });
        //退出点击事件
        $('.js-register').click(function(){
            _user.logout(function (res) {
                window.location.reload();
            },function(errMsg){
                _mm.errorTips(errMsg);
            });
        });
        
    },
    //加载用户信息
    loadUserInfo:function(){
        _user.checkLogin(function (res) {
            $('.user.not-login').hide().siblings('.user.login').show()
            .find('.username').text(res.username);
        },function(errMsg){

        });
    },
    loadCartCount :function(){
        _cart.getCartCount(function (res) {
            $('.nav .cart-count').text(res||0)
        },function(errMsg){
            $('.nav .cart-count').text(0)
        });
    },
};
module.exports = nav.init();


