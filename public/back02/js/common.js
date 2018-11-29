// 进度条效果

$(document).ajaxStart(function(){
  NProgress.start();
})

$(document).ajaxStop(function(){
  setInterval(function(){
    NProgress.done();
  },500)
 
})

$(function(){
  // 侧边栏 下拉菜单效果
  $('.category').on('click', function () {
    // console.log('1');
    $(this).next().stop().slideToggle();

  });


  //  公共 顶部 左侧按钮
  $('.icon_left').on('click', function () {
    console.log(1);

    $('.aside').toggleClass('hidemenu');
    $('.topbar').toggleClass('hidemenu');
    $('.main').toggleClass('hidemenu');
  });


//  公共顶部 退出按钮
 $('.btn-logout').on('click',function(){
  $.ajax({
    type:'get',
    url:'/employee/employeeLogout',
    dataType:'json',
    success:function(info){
      if(info.success){
        location.href = 'login.html';
      }

    }
  })
   

 })



})