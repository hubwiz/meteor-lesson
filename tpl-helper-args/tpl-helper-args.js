//前端代码
if(Meteor.isClient){
  Template.demo.helpers({
    calcSalary:function(name,kwp){
      //使用hash对象访问关键字参数值
      var overtime = kwp.hash.overtime;

      var ret = 20000.00;
      if(overtime) ret = ret + 2000;
      if(name === "John") ret = ret + 1000;
      return ret;
    }
  });
}
