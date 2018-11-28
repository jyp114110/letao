// 进度条效果


$(document).ajaxStart(function(){
  NProgress.start();
  console.log(1);
  
  
});

$(document).ajaxStop(function(){
  // 模拟
  setInterval(function(){
    NProgress.done();
  },500)
});




// 侧边栏 下拉菜单
$('.aside .category').on('click',function(){
  // console.log('1');
  $(this).next().stop().slideToggle();
  
});


// 顶部 topbar 侧边栏隐藏  右边拉宽
$('.topbar .icon_left').on('click',function(){
  // console.log('1');
  $('.aside').toggleClass('hidemenu');
  $('.main').toggleClass('hidemenu');
  $('.topbar').toggleClass('hidemenu');
  
});


//  点击 模态框 退出 按钮， 销毁登录状态 跳转到 登录页面
$('.modal .btn-logout').on('click',function(){
  // console.log('1');
  $.ajax({
    type:'get',
    dataType:'json',
    url:'/employee/employeeLogout',
    success:function(info){
      console.log(info);
      if(info.success){
        location.href = 'login.html';
      }
      
    }
  })
  
})