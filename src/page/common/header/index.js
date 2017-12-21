


require('./index.css');

var _mm = require('util/mm.js');

var header = {
    init:function () {
        this.onLoad();
        this.bindEvent();
    },
    //回填
    onLoad:function(){
        var keyword = _mm.getUrlParam('keyword');
        //如果keyword存在就回填
        if(keyword){
            $('#search-input').val(keyword);
        }
    },
    bindEvent:function(){
        var _this = this;
        $('#search-btn').click(function(){
            console.log(111);
            _this.searchSubmit();
        });
        $('#search-input').keyup(function(e){
            if(e.keyCode===13){
                _this.searchSubmit();
            }  
        })
    },
    //搜索提交
    searchSubmit:function(){
        var keyword = $.trim($('#search-input').val());
        //如果提交时候有值就正常跳转到list页面
        if(keyword){
            window.location.href = './list.html?keyword='+keyword;
        
        }else{
            _mm.goHome();
        }
    },


}

header.init();


