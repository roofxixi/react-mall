//与服务器想联系的

var _mm = require('util/mm.js');

var _user = {
    //登出
    logout:function (resolve,reject) {
        _mm.request({
            url : _mm.getServerUrl('/user/logout.do'),
            method:'POST',
            success:resolve,
            error : reject,
        })
    },
    //检查登录状态
    checkLogin:function(resolve,reject){
        _mm.request({
            url : _mm.getServerUrl('/user/get_user_info.do'),
            method:'POST',
            success:resolve,
            error : reject,
        })
    },
    //登录
    login:function(userInfo,resolve,reject){
     _mm.request({
        url : _mm.getServerUrl('/user/login.do'),
        data:userInfo,
        method:'POST',
        success:resolve,
        error : reject,
     })
    },
    //在注册时候验证用户是否存在
    checkUsername:function(username,resolve,reject){
        _mm.request({
           url : _mm.getServerUrl('/user/check_valid.do'),
           data:{
               type:'username',
                str:username,
           },
           method:'POST',
           success:resolve,
           error : reject,
        })
       },
    //用户注册
    register:function(userInfo,resolve,reject){
        _mm.request({
            url : _mm.getServerUrl('/user/register.do'),
            data:userInfo,
            method:'POST',
            success:resolve,
            error : reject,
         })
    },
    //利用密保问题重置密码
    resetPassword :function(userInfo,resolve,reject){
        _mm.request({
            url : _mm.getServerUrl('/user/forget_reset_password.do'),
            data:userInfo,
            method:'POST',
            success:resolve,
            error : reject,
         })
    },
    //修改密码页的用户获取密保问题
    getQuestion:function(username,resolve,reject){
        _mm.request({
            url : _mm.getServerUrl('/user/forget_get_question.do'),
            data:{
                username:username
            },
            method:'POST',
            success:resolve,
            error : reject,
         })
    },
    checkAnswer:function(userInfo,resolve,reject){
        _mm.request({
            url : _mm.getServerUrl('/user/forget_check_answer.do'),
            data:userInfo,
            method:'POST',
            success:resolve,
            error : reject,
         });
    },
    //获取用户信息
    getUserInfo:function(resolve,reject){
        _mm.request({
            url : _mm.getServerUrl('/user/get_user_info.do'),
            method:'POST',
            success:resolve,
            error : reject,
         });
    },
    //修改用户信息
    updateInfo:function(userInfo,resolve,reject){
        _mm.request({
            url : _mm.getServerUrl('/user/update_information.do'),
            data:userInfo,
            method:'POST',
            success:resolve,
            error : reject,
         });
    },
    updatePassword:function(userInfo,resolve,reject){
        _mm.request({
            url : _mm.getServerUrl('/user/reset_password.do'),
            data:userInfo,
            method:'POST',
            success:resolve,
            error : reject,
         });
    }
}
module.exports=_user; 


