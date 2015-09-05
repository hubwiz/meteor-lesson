//前端代码
if (Meteor.isClient) {
  //设置Session中flag变量初始值为false
  Session.setDefault("flag",false);

  Template.body.helpers({
    flag : function(){
      return Session.get("flag");
    }
  });

  //点击按钮将切换Session中flag变量的值
  Template.body.events({
    "click button":function(){
      Session.set("flag",!Session.get("flag"));
    }
  });
}
