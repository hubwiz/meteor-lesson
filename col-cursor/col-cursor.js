news = new Mongo.Collection("news");
if(Meteor.isClient){
  Template.tpl_map.helpers({
    titles:function(){
      return news.find().map(function(item){
        return item.title;
      })
    }
  });
  Template.tpl_fetch.helpers({
    news:function(){
      return news.find().fetch();
    }
  });
  Template.tpl_count.helpers({
    count:function(){
      return news.find().count();
    }
  });
  Tracker.autorun(function(){
    news.find().forEach(function(item){
      $("<li></li>").text(item.title).appendTo("#foreach");
    })
  });
}
if(Meteor.isServer){
  Meteor.startup(function(){
    if(news.find().count()===0){
      news.insert({title:"title 1",source:"xinhua",time:Date.now()});
    }
  });
}
