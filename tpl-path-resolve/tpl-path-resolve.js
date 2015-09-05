//前端代码
if (Meteor.isClient) {
  Template.hello.helpers({
    who : function(){
      //根据模板标签中的应用场景，应当返回一个JSON对象
      return {
        name : "WHOAMI",
        age :78
      }
    }
  });
}
