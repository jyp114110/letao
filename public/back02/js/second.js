$(function(){
  // 页面渲染
  var currentPage = 1;
  var pageSize = 5;
  render();
  function render(){
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize,
      },
      dataType: 'json',
      success: function (info) {
        // console.log(info);
        var htmlStr = template('secondTmp', info)
        $('tbody').html(htmlStr);

        //  分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          page: currentPage,
          totalPages: Math.ceil(info.total / info.size),

          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render();

          }

       })


      }
    })
  };

  //  点击 添加按钮 模态框显示
  $('.addBtn').on('click',function(){
    $('#secondModal').modal('show');

    //  渲染下拉菜单内容
    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{
        page:1,
        pageSize: 100,

      },
      dataType: 'json',
      success:function(info){
       var htmlStr = template('dropM',info);
        $('.dropdown-menu').html(htmlStr);
        
      }

    })
  });


  // 给下拉列表的 a 添加点击事件(通过事件委托实现)
  $('.dropdown-menu').on('click','a',function(){
    var txt = $(this).text();
    // console.log(txt);
    $('#dropdownText').text(txt);
    var id = $(this).data("id");
    // console.log(id);
    $('#categroyId').val(id);
    // console.log($('#categroyId').val());
   
   
    

    // console.log($('#form'));
    
    $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID")


  });

  //  图片上传
  $('#fileUpload').fileupload({
    dataType:'json',
    done:function(e,data){
      var picObj = data.result;
      // console.log(picObj);
      var picUrl = picObj.picAddr;
      $('#imgBox img').attr('src',picUrl);
      $('#imgUrl').val(picUrl);

      $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID")
      
    }

  });

  // 表单校验
  $('#form').bootstrapValidator({
    // 重置排除项, 都校验, 不排除
    excluded: [],

    // 配置校验图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',    // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    // 指定校验字段
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类名称"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请上传图片"
          }
        }
      }
    }
  });


//  注册表单校验成功事件，发送 ajax请求
$('#form').on('success.form.bv',function(e){
  e.preventDefault();
  $.ajax({
    type:'post',
    url:'/category/addSecondCategory',
    data:$('#form').serialize(),
    dataType:'json',
    success: function(info){
      // console.log(info);
      // 关闭模态框
      $('#secondModal').modal('hide');
      // 重新赋值当前页
      currentPage = 1;
      // 重新渲染第一页
      render();

      // 重置表单域
      $('#form').data('bootstrapValidator').resetForm(true);
      //  重置 文本框 和 图片
      $('#dropdownText').text('请输入一级分类');
      $('#imgBox img').attr('src','./images/none.png');
    }
    


  })
})

 


 
})