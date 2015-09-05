//前端代码
if(Meteor.isClient){

  //DOM就绪后执行startup的参数函数
  Meteor.startup(function(){
    $("body").append("<h1></h1>");

    //常见反应式变量
    var ra = new ReactiveVar(0),
        rb = new ReactiveVar(0);

    //启动反应式计算
    Tracker.autorun(function(){
      var a = ra.get(),
          b = rb.get(),
          c = a + b;
      var tpl = "$1 + $2 = $3".replace(/\$1/,a).replace(/\$2/,b).replace(/\$3/,c);
      $("h1").html(tpl);
    });

    //模拟对反应式变量的修改
    setInterval(function(){
      var a = parseInt(Math.random()*1000),
          b = parseInt(Math.random()*1000);
      ra.set(a);
      rb.set(b);
    },1000);
  });
}
