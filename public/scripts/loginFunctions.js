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
		}).catch( console.log )
}

loginButton.addEventListener("click",googleLogin);

var isLoggedIn = () => {
	firebase.auth().onAuthStateChanged( function( user ) {
		if( user ) {
			usernameDiv.innerHTML = `Logged in as ${user.displayName}`;
			$("#profPic").attr("src",user.photoURL);
			$(".loginBtns").removeClass("flex").addClass("hidden");
			$(".signOut").removeClass("hidden").addClass("flex");
		} else {
			$(".loginBtns").removeClass("hidden").addClass("flex");
			$(".signOut").removeClass("flex").addClass("hidden");
		}
	});
}

$(document).ready(isLoggedIn);
loginButton.addEventListener("click",googleLogin);
signOutBtn.addEventListener("click",googleLogout);