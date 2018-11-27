// 配置进度条
// 进度条效果
$(function () {
  $(document).ajaxStart(function () {
    NProgress.start();
  });

  $(document).ajaxStop(function(){
   setInterval(function(){
     NProgress.done();
   },500)
  })
})