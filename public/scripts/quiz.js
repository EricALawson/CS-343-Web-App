$(document).ready(function(){
    var quizQuestions;

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
           
        firebase.auth().onAuthStateChanged( function( user ) {
            console.log(user);
            //if(user){
                //var input = $("input").attr({name:"uid",value:"Jeremiah"}).hide();
                $("form").append("<input name='uid' value=\'"+user.uid+"\' style='display:none'>");
           // }



        })
    })

})

