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
          totalPages : Math.ceil(info.total / info.size),
          onPageClicked: function(a,b,c,page){
            // console.log(page);
            currentPage = page;
            render();

          }

        });

        
      }
    });
  };


  //  为 操作按钮 注册事件， 改变 商品的状态  ==> 没有提供 后端接口
  // $('tbody').on('click','.btn',function(){
  //   var id = $(this).parent().data("id");
  //   // console.log(id);
  // });

  // 点击 添加商品按钮 显示 模态框
  $('#addBtn').on('click',function(){
    $('#productModal').modal('show');

    // 发送 ajax，动态渲染

  })

})