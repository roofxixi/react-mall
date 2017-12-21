
require('./index.css');
require('page/common/nav-simple/index.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var _payment = require('service/payment-service.js');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');

//支付模块
var page = {
    data:{
        orderNumber:_mm.getUrlParam('orderNumber')
    },
    init:function(){
        this.onLoad();
    },
    onLoad:function(){
        this.loadPaymentInfo();
    },
    loadPaymentInfo:function(){
        var _this = this;
        var paymentHtml ="";
        var $pageWrap = $('.page-wrap');
        $pageWrap.html('<div class="loading"></div>');        
        _payment.getPaymentInfo(_this.data.orderNumber,function(res){
            //渲染
            paymentHtml = _mm.renderHtml(templateIndex,res);
            $pageWrap.html(paymentHtml);
            //监听订单状态去轮询
            _this.listenOrderStatus();
        },function(errMsg){
            $pageWrap.html('<p class="err-tips">'+errMsg+'</p>');
        })
    },
    //监听订单状态
    listenOrderStatus:function(){
        var _this = this;
        this.paymentTimer = window.setInterval(function(){
            _payment.getPaymentStatus(_this.data.orderNumber,function(res){
                if(res==true){
                    window.location.href = './result.html?type=payment&orderNunber='
                    +_this.data.orderNumber
              }
            });
        },5000)
    }
}
page.init()