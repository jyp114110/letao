$(function(){

  var currentPage = 1;
  var pageSize = 5;
  render();
  function render(){
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize,
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        var htmlStr = template('firstTmp', info);
        $('tbody').html(htmlStr);
        console.log(Math.ceil(info.total / info.size));
        

        // 分页
        $('#paginator').bootstrapPaginator({
            bootstrapMajorVersion:3,
            currentPage: info.page,
            totalPages: Math.ceil(info.total / info.size),
            onPageClicked:function(a,b,c,page){
              currentPage = page;
              render();
            }

        })

      }

    })

  };


  // 点击添加分类按钮  出现模态框  
  $('.addBtn').click(function(){
    $('#firstModal').modal('show');

  });

  //  进行表单校验
  $('#firstForm').bootstrapValidator({
   
    // 校验图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh',
    },
    //  校验字段
      fields:{
        categoryName:{
          validators:{
            notEmpty:{
              message:'请输入一级分类名称'
            }
          }
        }
      }
  });

  // 
  // console.log($('#firstForm'));
  
  $('#firstForm').on('success.form.bv',function(e){
    console.log(1);
    e.preventDefault();
    // e.preventDefault();
    $.ajax({
      type:'post',
      url:'/category/addTopCategory',
      data:$('#firstForm').serialize(),
      dataType:'json',
      success:function(info){
        // console.log(info);
        if(info.success){
          $('#firstModal').modal('hide');
          currentPage = 1;
          render();
        }
        
      }
    })
  })


  
})