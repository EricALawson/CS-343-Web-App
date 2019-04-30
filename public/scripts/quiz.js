$(document).ready(function(){
    var quizQuestions;

    firebase.auth().onAuthStateChanged( function( user ) {
        var formID;
        if(user){
            formID=userid;
            setCookie(userid,userid,1);
        }
        else{
            if(getCookie("userid").indexOf("cookie:")==-1){
                formID="cookie:"+makeid(10);
                setCookie("userid",formID,1);
                
            }
        }
        $("form").append("<input name='uid' value=\'"+getCookie("userid")+"\' style='display:none'>");

    })

   /* $.get("http://134.209.14.125:3000/api/quiz",function(data,status){
        console.log(data);
    })*/
    $.get("http://localhost:3000/api/quiz/get",function(data,status){
        quizQuestions = data;
        for(var i=0;i<10;i++){
            $(".question span")[i].innerHTML=data.questions[i].description;
        }

        for(var i=0;i<10;i++)
            for(var j=0;j<5;j++)
                $(".question label input")[i*5+j].name="Q"+data.questions[i].ID;
           

        


    })

})
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

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