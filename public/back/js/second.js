$(function(){
  var currentPage = 1;
  var pageSize = 5;
  render();
  function render(){
    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page:currentPage,
        pageSize:pageSize,
      },
      dataType:'json',
      success:function(info){
        // console.log(info);
        var htmlStr = template('secondTmp',info);
        $('tbody').html(htmlStr);

        //  分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render();
          }
        });
        
      }
    })
  };


  //  点击 添加按钮 出现模态kuang
  $('#addBtn').on('click',function(){
    $('#secondModal').modal('show');

    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{
        page: 1,
        pageSize:100,
      },
      dataType:'json',
      success:function(info){
        var htmlStr = template('dropdown',info);
        $('.dropdown-menu').html(htmlStr);
      }

    });
  });
  // 给下拉列表注册点击事件
  $('.dropdown-menu').on('click','a',function(){
    var txt = $(this).text();
    $('#dropdownText').text(txt);
    var id = $(this).data('id');
    $('[name="categoryId"]').val(id);

    // 更新表单状态
    $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID")


  });

  // 点击 上传文件按钮 发送请求
  $('#fileupload').fileupload({
    dataType:'json',
    done:function(e,data){
      console.log(data);
      var picObj = data.result;
      var picUrl = picObj.picAddr;
      $('#imgBox img').attr('src',picUrl);
      $('[name="brandLogo"]').val(picUrl);

      // 更新表单状态
      $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID")
      
    }
  });

  // 表单校验
  // 5. 添加表单校验功能
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


  //  注册表单校验成功事件

  $('#form').on('success.form.bv', function (e) {

    e.preventDefault();

    $.ajax({

      type: 'post',
      url: '/category/addSecondCategory',
      data: $('#form').serialize(),
      dataType: 'json',

      success: function (info) {
        console.log(info);
        if (info.success) {
          $('#secondModal').modal('hide');
          currentPage = 1;
          render();
          $('#form').data('bootstrapValidator').resetForm(true);
          $('#imgBox img').attr('src', './images/none.png');
          $('#dropdownText').text('请输入一级分类');


        }

      }
    })
  });

})