var myCharts1 = echarts.init(document.querySelector('.echarts_left'));
var myCharts2 = echarts.init(document.querySelector('.echarts_right'));
console.log(myCharts2);
var option1 = {
  //标题
  title: {
    // 标题文本
    text: '2018年黑马31期班级人数'
  },
  // 提示框
  tooltip: {},
  // 图例组建
  legend: {
    data: ['人数','年龄']
  },
  xAxis: {
    data: ['男','女']
  },
  yAxis: {},
  series: [{
    name: '人数',
    type: 'bar',
    data: [29,44]
  },{
    name:"年龄",
    type:'line',
    data:[28,18]
  }]
}


myCharts1.setOption(option1);

var option2 ={

    // 标题
    title: {
      // 主标题文本
      text: '某站点用户访问来源',
      // 副标题文本
      subtext: '纯属虚构',
      // 位置 水平居中
      x: 'center'
    },
    // 提示框组建
    tooltip: {
      // 触发条件
      trigger: 'item',
      // {a} 系列名称  {b} 数据项名称 {c} 数值 {d} 百分比
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    //  图例组件
    legend: {
      // 方向：垂直
      orient: 'vertical',
      // 位置： 靠左
      left: 'left',
      // 图例
      data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          { value: 335, name: '直接访问' },
          { value: 310, name: '邮件营销' },
          { value: 234, name: '联盟广告' },
          { value: 135, name: '视频广告' },
          { value: 1548, name: '搜索引擎' }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
};

myCharts2.setOption(option2);


