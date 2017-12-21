
require('./index.css');
require('page/common/nav-simple/index.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');


var _mm = require('util/mm.js');
var navSide =  require('page/common/nav-side/index.js');
var _order = require('service/order-service.js');
//模板
var templateIndex = require('./index.string');
var Pagination = require('util/pagination/index.js');



var page = {
    data:{
        listParam:{
            pageNum:1,
            pageSize:2,
        }
    },
    init:function(){
        //初始化显示
        this.onLoad();

    },
    bindEvent:function(){

    },
    onLoad:function(){
        navSide.init({name:'order-list'});
        this.loadOrderList();
    },
    //加载订单列表
    loadOrderList:function(){
        var orderListHtml = '';
        var _this = this;
        var $listCon = $('.order-list-con');
        $listCon.html('<div class="loading"></div>')
        _order.getOrderList(_this.data.listParam,function(res){
            _this.dataFilter(res);
            //渲染信息
            orderListHtml = _mm.renderHtml(templateIndex,res);
            $listCon.html(orderListHtml);
            _this.loadPagination({
                pageNum:res.pageNum,
                pages:res.pages,
                hasPreviousPage:res.hasPreviousPage,
                hasNextPage:res.hasNextPage,
                prePage:res.prePage,
                nextPage:res.nextPage
            });
        
        },function(errMsg){
            $listCon.html('<p class="err-tip">加载订单失败,请刷新后重试</p>');
        });
    },
    //响应过来的数据适配
    dataFilter:function(data){
        data.isEmpty = !data.list.length;

    },
    //分页
    loadPagination:function(pageInfo){
        var _this = this;
        this.pagination? '' :(this.pagination = new Pagination());
        this.pagination.render($.extend({},pageInfo,{
            container:$('.pagination'),
            onSelectPage:function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadOrderList();
            }
        }));
    }
    
}

$(function(){
    page.init();
});