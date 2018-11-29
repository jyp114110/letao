$(function(){

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
        console.log(info);
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

  
 
})