require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var templateIndex = require('./index.string');
var _mm = require('util/mm.js');
var _product = require('service/product-service.js');
var _cart  = require('service/cart-service.js');

var page  = {
    data:{
        productId:_mm.getUrlParam('productId')||'',   
        },
    init:function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad:function(){
        //如果没有传productId,自动跳回首页
        if(!this.data.productId){
            _mm.goHome();
        }
        this.loadDetail();
    },
    bindEvent:function(){
        var _this = this;
        //图片预览
        $(document).on('mouseenter','.p-img-item',function(){
            var imageUrl = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src',imageUrl)
        });
        $(document).on('click','.p-count-btn',function(){
            var type = $(this).hasClass('plus')?'plus':'minus';
            var $pCount = $('.p-count');
            var currCount = parseInt($pCount.val());
            var minCount = 1;
            var maxCount = _this.data.detalInfo.stock || 1;
            if(type==="plus"){
                $pCount.val(currCount<maxCount?currCount+1:maxCount);
            }else if(type==='minus'){
                $pCount.val(currCount>minCount?currCount-1:minCount);
            }
        });
        //加入购物车
        $(document).on('click','.cart-add',function(){
            var obj = {
                productId:_this.data.productId,
                count:$('.p-count').val()
            };
            _cart.addToCart(obj,function(res){
                window.location.href = './result.html?type=cart-add';
            },function(errMsg){
                
                _mm.errorTips(errMsg);
            })
        })
    },
    //记载商品详情的数据
    loadDetail:function(){
        var html = '';
        var _this = this;
        
        var $pageWrap = $('.page-wrap');
        $pageWrap.html('<div class="loading"></div>')
        //请求detail地址信息
        _product.getProductDetail(this.data.productId,function(res){
        _this.filter(res);
        // 缓存detail的数据
        _this.data.detalInfo = res;
        console.log(res.subImages);
        html = _mm.renderHtml(templateIndex,res);
        $pageWrap.html(html);
        },function(errMsg){
        $pageWrap.html('<p class="err-tip">此商品找不到了</p>')
        })
    },
    filter:function(data){
        data.subImages = data.subImages.split(',');
    }
}


$(function(){
    page.init();
});



