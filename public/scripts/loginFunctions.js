var usernameDiv = document.getElementById( 'username' );
var loginButton = document.getElementById( 'googleIco' );
var signOutBtn  = document.getElementById( 'signOut' );

var googleLogin = () => {
	const provider = new firebase.auth.GoogleAuthProvider();

	firebase.auth().signInWithRedirect( provider )
		.then( result => {
			const user = result.user;
			window.location.reload();
			console.log( user );
		})
		.catch( console.log )
}

var googleLogout = () => {
	firebase.auth().signOut()
		.then( function() {
			window.location.href = "/public/index.html";
		}).catch((err)=>{console.log(err)});
		delete_cookie("userid");
}

loginButton.addEventListener("click",googleLogin);

var isLoggedIn = () => {
	firebase.auth().onAuthStateChanged( function( user ) {
		if( user ) {
			if(!user.isAnonymous){
				usernameDiv.innerHTML = `Logged in as ${user.displayName}`;
				$("#profPic").attr("src",user.photoURL);
				$(".loginBtns").removeClass("flex").addClass("hidden");
				$(".signOut").removeClass("hidden").addClass("flex");
			}
			else{
				usernameDiv.innerHTML = `Logged in as Anonymous User`;
				$("#profPic").attr("src","/public/genProfPic.png");
				$(".loginBtns").removeClass("flex").addClass("hidden");
				$(".signOut").removeClass("hidden").addClass("flex");
			}

		} else {
			$(".loginBtns").removeClass("hidden").addClass("flex");
			$(".signOut").removeClass("flex").addClass("hidden");
		}
	});
}

$(document).ready(isLoggedIn);
loginButton.addEventListener("click",googleLogin);
signOutBtn.addEventListener("click",googleLogout);

function delete_cookie( name ) {
	document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }