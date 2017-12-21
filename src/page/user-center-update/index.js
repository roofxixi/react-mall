

require('./index.css');
require('page/common/nav-simple/index.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');


var _mm = require('util/mm.js');
var navSide =  require('page/common/nav-side/index.js');
var _user = require('service/user-service.js');
//模板
var templateIndex = require('./index.string');


var page = {
    init:function(){
        //初始化显示
        this.onLoad();
        this.bindEvent();

    },
    bindEvent:function(){
        var _this = this;
        //点击提交按钮后的动作
        $(document).on('click','#submit-update',function(){
            var userInfo = {
                email:$.trim($('#email').val()),
                phone :$.trim($('#phone').val()),
                question:$.trim($('#question').val()),
                answer:$.trim($('#answer').val())
            }
            var validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                //更改用户信息
                _user.updateInfo(userInfo,function(res,msg) {
                    //成功返回
                    _mm.successTips(msg);
                    window.location.href = './user-center.html';
                },function(errMsg){ 
                    //失败返回
                    _mm.errorTips(errMsg);                    
                })
            }else{
                _mm.errorTips(validateResult.msg);
            }
        });
    },
    //验证修改信息
    validateForm:function(formData){
        var result = {
            status : false,
            msg:'',

        };
        console.log(formData.phone);
        if(!_mm.validate(formData.phone,'phone')){
            result.msg = '输入手机号不正确';
            return result;
        };
        if(!_mm.validate(formData.email,'email')){
            result.msg = '输入的邮箱不正确';
            return result;
        }
        if(!_mm.validate(formData.question,'require')){
            result.msg = '密保问题不能为空'; 
            return result;
        }
        if(!_mm.validate(formData.answer,'require')){
            result.msg = '密保答案不能为空'; 
            return result;
        }
        
        //通过验证,返回正确提示
        result.status = true;
        result.msg = '验证通过';
        return result;
    },
    onLoad:function(){
        navSide.init({name:'user-center'});
        this.loadUserInfo();
    },
    loadUserInfo:function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _mm.renderHtml(templateIndex,res);
            $('.panel-body').html(userHtml);
        },function(errMsg){
            _mm.errorTips(errMsg);
        })
    }
}

$(function(){
    page.init();
});