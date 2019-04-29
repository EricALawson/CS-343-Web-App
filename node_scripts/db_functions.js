exports.insertGameRec = function( gameRec ) {
	var ref = db.ref( "Users" );
	var uid = "Jeremiah";

	if ( uid != null ) {
		ref.child( uid ).child( "GameRec" ).push( gameRec );
	}
}

exports.deleteGameRec = function( gameRec ) {
	var ref = db.ref( "Users" );
	var uid = "Jon";

	if ( uid != null ) {
		ref.child( "/" + uid + "/GameRec/" + gameRec ).remove();
	}
}

exports.insertQuiz = function( quiz ) {
	var ref = db.ref( "Users" );
	var uid = "Jeremiah";

	if ( uid != null ) {
		ref.child( uid ).child( "QuizHistory" ).push( quiz );
	}
}

exports.deleteQuiz = function( quiz ) {
	var ref = db.ref( "Users" );
	var uid = "Jon";

	if ( uid != null ) {
		ref.child( "/" + uid + "/QuizHistory/" + quiz ).remove();
	}
}

exports.readQuizzes = function( uid ) {
	var ref = db.ref( "Users/" + uid + "/QuizHistory" );

	ref.once( 'value', function( snapshot ) {
		console.log( snapshot.val() );
	});
}

exports.readGameRecs = function( uid ) {
	var ref = db.ref( "Users/" + uid + "/GameRec" );

	ref.once( 'value', function( snapshot ) {
		console.log( snapshot.val() );
	});
}