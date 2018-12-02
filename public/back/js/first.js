$(function(){
  var currentPage = 1;
  var pageSize = 5;
  // 页面渲染
  render();
  function render(){
    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{
        page:currentPage,
        pageSize:pageSize,
      },
      dataType:'json',
      success:function(info){
        // console.log(info);
        var htmlStr = template('firstTmp',info);
        $('tbody').html(htmlStr);
        
        //  分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage : info.page,
          totalPages:Math.ceil(info.total / info.size),
          onPageClicked:function(a,b,c,page){
            currentPage = page;
            render();

          }
        })
      }
    })

  };

  //  点击添加按钮 出现模态框

  $('#addBtn').on('click',function(){
    $('#dropdown').modal('show');

  });


  // 表单校验
  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields:{
      categoryName:{
        validators:{
          notEmpty:{
            message:'请输入一级分类'
          }
        }
      }
    }
  });


  //  注册表单校验成功shij
  $('#form').on('success.form.bv',function(e){
      
      e.preventDefault();

      $.ajax({

        type:'post',
        url:'/category/addTopCategory',
        data:$('#form').serialize(),
        dataType:'json',

        success:function(info){
          console.log(info);
          if(info.success){
            $('#dropdown').modal('hide');
            currentPage = 1;
            render();
            $('#form').data('bootstrapValidator').resetForm(true);
          }
          
        }
      })
  })


})