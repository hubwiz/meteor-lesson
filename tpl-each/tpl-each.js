//前端代码
if (Meteor.isClient) {
  Template.list.helpers({
    friends:function(){
      //根据在模板标签中的具体应用，应当返回对象数组
      return [
        {name:"Tracer"},
        {name:"Tyrion"},
        {name:"Samus Aran"},
        {name:"Heisenberg"},
        {name:"Bender"}
      ];
    }
  });
}
