//在前端和后端都定义friends集合
var friends = new Mongo.Collection("friends");

//前端代码
if (Meteor.isClient) {
  Template.friends.helpers({
    friends:function(){
      return friends.find();
    }
  });
  Template.friends.events({
    "click button":function(){
      console.log(this);
      friends.remove({_id:this._id});
    }
  });
}

//后端代码
if(Meteor.isServer){
  Meteor.startup(function(){
    if(friends.find().count()===0){
      friends.insert({name:"linda"});
      friends.insert({name:"mary"});
    }
  });
}
