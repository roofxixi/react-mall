




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
        $(document).on('click','#password-update',function(){
            var userInfo = {
                password:$.trim($('#password').val()),
                passwordNew :$.trim($('#password-new').val()),
                passwordConfirm:$.trim($('#password-confirm').val())
            }
            console.log(userInfo.length)
            var validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                //更改用户信息
                _user.updatePassword({
                    password:userInfo.password,
                    passwordNew:userInfo.passwordNew
                },function(res,msg) {
                    //成功返回
                    _mm.successTips(msg);
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
        if(!_mm.validate(formData.password,'require')){
            result.msg = '原密码不能为空'; 
            return result;
        }
        if(!_mm.validate(formData.passwordNew,'require')){
            result.msg = '新密码密码不能为空'; 
            return result;
        }
        if(!_mm.validate(formData.passwordConfirm,'require')){
            result.msg = '确认密码不能为空'; 
            return result;
        }
        
        if(formData.passwordNew.length<6){
            result.msg = '新密码不能小于6位'; 
            return result;
        }
        if(formData.passwordConfirm!==formData.passwordNew){
            result.msg = '两次密码不一致'; 
            return result;
        }
        //通过验证,返回正确提示
        result.status = true;
        result.msg = '验证通过';
        return result;
    },
    onLoad:function(){
        navSide.init({name:'pass-update'});
    },
}

$(function(){
    page.init();
});