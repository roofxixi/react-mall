
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');
var _product = require('service/product-service.js');
var Pagination = require('util/pagination/index.js');


var page  = {
    data:{
        listParam:{
            keyword:_mm.getUrlParam('keyword')||'',
            categoryId:_mm.getUrlParam('categoryId')||'',
            orderBy:_mm.getUrlParam('orderBy')||'default',
            pageNum:_mm.getUrlParam('pageNum')||1,
            pageSize:_mm.getUrlParam('pageSize')||10
        }
    },
    init:function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad:function(){
        this.loadList();
    },
    bindEvent:function(){
        var _this = this;
        $('.sort-item').click(function(){
            //优化
            var $this = $(this);
            _this.data.listParam.pageNum = 1;
            if($this.data('type')==='default'){
                //如果有active样式
                if($this.hasClass('active')){
                    return ;
                }else{
                    //其他相邻的元素remove掉
                    $this.addClass('active')
                    .siblings('.sort-item')
                    .removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default';
                }
            }else if($this.data('type')==='price'){
                $this.addClass('active')
                .siblings('.sort-item')
                .removeClass('active asc desc');
                //判断升序还是降序
                if(!$this.hasClass('desc')){
                    //降序
                    $this.addClass('desc').removeClass('asc')
                    _this.data.listParam.orderBy = 'price_desc';
                }else{
                    //升序
                    $this.addClass('asc').removeClass('desc')
                    _this.data.listParam.orderBy = 'price_asc'
                }
                
            }
            _this.loadList();
        });
    },
    loadList:function(){
        var listParam = this.data.listParam;
        var _this = this;
        var listHtml = '';
        var $pListcon = $('.p-list-con');
        //每次加载一下
        $pListcon.html('<li class="loading"></li>')
        //优化只需要一个字段
        listParam.categoryId ?(delete listParam.keyword):(delete listParam.categoryId)
        
        //请求接口
        _product.getProductList(listParam,function(res){
            listHtml = _mm.renderHtml(templateIndex,{
                list:res.list
            });
            $('.p-list-con').html(listHtml);
            //分页信息
            _this.loadPagination({
                pageNum:res.pageNum,
                pages:res.pages,
                hasPreviousPage:res.hasPreviousPage,
                hasNextPage:res.hasNextPage,
                prePage:res.prePage,
                nextPage:res.nextPage
    
            });
        },function(errMsg){
            _mm.errorTips(errMsg);
        });
    },
    //加载分页信息
    loadPagination:function(pageInfo){
        var _this = this;
        this.pagination? '' :(this.pagination = new Pagination());
        this.pagination.render($.extend({},pageInfo,{
            container:$('.pagination'),
            onSelectPage:function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadList();
            }
        }));
        
        
    }
}


$(function(){
    page.init();
});

