var insertQuizHistory = ( quizResults ) => {
	var user = firebase.auth().currentUser;
	var curTime = firebase.firestore.FieldValue.serverTimestamp();

	db.collection( "quizhistory" ).doc( user.uid + "-" +  ).add({
		quiz-results: quizResults,
	    time: curTime,
	    user-id: user.uid
	})
	.catch(function( error ) {
	    console.error("Error adding document: ", error);
	});
}

var deleteQuizHistory = ( quizId ) => {
	db.collection( "quizHistory" ).doc( quizId ).delete()
	.catch(function( error ) {
	    console.error("Error deleting document: ", error);
	});
}