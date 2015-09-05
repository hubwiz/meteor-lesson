//在前端和后端都定义persons集合
var persons = new Mongo.Collection("persons");

//前端代码
if (Meteor.isClient) {
  Session.setDefault("criteria",{});
  Template.persons.helpers({
    persons : function(){
      var criteria = Session.get("criteria");
      return persons.find(criteria);
    }
  });
  Template.criteria.events({
    "click button":function(event,tpl){
      var $name = tpl.$("input");
      var criteria = {};
      criteria.name = $name.val();
      Session.set("criteria",criteria);
    }
  });  
}

//后端代码
if(Meteor.isServer){
  Meteor.startup(function(){
    if(persons.find().count()===0){
      persons.insert({name:"Jacky",age:30,gender:"M",city:"beijing"});
    }
  });
}
