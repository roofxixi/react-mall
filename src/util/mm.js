
var Hogan = require('hogan');
var conf = {
    serverHost:'',
};
var _mm = {
    request:function(param){
        var _this = this;
        $.ajax({
            type    :   param.method||'GET',
            url     :   param.url||'',
            dataType:   param.type||'json',
            data    :   param.data||'',
            success :   function(res){
                //请求成功
                if(0===res.status){
                    typeof param.success ==='function' 
                    && param.success(res.data,res.msg);   
                }else if(10 === res.status){
                    //没有登录跳转登录
                    _this.doLogin();
                }else if(1===res.status){
                    //请求数据错误
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error   :   function(err){
                //请求出现错误
                typeof param.error === 'function' && param.error(err.status);
            }

        })
    },
    //统一登录
    doLogin:function(){
        window.location.href = './user-login.html?redirect='+encodeURIComponent(window.location.href);
    },
    //获取服务器地址
    getServerUrl:function(path){
        return conf.serverHost+path;
    },
    //获取url参数
    getUrlParam:function(name){
        // "happymall.com/product/list.do?keyword=roofxixi&page=1".split('?')[1].split('&')
        var reg = new RegExp('(^|&)'+name+'=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null
    },
    //渲染html模板
    renderHtml : function(htmlTemplate,data){
        var template = Hogan.compile(htmlTemplate);
        var result = template.render(data);
        return result;
    },
    //成功提示
    successTips : function(msg){
        alert(msg||'操作成功');
    },
    //错误提示
    errorTips : function(msg){
        alert(msg||'哪里不对了吧');
    },
    
    //字段验证,支持非空判断,手机,邮箱
    validate :function(value,type){
        var value = $.trim(value);
        //非空验证
        if('require'=== type){
            return !!value;
        }
        if('phone'===type){
            return /^[1][3,4,5,7,8][0-9]{9}$/.test(value);
        }
        if('email'===type){
            return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)
        }
    },
    //回到主页
    goHome : function(){
        window.location.href = './index.html'
    }

};

module.exports = _mm;