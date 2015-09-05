//前端代码
if(Meteor.isClient){
  //创建一个MiniMongo的本地数据集合
  var contacts = new LocalCollection("blogs");

  //DOM就绪时执行参数函数体
  Meteor.startup(function(){

    //在页面中插入一组DOM元素
    var tpl = "<input type='text' placeholder='name' id='name'>"
            + "<input type='text' placeholder='tel' id='tel'>"
            + "<button>add contact</button>"
            + "<div></div>";
    $("body").append(tpl);

    //点击button时向本地数据集合插入一条记录
    $("button").click(function(){
      //采集用户的输入
      var name = $("#name").val(),
          tel = $("#tel").val();

      //插入数据
      contacts.insert({
        name : name,
        tel : tel
      });  
    });

    //启动反应式计算过程
    Tracker.autorun(function(){
      //使用本地数据集合中的所有记录构造一个table元素
      var $table =$("<table></table>");
      contacts.find().forEach(function(contact){
        var $tr = $table.append("<tr></tr>");
        $tr.append("<td>" + contact.name + "</td>");
        $tr.append("<td>" + contact.tel + "</td>");
        $table.append($tr);
      });

      //更新页面显示
      $("div").html("").append($table);
    });
    
  });
}
