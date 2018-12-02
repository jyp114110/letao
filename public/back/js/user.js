$(function(){
   var  currentPage = 1;
   var  pageSize = 5;
   var currentId;
   var isDelete;
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

  // 用户管理状态
  $('tbody').on('click','.btn',function(){
    $('#userModal').modal('show');
    currentId = $(this).parent().data('id');
    isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
    console.log(isDelete);
    
  });
  $('.add-confirm').on('click',function(){
    $.ajax({
      type:'post',
      url:'/user/updateUser',
      data:{
        id: currentId,
        isDelete: isDelete,
      },
      dataType:'json',
      success:function(info){
        if(info.success){
          $('#userModal').modal('hide');
          render();
        }
      }
    })
  })

  



})