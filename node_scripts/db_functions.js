exports.insertGameRec = function( uid, gameRec ) {
	var ref = db.ref( "Users" );

	if ( uid != null ) {
		ref.child( uid ).child( "GameRec" ).push( gameRec );
	}
}

exports.deleteGameRec = function( uid, gameRec ) {
	var ref = db.ref( "Users" );

	if ( uid != null ) {
		ref.child( "/" + uid + "/GameRec/" + gameRec ).remove();
	}
}

exports.insertQuiz = function( uid, quiz ) {
	var ref = db.ref( "Users" );

	if ( uid != null ) {
		ref.child( uid ).child( "QuizHistory" ).push( quiz );
	}
}

exports.deleteQuiz = function( uid, quiz ) {
	var ref = db.ref( "Users" );

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