

//结果页面

require('./index.css');
require('page/common/nav-simple/index.js');


 var _mm = require('util/mm.js');

 $(function () {
     var type = _mm.getUrlParam('type')||'default';
     //显示对应的提示页面
     $element = $('.'+type+'-success').show();
     if(type=='payment'){
         var orderNumber = _mm.getUrlParam('orderNumber');
         var $orderNumber = $element.find('.order-number');
         $orderNumber.attr('href',$orderNumber.attr('href')+'='+orderNumber);
     }

     //这下面还可以写
 })

