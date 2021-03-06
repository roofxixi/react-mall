



var _mm = require('util/mm.js');

var _payment = {
    //获取支付二维码，用的notify-url的形式
    getPaymentInfo:function(orderNumber,resolve,reject){
        _mm.request({
            url:_mm.getServerUrl('/order/pay.do'),
            data:{
                orderNo:orderNumber,
            },
            success:resolve,
            error:reject
        })
    },
    //监听订单状态
    getPaymentStatus:function(orderNumber,resolve,reject){
        _mm.request({
            url:_mm.getServerUrl('/order/query_order_pay_status.do'),
            data:{
                orderNo:orderNumber,
            },
            success:resolve,
            error:reject
        })
    },
}


module.exports = _payment

