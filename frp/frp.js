//前端代码
if(Meteor.isClient){
  //定义一个计算上下文
  var _compution_;

  //定义反应式数据类 - 构造函数
  var ReactiveData = function(initVal){
    this.value = initVal;
    this.dependent = null;
  }

  //反应式数据类 - getter/setter
  ReactiveData.prototype.get = function(){
    this.dependent = _compution_;
    return this.value;
  };
  ReactiveData.prototype.set = function(newVal){
    this.value = newVal;
    this.dependent && this.dependent.call(null);
  }

  //反应式计算启动函数
  var ReactiveRun = function(compution){

    //将参数计算过程compution设置为计算上下文
    _compution_ = compution;

    //通过初次调用计算过程，建立数据间依赖关系
    compution.call(null);
  }

  Meteor.startup(function(){

    //在页面上插入一个h1元素作为显示区
    $("body").append("<h1></h1>");

    //定义变量和处理函数
    var ra = new ReactiveData(0),
        rb = new ReactiveData(0),
        processor = function(r1,r2){return r1.get()+r2.get()};

    //定义计算过程
    var compution = function(){
      var a = ra.get(),
          b = rb.get(),
          c = processor.call(null,ra,rb),
          tpl = "$1 + $2 = $3".replace(/\$1/,a).replace(/\$2/,b).replace(/\$3/,c);
      
      //更新显示内容
      $("h1").html(tpl);
    }

    //启动反应式计算
    ReactiveRun(compution);

    //用来改变数据的测试代码
    setInterval(function(){
      var a = parseInt(Math.random()*1000),
          b = parseInt(Math.random()*1000);
      ra.set(a);
      rb.set(b);
    },1000);

  });

}
