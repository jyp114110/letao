$(function(){
  var currentPage = 1;
  var pageSize = 5;
  render();
  // 页面渲染
  function render(){
    // ajax 渲染页面
    $.ajax({
      type:'get',
      url:'/product/queryProductDetailList',
      data:{
       page: currentPage,
       pageSize:pageSize,

      },
      dataType:'json',
      success:function(info){
        console.log(info);
        var htmlStr = template('productTmp',info);
        $('tbody').html(htmlStr);

        //  分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPage : Math.ceil(info.total / info.size),
          onPageClicked: function(a,b,c,page){
            console.log(page);
            currentPage = page;
            render();

          }

        });

        
      }
    });
  

  };



})