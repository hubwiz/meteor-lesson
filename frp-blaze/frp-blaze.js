//前端代码
if(Meteor.isClient){
  //设置Session中price变量的初始值
  Session.setDefault("price",0.00);

  //DOM就绪时执行参数函数体
  Meteor.startup(function(){

    //创建一个Template对象
    var tpl = new Template("demo",function(){//渲染函数体
      var view = this;
             
      return [HTML.H1("Stock Quotes"), //h1元素
              HTML.P("000938:",        //p元素
                Blaze.View("",function(){ //子视图渲染函数体
                    //返回prices helper的返回值
                  return Spacebars.mustache(view.lookup("price"));
                })
              )
             ]
    });

    //定义Template对象的helper函数
    tpl.helpers({
      "price":function(){
        //返回Session中price变量的当前值
        return  Session.get("price");
      }
    });

    //启动反应式渲染计算过程
    Blaze.render(tpl,document.body);

    //模拟对反应式数据Session的修改
    setInterval(function(){
      Session.set("price",(Math.random()*1000).toFixed(2));
    },1000);
  });
}
