//后端代码
if(Meteor.isServer){
  //发布数据集ezpub 
  Meteor.publish("ezpub",function(){
    //保存发布句柄
    var self = this;
    var id = 0;
    
    //初始就绪
    self.ready();
    
    //模拟数据变化
    setInterval(function(){
      var data = (Math.random()*200).toFixed(2);
      //通告集合pm2.5中的数据变化
      self.added("pm2.5",++id,{data:data,time:Date.now()});
    },1000);
  });
}

//前端代码
if(Meteor.isClient){

  //创建一个pm2.5的集合，用来接收服务端ezpub数据集中pm2.5集合的数据变化
  var pm25 = new Mongo.Collection("pm2.5");
  
  //订阅服务端发布的ezpub数据集
  Meteor.subscribe("ezpub");
  
  Meteor.startup(function(){

    //在页面中插入一个h1元素作为数据显示容器
    $("body").append("<h1></h1>");

    //监听pm2.5数据集的变化，更新h1元素的内容
    pm25.find().observe({
       "added":function(doc){
         $("h1").html("PM2.5 : " + doc.data);
       }
    });
  });
}
