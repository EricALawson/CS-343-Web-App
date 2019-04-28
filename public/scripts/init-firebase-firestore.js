// Use only when initializing a webpage that utilizes Firestore.
// If not using Firestore on the webpage, use init-firebase.js instead.

var firebaseConfig = {
	apiKey: "AIzaSyDZWlHDj1CLih_xRVLGg2JSxTdWTMeGJXU",
	authDomain: "gameme-6de77.firebaseapp.com",
	databaseURL: "https://gameme-6de77.firebaseio.com",
	projectId: "gameme-6de77",
	storageBucket: "gameme-6de77.appspot.com",
	messagingSenderId: "1040081357704"
};

firebase.initializeApp( firebaseConfig );

var db = firebase.firestore();