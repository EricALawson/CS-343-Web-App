$(document).ready(function(){
    $.get("http://134.209.14.125:3000/api/reccomendation?userid="+getCookie("userid"),function(data,status){
        
      for(var key in data){
        var para = document.createElement("a");
        para.setAttribute("href","https://store.steampowered.com/app/"+data[key].appid)
        var node = document.createTextNode(""+data[key].name+", Score:"+data[key].reviewRatio);
        para.appendChild(node);

        var element = document.getElementById("recs");
        element.appendChild(para);
      }
      
    })
      
});

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

