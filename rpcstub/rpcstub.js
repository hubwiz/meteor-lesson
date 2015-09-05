//后端代码
if(Meteor.isServer){
  //定义远程过程hello
  Meteor.methods({
    "hello":function(){
        //在返回之前故意延时5秒钟，以便看到本地stub的效果
       var t1 = Date.now();
       while((Date.now() - t1) < 5000) ;
       return "Hello form rpc server.";
     }
  });
}
if(Meteor.isClient){
  //定义远程过程hello的本地stub
  Meteor.methods({
    "hello":function(){
      $("p").html("wait please...");
    }
  });

  Meteor.startup(function(){
     //在页面中插入一个button元素和一个p元素
    var tpl = "<button>call hello on server</button>"
            + "<p></p>";
    
     $("body").append(tpl);

     //点击button元素时，在p元素内显示RPC调用的结果
    $("button").click(function(){
      Meteor.call("hello",function(error,result){
        $("p").html(result);
      });
    });
  });
}
