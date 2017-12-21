

var templateAddressModal = require('./address-modal.string');
var _mm = require('util/mm.js');
var _address  = require('service/address-service.js');
var _cities = require('util/cities/index.js');

var _addressModal = {
show:function(option){
    //第一步option赋值
    this.option = option;
    this.option.data = option.data || {};
    this.$modalWrap = $('.modal-wrap');
    //渲染页面
    this.loadModal();
    //绑定事件
    this.bindEvent();
},
bindEvent:function(){
    var _this = this;
    //省份和城市的二级联动
    this.$modalWrap.find('#receiver-province').change(function(){
        var selectedProvince = $(this).val();
        console.log(11111);
        _this.loadCities(selectedProvince);
    });
    //提交收货地址
    this.$modalWrap.find('.modal-submit').click(function(){
        var receiverInfo = _this.getReceiverInfo();
        var isUpdate = _this.option.isUpdate;
        //使用新地址，且验证通过
        if(!isUpdate && receiverInfo.status){
            _address.save(receiverInfo.data,function(res){
                _mm.successTips('地址添加成功');
                _this.hide();
                typeof _this.option.onSuccess === 'function' 
                && _this.option.onSuccess(res);
            },function(errMsg){
                 _mm.errorTips(errMsg);
            })
        }
        //更新收件人,并且验证通过
        else if(isUpdate && receiverInfo.status){
            _address.update(receiverInfo.data,function(res){
                _mm.successTips('地址更新成功');
                _this.hide();
                typeof _this.option.onSuccess === 'function' 
                && _this.option.onSuccess(res);
            },function(errMsg){
                 _mm.errorTips(errMsg);
            });
        }
        //验证不通过
        else{
            _mm.errorTips(receiverInfo.errMsg || '好像哪里不对了!');
        }
    });
    //保证点击蒙版的事件冒泡
    this.$modalWrap.find('.modal-container').click(function(e){
        //阻止事件冒泡
        e.stopPropagation();
    })
    //关闭
    this.$modalWrap.find('.close').click(function(){
        _this.hide();
    });
    

},
//渲染页面
loadModal:function(){
    var addressModalHtml = _mm.renderHtml(templateAddressModal,{
        isUpdate:this.option.isUpdate,
        data:this.option.data
    });
    this.$modalWrap.html(addressModalHtml);
    //加载省份
    this.loadProvice();
    //加载城市
    this.loadCities();

},
//加载省份
loadProvice:function(){
    var provinces = _cities.getProvinces()||[];
    $provinceSelect = this.$modalWrap.find('#receiver-province');
    $provinceSelect.html(this.getSelectOpiton(provinces));
    //如果是更新地址，并且有省份信息，这里做省份回填
    if(this.option.isUpdate &&  this.option.data.receiverProvince){
        $provinceSelect.val(this.option.data.receiverProvince)
        this.loadCities(this.option.data.receiverProvince);
    }
},
//加载城市信息
loadCities:function(provinceName){
    var cities = _cities.getCities(provinceName) || [];
    console.log(!!(this.option.isUpdate &&  this.option.data.receiverCity));
    var $citySelect = this.$modalWrap.find('#receiver-city');
    $citySelect.html(this.getSelectOpiton(cities));
    //如果更新地址有城市新信息
    // console.log(this.option.isUpdate)
    if(this.option.isUpdate &&  this.option.data.receiverCity){
        $citySelect.val(this.option.data.receiverCity);
        
    }
},
//获取select框选项，输入array，输出html
getSelectOpiton:function(optionArray){
    var html = '<option value="">请选择</option>'
    for(var i=0,length = optionArray.length;i<length;i++){
            html +='<option value="'+ optionArray[i] +'">'+optionArray[i]+'</option>'
    }
    return html
},
//获取表单收件人信息并且做表单验证
getReceiverInfo:function(){
    var receiverInfo = {};
    var result = {
        status:false,
    };
    receiverInfo.receiverName = $.trim(this.$modalWrap.find('#receiver-name').val());
    receiverInfo.receiverProvince = $.trim(this.$modalWrap.find('#receiver-province').val());
    receiverInfo.receiverCity = $.trim(this.$modalWrap.find('#receiver-city').val());
    receiverInfo.receiverAddress = $.trim(this.$modalWrap.find('#receiver-address').val());
    receiverInfo.receiverPhone = $.trim(this.$modalWrap.find('#receiver-phone').val());
    receiverInfo.receiverZip = $.trim(this.$modalWrap.find('#receiver-zip').val());
    
    if(this.option.isUpdate){
    receiverInfo.id = $.trim(this.$modalWrap.find('#receiver-id').val());    
    }
    // 表单验证
    if(!receiverInfo.receiverName){
        result.errMsg = '请输入收件人信息';
    }else if(!receiverInfo.receiverProvince){
        result.errMsg = "请选择收件人所在省份"
    }else if(!receiverInfo.receiverCity){
        result.errMsg = "请选择收件人所在城市"
    }else if(!receiverInfo.receiverAddress){
        result.errMsg = "请输入收件人地址"
    }else if(!receiverInfo.receiverPhone){
        result.errMsg = "请输入收件人手机"
    }else{
        //所有验证都通过了。
        result.status = true;
        result.data = receiverInfo;
    }
    return result
},
hide:function(){
    //移除节点;
    this.$modalWrap.empty();
}
}

module.exports = _addressModal;

