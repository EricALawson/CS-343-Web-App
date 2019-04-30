var admin = require("firebase-admin");
var serviceAccount = require("./public/JSON/gameme-6de77-44daabfc2427.json");
// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://gameme-6de77.firebaseio.com"
});
var db = admin.database();