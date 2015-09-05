//在前端和后端都定义persons集合
var persons = new Mongo.Collection("persons");

//前端代码
if (Meteor.isClient) {
  Template.persons.helpers({
    persons:function(){
      return persons.find();
    }
  });
  Template.persons.events({
    "click a":function(event,tpl){
      event.preventDefault();
      Session.set("id",this._id);
    }
  });
  Template.updater.helpers({
    id:function(){
      return Session.get("id");
    }
  });
  Template.updater.events({
    "click button#inc":function(){
      var id = Session.get("id");
      persons.update({_id:id},{$inc:{age:1}});
    },
    "click button#dec":function(){
      var id = Session.get("id");
      persons.update({_id:id},{$inc:{age:-1}});
    }
  })
}

//后端代码
if(Meteor.isServer){
  Meteor.startup(function(){
    if(persons.find().count() === 0){
      persons.insert({name:"jACK",age:28});
      persons.insert({name:"Mary",age:32});
    }
  });
}
