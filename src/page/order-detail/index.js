
require('./index.css');
require('page/common/nav-simple/index.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');


var _mm = require('util/mm.js');
var navSide =  require('page/common/nav-side/index.js');
var _order = require('service/order-service.js');
var templateIndex = require('./index.string');

var page = {
    data:{
        orderNumber:_mm.getUrlParam('orderNumber')
    },
    init:function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad:function(){
        navSide.init({name:'order-list'});
        //加载detail
        this.loadDetail();
    },
    bindEvent:function(){
        var _this = this;
        $(document).on('click','.order-cancel',function(){
            if(window.confirm('确实要取消该订单吗？')){
            _order.cancelOrder(_this.data.orderNumber,function(res){
                _mm.successTips('该订单取消成功');
                _this.loadDetail();
            },function(errMsg){
                _mm.errorTips(errMsg);
            });
        };
        });
        
    },
    loadDetail:function(){
        var _this = this;
        var orderDetailHtml = ''; 
        var $content = $('.content');
        $content.html('<div class="loading"></div>');
        _order.getOrderDetail(this.data.orderNumber,function(res){
            _this.dataFilter(res);
            orderDetailHtml = _mm.renderHtml(templateIndex,res);
            $content.html(orderDetailHtml);
        },function(errMsg){
            $content.html('<p class="err-tip">'+errMsg+'</p>');
        });
    },
    //这个是数据的适配
    dataFilter:function(data){
        data.needPay =  data.status==10;
        data.isCancelable = data.status ==10;
    }


};

page.init();
