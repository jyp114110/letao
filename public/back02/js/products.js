$(function(){
  var currentPage = 1;
  var pageSize = 5;
  // 图片数组
  var picArr = [];
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

    // 发送 ajax，动态渲染，下拉列表
    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page: 1,
        pageSize: 100,
      },
      dataType:'json',
      success:function(info){
        // console.log(info);
        var htmlStr = template('dropdown',info);
       
        $('.dropdown-menu').html(htmlStr);
        
      }
    });


  });

  // 给下拉列表 a 注册点击事件 
  $('.dropdown-menu').on('click','a',function(){
    // console.log('1');
    var txt = $(this).text();
    var id = $(this).data('id');
    console.log(txt,id);
    $('#dropdownText').text(txt);
    $('[name=brandId]').val(id);


    //  更新表单字段状态
    $('#form').data('bootstrapValidator').updateStatus('brandId','VALID');
    
    
  });


  // 上传图片
  $('#fileupload').fileupload({
    dataType:'json',
    done:function(e,data){
      // console.log(data.result);
      picArr.unshift(data.result);
      var picLength = picArr.length;
      console.log(picLength);
      // 判断图片数量
      if( picLength > 3){
        picArr.pop();
        $('#imgBox img:last-of-type').remove();
      };
      var picObj = data.result;
      
      // console.log(picArr);
      
      var picUrl = picObj.picAddr;
      //  重置表单
     if(picLength === 3){

       $('#form').data('bootstrapValidator').updateStatus('picStatus', 'VALID');
     };
      $('#imgBox').prepend("<img src=" + picUrl + " width=100px >");

    }
  });



  // 表单校验
  $('#form').bootstrapValidator({
    // 1. 指定不校验的类型
    excluded:[],

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    // 3.指定校验字段
    fields:{
      brandId:{
        validators: {
          notEmpty: {
            message: '请输入商品名称',
          },
        }

      },
      proName:{
        validators:{
          notEmpty:{
            message:'请输入商品名称',
          },
      
        }

      },
      proDesc:{
       validators:{
         notEmpty: {
           message: '请输入商品描述',
         }
       }
      },

      num:{
        validators:{
          notEmpty: {
            message: '请输入商品库存'
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存格式, 必须是非零开头的数字',
          }
        }
      },
      
      size:{
        validators:{
          notEmpty: {
            message: '请输入商品尺码',
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '尺码格式, 必须是 xx-xx格式, xx为两位数字, 例如 36-44'
          }
        }
      },
      oldPrice:{
       validators:{
         notEmpty: {
           message: '请输入商品原价',
         }
       }
      },

      price:{
       validators:{
         notEmpty: {
           message: '请输入商品现价',
         }
       }
      },

      picStatus:{
        validators:{
          notEmpty:{
            message:'请上传3张图片',
          }
        }
      }


    }

  });


  //  注册表单校验成功事件
  $('#form').on('success.form.bv',function(e){

    e.preventDefault();
    var paramsStr = $('#form').serialize();
    paramsStr += "&picName1=" + picArr[0].picName + "&picAddr1=" + picArr[0].picAddr;
    paramsStr += "&picName2=" + picArr[1].picName + "&picAddr2=" + picArr[1].picAddr;
    paramsStr += "&picName3=" + picArr[2].picName + "&picAddr3=" + picArr[2].picAddr;


    $.ajax({
      type:'post',
      data:paramsStr,
      url:'/product/addProduct',
      dataType:'json',
      success:function(info){
        // console.log(info);
        if(info.success){
          // 关闭模态kuang
          $('#productModal').modal('hide');
          currentPage = 1;
          render();
          // 重置
          $('#form').data('bootstrapValidator').resetForm(true);
          $('#dropdownText').text('请输入二级分类');
          $('#imgBox img').remove();
          picArr = [];


        }
        
      }
    })
  });
  

});