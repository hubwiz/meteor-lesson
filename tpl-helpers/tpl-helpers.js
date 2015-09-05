//前端代码
if(Meteor.isClient){

  //模板helpers声明
  Template.body.helpers({
    getProfile:function(){
      return {
        name : "John",
        age :28
      }
    },
    mathScore:function(){
      return 99;
    },
    fineartScore:function(){
     return 92;
    }
  });
}
