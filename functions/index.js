const functions = require('firebase-functions');

var admin = require("firebase-admin");
admin.initializeApp({
  serviceAccountId: "firebase-adminsdk-kzujk@nussave-app.iam.gserviceaccount.com"
});

console.log(process.env.FIREBASE_CONFIG);

exports.getToken = functions.https.onCall((data, context) => {
    adminDbRef = admin.database().instance("nussave-app").ref('/User/Admin');
    adminDbRef.once('value', function(snapshot){
        admins = snapshot.val();
        var rightCred = false;
        var adminId;
        for(var admin in admins){
            if(data["username"] == admins[admin]["username"] 
                && data["password"] == admins[admin]["password"]){
                    rightCred = true;
                    adminId = admin;
                    break;
            }
        }
        if(rightCred){
            var additionalClaims = {
                isAdmin: true
            }
            admin.auth().createCustomToken(adminId).then(function(customToken) {
                return customToken;
                })
                .catch(function(error) {
                console.log("Error creating custom token:", error);
                });
        }
        else{
            // Wrong credentials
            return null;
        }
    })
});
