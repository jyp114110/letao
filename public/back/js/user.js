$(function(){
   var  currentPage = 1;
   var  pageSize = 5;
  //  页面渲染
  render();
  function render(){
    $.ajax({
      type:'get',
      url:'/user/queryUser',
      data:{
        page:currentPage,
        pageSize:pageSize,
      },
      dataType:'json',
      success:function(info){
        var htmlStr = template('userTmp',info);
        $('tbody').html(htmlStr);

        console.log(Math.ceil(info.total / info.size));
        
        // 分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (event, originalEvent, type, page) {
           currentPage = page;
            render();
          },
          
        })
        
      }
    })
  };


  



})