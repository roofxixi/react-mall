require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var templateProduct = require('./product.string');
var templateAddressList = require('./address-list.string');
var _mm = require('util/mm.js');
var _address  = require('service/address-service.js');
var _order = require('service/order-service.js');
var _addressModal = require('./address-modal.js')


var page = {

    data:{
        selectAddressId : null
    },
    init:function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad:function(){
        this.loadAddressList();
        this.loadProduct();
    },
    bindEvent:function(){
        var _this = this;
        //地址的选择
        $(document).on('click','.address-item',function(){
            $(this).addClass('active')
            .siblings('.address-item').removeClass('active');
            _this.data.selectAddressId = $(this).data('id');
        });
        //订单的提交
        $(document).on('click','.order-submit',function(){
            var shippingId = _this.data.selectAddressId;
            if(shippingId){
                _order.createOrder({
                    shippingId:shippingId
                },function(res){
                    window.location.href = './payment.html?orderNumber='+res.orderNo;
                },function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }else{
                _mm.errorTips('请选择地址后再提交')
            }
        });
        //添加地址
        $(document).on('click','.address-add',function(){
            _addressModal.show({
                isUpdate:false,
                onSuccess:function(){
                    _this.loadAddressList();
                },
            });
        });
        //地址编辑
    $(document).on('click','.address-update',function(){
        var shippingId = $(this).parents('.address-item').data('id');
        console.log(shippingId);
        console.log(1);
        _address.getAddress(shippingId,function(res){
        _addressModal.show({
            isUpdate:true,
            data:res,
            onSuccess:function(){
                _this.loadAddressList();
            }
        });
        },function(errMsg){
            _mm.errorTips(errMsg);
        });
    });
    //地址删除
    $(document).on('click','.address-delete',function(){
        var id = $(this).parents('.address-item').data('id');
        if(window.confirm('确认要删除该地址？')){
            _address.deleteAddress(id,function(res){
                _this.loadAddressList();
            },function(errMsg){
                _mm.errorTips(errMsg);
            });
        }
    });
    },
    //获取地址列表
    loadAddressList:function(){
        var _this = this;
        $('.address-con').html('<div class="loading"></div>');        
        _address.getAddressList(function(res){
            _this.addressFilter(res);
            //成功的时候
            var AddressListHtml = _mm.renderHtml(templateAddressList,res);
            $('.address-con').html(AddressListHtml);
        },function(errMsg){
            $('address-con').html('<p class="err-tip">地址加载失败,请刷新后重试</p>')
        });

    },
    //处理列表选中状态
    addressFilter:function(data){
        if(this.data.selectAddressId){
            var selectAddressIdFlag = false;
            for(var i =0,length=data.length;i<length;i++){
                if(data.list[i].id===this.data.selectAddressId){
                    data.list[i].isActive = true;
                    selectAddressIdFlag = true;
                }
            };
            //如果以前选中地址不在列表，将其删除
            if(!selectAddressIdFlag){
                this.data.selectAddressId = null;
            }
        }
    },
    //加载商品清单
    loadProduct:function(){
        var _this = this;
        $('.product-con').html('<div class="loading"></div>');
        _order.getProductList(function(res){
            //成功的时候
            var ProductListHtml = _mm.renderHtml(templateProduct,res);
            $('.product-con').html(ProductListHtml);
        },function(errMsg){
            $('product-con').html('<p class="err-tip">订单加载失败,请刷新后重试</p>')
        });
    }

}
page.init();
