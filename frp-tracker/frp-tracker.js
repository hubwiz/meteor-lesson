//前端代码
if(Meteor.isClient){

  //定义反应式数据类 - 构造函数
  var ReactiveData = function(initVal){
    this.value = initVal;
    
    //使用Tracker.Dependency对象记录依赖关系、传播数据变化
    this.dependency = new Tracker.Dependency();
  };

  //定义反应式数据类  - getter/setter
  ReactiveData.prototype.get = function(){

    //登记调用时的计算上下文对本数据的依赖
    this.dependency.depend();

    return this.value;
  };
  ReactiveData.prototype.set = function(newVal){
    this.value = newVal;

    //触发所有依赖于本数据的计算过程重新计算
    this.dependency.changed();
  }

  Meteor.startup(function(){

    //在页面中插入一个h1元素作为显示区
    $("body").append("<h1></h1>");
    
    //创建两个反应式数据对象
    var ra = new ReactiveData(0),
        rb = new ReactiveData(0);
   
    //启动反应式计算
    Tracker.autorun(function(){
       var a = ra.get(),
           b = rb.get(),
           c = a + b;
       var tpl = "$1 + $2 = $3".replace(/\$1/,a).replace(/\$2/,b).replace(/\$3/,c) 
        
       $("h1").html(tpl); 
    });

    //模拟对反应式数据对象的修改
    setInterval(function(){
      var a = parseInt(Math.random()*1000),
          b = parseInt(Math.random()*1000);
      ra.set(a);
      rb.set(b);
    },1000);
  });

}
