$.ajax({
  type:'get',
  dataType:'json',
  url:'/employee/checkRootLogin',
  success:function(info){
    if(info.error == 400){
      // 未登录 实施登录拦截
      location.href = 'login.html';
      return;
    }

    if(info.success){
      // 登录过 
      console.log('已登录');
      // location.href = 'index.html'
      
     
    }
    
  }
})