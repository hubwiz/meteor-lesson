if (Meteor.isClient) {
  //设置Session中tplname变量初始值为blogs
  Session.setDefault("tplname","blogs");

  //导航模板的helpers声明
  Template.navi.helpers({
    links : ["blogs","musics","sports"]
  });

  //导航模板初次被渲染时，为所有的li元素绑定click时间
  Template.navi.onRendered(function(){
    this.$("li").click(function(){
      //在点击li元素时，设置Session中tplname变量的值
      Session.set("tplname",$(this).text());
    });
  });

  //body模板的helpers声明
  Template.body.helpers({
    tplname : function(){
      return Session.get("tplname");
    }
  });
  
}
