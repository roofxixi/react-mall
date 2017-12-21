


require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

//表单里的错误提示
var formError = {
    //显示错误信息
    show:function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    //隐藏
    hide:function(){
        $('.error-item').hide().find('.err-msg').text('');
        
    },
}

var page = {
    init:function(){
        this.bindEvent();
    },
    bindEvent:function(){
        var _this = this;

        //实时验证username是否存在
        $('#username').blur(function(){
            var username = $.trim($(this).val());
            if(!_mm.validate(username,'require')){
                return ; 
            }
            //异步验证用户是否存在
            _user.checkUsername(username,function(res){
                //验证成功,就需要隐藏掉页面上的error-item

                formError.hide()
            },function(errMsg){
                //验证用户不存在
                formError.show(errMsg);
            })
        });
        //注册按钮提交
        $('#submit').click(function(){
            _this.submit();
        });
        //如果按下回车就按下提交
        $('.user-content').keyup(function(e){
            if(e.keyCode === 13){
                _this.submit();
            }
        })
    },
    //提交表单
    submit:function(){
        var formData = {
            username:$.trim($('#username').val()),
            password:$.trim($('#password').val()),
            passwordconfirm:$.trim($('#passwordconfirm').val()),
            phone:$.trim($('#phone').val()),           
            email:$.trim($('#email').val()),
            question:$.trim($('#question').val()),
            answer:$.trim($('#answer').val()),
        };

        //表单验证结果
        var validateResult = this.formValidate(formData);
        //验证成功
        if(validateResult.status){
            //登录
        
            _user.register(formData,function(res){
                //成功
                window.location.href = './result.html?type=register';

            },function (errMsg) {
                //失败
                formError.show(errMsg);
            });

        //验证失败
        }else{
            //错误提示
            //登录错误但是影长
            formError.show(validateResult.msg);
        }
    },
    //表单验证
    formValidate:function(formData){
        var result = {
            status : false,
            msg:'',

        };

        if(!_mm.validate(formData.username,'require')){
            result.msg = '用户名不能为空'; 
            return result;
        };
        if(!_mm.validate(formData.password,'require')){
            result.msg = '密码不能为空'; 
            return result;            
        };
        console.log(formData.answer)
        if(formData.password.length<6){
            result.msg = '密码不能低于6位';
            return result
        };
        if(formData.password !== formData.passwordconfirm){
            result.msg = '两次密码输入不匹配';
            return result;
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
    }
};


$(function(){
    page.init();  
});