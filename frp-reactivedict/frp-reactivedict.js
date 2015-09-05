//前端代码
if(Meteor.isClient){

  //DOM就绪后执行参数函数体
  Meteor.startup(function(){
    
    //添加一个button元素和一个h1元素
    $("body").append("<button>改变Konka的电话号码</button><h1></h1>");

    //点击button时随机修改Konka的电话号码
    $("button").click(function(){
      rd.set("Konka",(Math.random()*100000000).toFixed(0));  
    });

    //创建反应式字典
    var  rd = new ReactiveDict("contacts");
    
    //设置字典中Konka的初始值为114
    rd.setDefault("Konka","114");

    //启动反应式计算过程
    Tracker.autorun(function(){
      //从字典中读取Konka的值
      var name = "Konka", 
          tel = rd.get(name);
      
      //更新页面中h1元素的内容，显示Konka的电话号码
      $("h1").html(name + " : " + tel);
    });
  });

}
