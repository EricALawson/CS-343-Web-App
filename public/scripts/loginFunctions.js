document.addEventListener( "DOMContentLoaded", event => {
	const app = firebase.app();
});

var googleLogin = () => {
	const provider = new firebase.auth.GoogleAuthProvider();

	firebase.auth().signInWithPopup( provider )
		.then( result => {
			const user = result.user;
			window.location.href( "http://localhost:3000" );	//	<==== TODO: Change to user's current web page
			console.log( user );
		})
		.catch( console.log )
}

var googleLogout = () => {
	firebase.auth().signOut()
		.then( function() {
			window.location.href( "http://localhost:3000" );
		}).catch( console.log )
}

var isLoggedIn = () => {
	firebase.auth().onAuthStateChanged( function( user ) {
		console.log(user);
		/*
		HTML CHANGED

		Use Event Listeners
		Ex.

		logOutBtn.addEventListener('click',(e)=>{
    		//logOut
    		firebase.auth().signOut();
    		location.reload();
    		console.log("log out");
  		});


		if( user ) {
			document.getElementById( 'usernameDiv' ).innerHTML = `Logged in as ${user.displayName}`;
			document.getElementById( 'loginButton' ).innerHTML = `Logout`;
			document.getElementById( 'loginButton' ).setAttribute( "onClick", "googleLogout()" );
		} else {
			document.getElementById( 'usernameDiv' ).innerHTML = `You are currently not logged in`;
			document.getElementById( 'loginButton' ).innerHTML = `Login`;
			document.getElementById( 'loginButton' ).setAttribute( "onClick", "googleLogin()" );
		}
		*/
	});
}