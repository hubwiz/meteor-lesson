//前端和后端同时定义了msgs数据集合
var msgs = new Mongo.Collection("messages");

//前端代码
if (Meteor.isClient) {

  //messages模板的helper声明
  Template.messages.helpers({
    messages:function(){
      return msgs.find({},{sort:{time:-1}});
    }
  })

  //sender模板中，当点击提交按钮时，在集合中插入数据
  Template.sender.events({
    "submit form":function(event,tpl){
      //阻止重新载入页面
      event.preventDefault();

      //采集用户输入的消息文本
      var $msg = tpl.$("input");

      //如果消息文本非空，插入数据集合
      if($msg.val()){
        msgs.insert({text:"client inserted :" + $msg.val(),time:Date.now()});
        $msg.val("");
      }
    }
  });
}

//后端代码
if(Meteor.isServer){
  Meteor.startup(function(){

    //如果集合中没有数据，插入一些测试数据
    if(msgs.find().count() === 0){
      for(var i=0;i<10;i++)
        msgs.insert({text:"server inserted random message " + Math.random(),time:Date.now()});   
    }

  });
}
