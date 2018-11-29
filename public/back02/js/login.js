$(function(){
  // console.log($('#form')); 
  // 表单校验
  
  $('#form').bootstrapValidator({
    
    feedbackIcons:{
      valid:'glyphicon glyphicon-ok',
      invalid:'glyphicon glyphicon-remove',
      validating:'glyphicon glyphicon-refresh',
    },
    fields:{
      username:{
        validators:{
          notEmpty:{
            message:'用户名不能为空',

          },
          stringLength:{
            min:2,
            max:6,
            message:'用户名长度必须是2-6位'
          },
          callback:{
            message:'用户名不存在'
          }
        }
      },
      password:{
        validators:{
          notEmpty:{
            message:'密码不能为空'
          },
          stringLength:{
            min:6,
            max:12,
            message:'密码长度必须是6-12位'
          },
          callback:{
            message:'密码错误'
          }
        }
      }
      

    }
  })
  //  ajax 请求
  $('#form').on('success.form.bv',function(e){
    // 阻止默认跳转
    e.preventDefault();
    $.ajax({
      type:'post',
      url:'/employee/employeeLogin',
      data:$('form').serialize(),
      dataType:'json',
      success:function(info){
        console.log(info);
        if(info.error === 1000){
          // alert('用户名不存在');
          // 修改提示信息
          $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback');

          return;
        }

        if(info.error === 1001){
          // alert('密码错误');
          $('form').data('bootstrapValidator').updateStatus('password','INVALID','callback');
          return;
        }

        if(info.success){
          location.href = 'index.html';
        }
        

      }
    })

  })

  // 表单重置
  $("[type='reset']").click(function(){
    var validator = $("#form").data('bootstrapValidator');
    validator.resetForm(true);
  })
});
