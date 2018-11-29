
$(function(){

  var  currentPage = 1;
  var pageSize =5 ;
  var currentId;
  var isDelete;
  render();
  // 渲染函数
  function render(){
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      dateType: 'json',
      data: {
        page: currentPage,
        pageSize: pageSize,
      },
      success: function (info) {
        // console.log(info);
        var htmlStr = template('userTmp', info);
        $('tbody').html(htmlStr);
        // console.log(Math.ceil(info.total / info.size),);
        
        //  分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          // currentPage = info.page,
          currentPage: info.page, // 当前页
          totalPages : Math.ceil(info.total / info.size),
          onPageClicked:function(a,b,c,page){
            //  console.log(page);
             currentPage = page;
             render();
             
          }

        })
      }
    })
  };


  //  点击 禁用 启用 按钮
  $('tbody').on('click','.btn',function(){
    // console.log(1);
    $('#userModal').modal('show');
    //  获取 当前 id
    currentId = $(this).parent().data('id');
    isDelete = $(this).hasClass('btn-danger') ? 0 : 1 ;
    
  });
  $('.btn-confirm').click(function(){
    $.ajax({
      type:'post',
      url:'/user/updateUser',
      data:{
        id:currentId,
        isDelete:isDelete,
      },
      dateType:'json',
      success:function(info){
        if(info.success){
          console.log(info);
          $('#userModal').modal('hide');
          render();
        }


      }

    })

  })







})