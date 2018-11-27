// 表单校验

$(function(){
 
 
  
  // 初始化表单
  $('#form').bootstrapValidator({
    //1.指定校验字段
    fields:{
      username: {
        validators: {
          notEmpty: {
            message: '用户名不能为空',
          },
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须是2-6位',
          },
          callback:{
            message:'用户不存在',
          }

        }
      },
      password: {
        validators:{
          notEmpty: {
            message: '密码不能为空',
          },
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度必须是6-12位',
          },
          callback: {
            message: '密码错误',
          }
        }
       
      }
    },

    // 2. 指定校验时的图标显示
    feedbackIcons:{
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh',
    },

  });

  // 3. 表单重置
  $('[type="reset"]').click(function(){
    var validator = $('#form').data('bootstrapValidator');
    validator.resetForm(true);
  });


  // 4.表单提交
  $('[type="submit"]').click(function(e){
   
    // 阻止默认跳转事件
    e.preventDefault();
    $.ajax({
      type:'post',
      data:$('#form').serialize(),
      url:'/employee/employeeLogin',
      dataType:'json',
      success:function(info){
        if(info.error === 1000){
          // alert('用户名不存在');
          // 配置 ajax 提示回调函数
          $('#form').data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback');
          return;
        }

        if(info.error === 1001){
          // alert('密码不正确');
          // 配置 ajax 提示回调函数
          $('#form').data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');
          return;

        }

        if(info.success){
          location.href = 'index.html';
        }
      }
    })
  })


});


