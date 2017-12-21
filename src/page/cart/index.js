require('./index.css');
require('page/common/header/index.js');
var templateIndex = require('./index.string');
var _mm = require('util/mm.js');
var _cart  = require('service/cart-service.js');
var nav = require('page/common/nav/index.js');

var page  = {
    data:{
        },
    init:function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad:function(){
        this.loadCart();
    },
    bindEvent:function(){
        var _this = this;
       $(document).on('click','.cart-select',function(){
        var $this = $(this);
        var productId = $this.parents('.cart-productId').data('product-id');
        //选中状态
        if($this.is(':checked')){
            _cart.selectProduct(productId,function(res){
                _this.renderCart(res);
            },function(errMsg){
                _this.showCartError();
            })
        }else{
            //取消选中
            _cart.unselectProduct(productId,function(res){
                _this.renderCart(res);
            },function(errMsg){
                _this.showCartError();
            })
        }
       });
       //全选和取消全选
       $(document).on('click','.cart-select-all',function(){
        var $this = $(this);
        //全选
        if($this.is(':checked')){
            _cart.selectAllProduct(function(res){
                _this.renderCart(res);
            },function(errMsg){
                _this.showCartError();
            })
        }else{
            //取消全选
            _cart.unselectAllProduct(function(res){
                _this.renderCart(res);
            },function(errMsg){
                _this.showCartError();
            })
        }

       });
       //商品数量的变化
       $(document).on('click','.p-count-btn',function(){
        var $this = $(this);
        var $pCount = $this.siblings('.count-input');
        var type = $this.hasClass('plus')?'plus':'minus';
        var currtCount = parseInt($pCount.val());
        var productId = $this.parents('.cart-productId').data('product-id');
        var minCount = 1;
        var maxCount = parseInt($pCount.data('max'));
        var newCount = 0;
        if(type==='plus'){
            if(currtCount>=maxCount){
                _mm.errorTips('该商品数量已经达到上限');
                return ;
            }
            newCount = currtCount+1;
        } else if( type==='minus'){

            if(currtCount<=minCount){
                return ;
            }
            newCount = currtCount-1;
        }
        //更新商品数量
        _cart.updateProduct({
            productId:productId,
            count : newCount
       },function(res){
        _this.renderCart(res);
       },function(errMsg){
        _this.showCartError();
       });

    });

        //删除单个商品
        $(document).on('click','.cart-delete',function(){
            if(window.confirm('确认要删除商品？')){
                var productId = $(this).parents('.cart-table')
                .data('product-id');
                _this.deleteCartProduct(productId);
            }
        });
        //删除选中商品
        $(document).on('click','.delete-selected',function(){
            if(window.confirm('确认要删除商品？')){
                var arrProductIds = [];
                var $selectedItem = $('.cart-select:checked');
                //取id
                for(var i=0,iLength=$selectedItem.length;i<iLength;i++){
                    arrProductIds.push($($selectedItem[i]).parents('.cart-table')
                    .data('product-id'));
                }
                if(arrProductIds.length){
                    _this.deleteCartProduct(arrProductIds.join(','));
                }else{
                    _mm.errorTips('您还没有选中需要删除的商品');
                }
            }
        });
        //提交购物车
        $(document).on('click','.btn-submit',function(){
            //总价大于0,进行提交
            if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice>0){
                window.location.href = './order-confirm.html';
            }else{
                _mm.errorTips('请选择商品后提交');
            }
        })
    },
    //加载购物车
    loadCart:function(){
        var _this = this;
        _cart.getCartList(function(res){
            //渲染购物车
            _this.renderCart(res);
        },function(errMsg){
            _this.showCartError();
        })
        
    },
    //渲染购物车
    renderCart:function(data){
        this.filter(data);
        //缓存购物车信息
        this.data.cartInfo = data;
        //生成html
        var cartHtml = _mm.renderHtml(templateIndex,data);
        $('.page-wrap').html(cartHtml);
        //通知导航购物车更新数量
        nav.loadCartCount();
        
    },
    //数据过滤
    filter:function(data){
        data.notEmpty = !!data.cartProductVoList.length;
    },
    //删除指定商品
    deleteCartProduct:function(productIds){
        var _this = this;
        _cart.deleteProduct(productIds,function(res){
            _this.renderCart(res);
        },function(errMsg){
            _this.showCartError();
        })
    },
    //显示错误信息
    showCartError:function(){
        $('page-wrap').html('<p class="err-tip">哪里不对了,刷新一下试试吧</p>')        
    }

}


$(function(){
    page.init();
});



