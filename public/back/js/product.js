$(function(){
  var currentPage = 1;  // 当前页
  var pageSize = 5;   // 每页条数
  var picArr = [];
  // 页面渲染
  render();
  function render(){
    
    $.ajax({
         type: "get",

      url:"/product/queryProductDetailList",
       data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType:'json',
       success: function (info) {
        console.log(info);
        var htmlStr = template("productTmp", info);
        $('tbody').html(htmlStr);

        // 分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:info.page,
          totalPages:Math.ceil(info.total / info.size),

          onPageClicked: function(a,b,c,page){
            currentPage = page;
            render();

          }

        })

        
      }
    });

    

  };

// 点击添加分类按钮 显示模态框
  $('#addBtn').on('click',function(){
    $('#productModal').modal('show');

    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page:1,
        pageSize:100,
      },
      dataType:'json',
      success:function(info){
        console.log(info);
        var htmlStr = template('cateTmp',info)
        $('.dropdown-menu').html(htmlStr);
        
      }
    });
  });


  // 上传图片
  $('#fileupload').fileupload({
    dataType:'json',
    done:function(e,data){
      var picObj = data.result;
      picArr.unshift(picObj);
      var picUrl = picObj.picAddr;
      $('#imgBox').prepend(' <img src= ' + picUrl + '  width=100px>');

      if(picArr.length > 3){
        picArr.pop();
        $('#imgBox img:last-of-type').remove();
      };

      if(picArr.length === 3){
        $('#form').data("bootstrapValidator").updateStatus("picStatus", "VALID");
      }
    
    
    }
  });

  //  给下拉菜单 a 注册点击事件
  $('.dropdown-menu').on('click','a',function(){
    // console.log(1);
    var txt = $(this).text();
    $('#dropdownText').text(txt);
    var id = $(this).data('id');
    $('[name="brandId"]').val(id);
    $('#form').data("bootstrapValidator").updateStatus("brandId", "VALID");
    
  })


  //  表单校验
  // 5. 添加表单校验
  $('#form').bootstrapValidator({
    // 重置排除项, 都校验, 不排除
    excluded: [],

    // 配置校验图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',    // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    // 配置校验字段
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
          //正则校验
          // \d  0-9
          // ?   0次或1次
          // +   1次或多次
          // *   0次或多次
          // {n,m}  出现n次到m次
          // {n}  出现n次
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存格式, 必须是非零开头的数字'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品尺码"
          },
          //正则校验
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '尺码格式, 必须是 xx-xx格式, xx为两位数字, 例如 36-44'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品现价"
          }
        }
      },
      picStatus: {
        validators: {
          notEmpty: {
            message: "请上传3张图片"
          }
        }
      }
    }
  });


  // 注册表单成功事件
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();
    var paramsStr = $('#form').serialize();

    paramsStr += "&picName1=" + picArr[0].picName + "&picAddr1=" + picArr[0].picAddr;
    paramsStr += "&picName2=" + picArr[1].picName + "&picAddr2=" + picArr[1].picAddr;
    paramsStr += "&picName3=" + picArr[2].picName + "&picAddr3=" + picArr[2].picAddr;

    $.ajax({
      type: "post",
      url: "/product/addProduct",
      data: paramsStr,
      dataType: "json",
      success: function (info) {
        console.log(info);
        if (info.success) {
          // 关闭模态框
          $('#productModal').modal("hide");
          // 重新渲染第一页
          currentPage = 1;
          render();
          // 重置内容和状态
          $('#form').data("bootstrapValidator").resetForm(true);

          // 按钮文本和图片需要手动重置
          $('#dropdownText').text("请选择二级分类");
          $('#imgBox img').remove();
          picArr = [];
        }
      }
    })
 
  })


})