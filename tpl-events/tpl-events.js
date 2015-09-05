//前端代码
if (Meteor.isClient) {

  //为hello模板声明事件绑定
  Template.hello.events({
    "click button":function(event,tpl){
      //采集用户输入的消息文本
      var msg = tpl.$("input").val();

      //从模板的数据上下文获得发送对象和电话号码
      var to = this.name,
          tel = this.tel;

      //模拟发送
      alert("send message to " + to);
    }
  });
}
