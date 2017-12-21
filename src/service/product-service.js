//与服务器想联系的

var _mm = require('util/mm.js');

var _product = {
    
    //请求产品列表
    getProductList:function(userInfo,resolve,reject){
     _mm.request({
        url : _mm.getServerUrl('/product/list.do'),
        data:userInfo,
        success:resolve,
        error : reject,
     })
    },
    //获取商品详细信息
    getProductDetail:function(productId,resolve,reject){
        _mm.request({
           url : _mm.getServerUrl('/product/detail.do'),
           data:{
               productId:productId
           },
           success:resolve,
           error : reject,
        })
       },
    
}
module.exports = _product; 


