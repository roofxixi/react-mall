require('./index.css');
var templateIndex = require('./index.string');
var _mm = require('util/mm.js');

var Pagination = function(){
    var _this = this;
    this.defaultOption = {
        container:null,
        pageNum:1,
        pageRange:3,
        onSelectPage : null
    };
    //事件代理
    $(document).on('click','.pg-item',function(){
        var $this = $(this);
        //如果是active或者disabled不做处理
        if($this.hasClass('active')||$this.hasClass('disabled')){
            return ;
        }
        console.log($this.data('value'));
        typeof _this.option.onSelectPage === 'function'
        ?_this.option.onSelectPage($this.data('value')):'';
    })
}

//渲染分页组件
Pagination.prototype.render = function(userOption){
    this.option = $.extend({},this.Pagination,userOption);
    //判断容器是否是合法的jQuery对象
    
    if(!(this.option.container instanceof jQuery)){
        return ;
    }
    //判断是否只有一页
    if(this.option.pages<=1){
        return ;
    }
    //渲染分页内容
    this.option.container.html(this.getPaginationHtml());
}
//获取分页的html
Pagination.prototype.getPaginationHtml = function(){

    // |上一页| 2 3 4 =5= 6 7 8 |下一页| 5/9
    var html = '';
    var pageArr = [];
    var option  = this.option;
    var start = option.pageNum - option.pageRange > 0
    ?option.pageNum - option.pageRange : 1;
    var end = option.pageNum + option.pageRange < option.pages ?
    //不一样
    option.pageNum + option.pageRange : option.pages  
    pageArr.push({
        name : '上一页',
        value : option.prePage,
        disabled : !option.hasPreviousPage,

    });
    //数字按钮循环
    for(var i=start;i<=end;i++){
        pageArr.push({
            name:i,
            value:i,
            active:(i===option.pageNum)
        })
    };
    // 下一页
    pageArr.push({
        name : '下一页',
        value : option.nextPage,
        disabled : !option.hasNextPage,
    });
    
    html = _mm.renderHtml(templateIndex,{
        pageArr :  pageArr,
        pageNum : option.pageNum,
        pages : option.pages,
    });
    return html;




}

module.exports = Pagination;