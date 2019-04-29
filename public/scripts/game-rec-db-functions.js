var insertGameRecs = ( gameRecs ) => {
	var user = firebase.auth().currentUser;
	var curTime = firebase.firestore.FieldValue.serverTimestamp();

	db.collection( "gamerecs" ).doc( user.uid + "-" +  ).add({
		recommended: gameRecs,
	    time: curTime,
	    user-id: user.uid
	})
	.catch(function( error ) {
	    console.error("Error adding document: ", error);
	});
}

var deleteGameRecs = ( quizId ) => {

	db.collection( "gamerecs" ).doc( quizId ).delete()
	.catch(function( error ) {
	    console.error("Error deleting document: ", error);
	});
}