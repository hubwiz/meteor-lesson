//后端代码
if(Meteor.isServer){
  //定义远程过程calcSalary，用来计算员工薪酬
  Meteor.methods({
    "calcSalary" : function(name){
      var managers = ["Mary","Linda","Tommy"];
      if(managers.indexOf(name)>=0) return 50000.00;
      else return 15000.00;
    }
  });
}
//前端代码
if(Meteor.isClient){
  Meteor.startup(function(){
    //在页面中插入一个input元素、一个button元素和一个p元素
    var tpl = "<input type='text' placeholder='name...'>\n"
            + "<button>Calculate Salary</button>"
            + "<p></p>";
    $("body").append(tpl);

    //点击按钮时调用RPC方法，并在p元素中显示调用结果
    $("button").click(function(){
      //获得用户输入的员工姓名
      var employee = $("input").val(); 
      
      //调用远程过程
      Meteor.call("calcSalary",employee,function(error,result){
        $("p").html(employee + ":" + result);
      })
    });

  })
}
