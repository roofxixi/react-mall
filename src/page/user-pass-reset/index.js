



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
    //暂存数据
    data:{
        username:'',
        question:'',
        answer:'',
        token:'',
    },
    init:function(){
        this.onLoad();
        this.bindEvent();
    },
    
    onLoad:function(){
        this.loadStepUsername();
    },
    bindEvent:function(){
        var _this = this;
       $('#submit-username').click(function(){
           var username = $.trim($('#username').val());
           if(username){
            _user.getQuestion(username,function(res){
                _this.data.username = username;
                _this.data.question = res;
                _this.loadStepQuestion();
            },function(errMsg){
                formError.show(errMsg);
            });
            //用户名不存在
           }else{
               formError.show('请输入用户名')
           }
       });
       //判断密保问题的正确性
       $('#submit-question').click(function(){
        var answer = $.trim($('#answer').val());
            if(answer){
                //检查密码问题答案
                _user.checkAnswer({
                    username:_this.data.username,
                    question:_this.data.question,
                    answer:answer
                },function(res){
                    _this.data.answer = answer;
                    _this.data.token = res;
                    console.log(status);
                    _this.loadStepPassword();
                },function(errMsg){
                    formError.show(errMsg);
                });
                //没有输入答案的时候
               }else{
                   formError.show('请输入密码提示问题的答案')
               }
           });
        //提交新密码按钮
        $('#submit-password').click(function(){
            var password = $.trim($('#password').val());
                if(password&&password.length>=6){
                    //检查密码问题答案
                    _user.resetPassword({
                        username:_this.data.username,
                        password:password,
                        forgetToken:_this.data.token,
                    },function(res){
                       window.location.href = './result.html?type=pass-reset'
                    },function(errMsg){
                        formError.show(errMsg);
                    });
                    //没有输入答案的时候
                   }else{
                       formError.show('请输入不少于6位的新密码')
                   }
        });
    },
    //这个是加载输入用户名的第一步
    loadStepUsername:function(){
        $('.step-username').show()
    },
    //这是加载密保问题问题
    loadStepQuestion:function(){
        //清除错误提示
        formError.hide();
        //做容器的切换
        $('.step-username').hide();
        $('.step-question').show().find('.question-text').text(this.data.question);

        
    },
    //这个是新密码提交
    loadStepPassword:function(){
        formError.hide();
        $('.step-question').hide();
        $('.step-password').show()
    }
    
};


$(function(){
    page.init();  
});