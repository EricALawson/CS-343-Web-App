var usernameDiv = document.getElementById( 'usernameDiv' );
var loginButton = document.getElementById( 'loginButton' );

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

loginButton.addEventListener( "click", function() {
	isLoggedIn();
});

var isLoggedIn = () => {
	firebase.auth().onAuthStateChanged( function( user ) {
		console.log(user);
		if( user ) {
			usernameDiv.innerHTML = `Logged in as ${user.displayName}`;
			loginButton.innerHTML = `Logout`;
			loginButton.setAttribute( "onClick", "googleLogout()" );
		} else {
			usernameDiv.innerHTML = `You are currently not logged in`;
			loginButton.innerHTML = `Login`;
			loginButton.setAttribute( "onClick", "googleLogin()" );
		}
	});
}