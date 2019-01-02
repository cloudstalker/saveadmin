const functions = require('firebase-functions');

var adminInstance = require("firebase-admin");
var serviceAccount = require('./serviceAcc.json');
adminInstance.initializeApp({
    credential: adminInstance.credential.cert(serviceAccount),
    databaseURL: 'https://nussave-app.firebaseio.com'
});

// Getting Login Info & Giving custom tokens back to the client
exports.getToken = functions.region('asia-northeast1').https.onCall((data, context) => {
    const username = data["username"];
    const password = data["password"];
    return adminInstance.database().ref('/User/Admin').once('value')
    .then(function(snapshot)
    {
        admins = snapshot.val();
        var rightCred = false;
        var adminId;
        for(var admin in admins){
            if(username == admins[admin]["username"] 
                && password == admins[admin]["password"]){
                    rightCred = true;
                    adminId = admin;
                    break;
            }
        }

        if(rightCred){
            var additionalClaims = {
                isAdmin: true
            }
            return adminInstance.auth().createCustomToken(adminId, additionalClaims).then(function(customToken) {
                console.log("Admin '" + username + "' trying to sign in");
                return {
                    token: customToken
                };
                })
                .catch(function(error) {
                    console.log("Error creating custom token:", error);
                });
        }
        else{
            // Wrong credentials
            console.log("Wrong credential for " + username);
            return {
                token: "null"
            };
        }
    })
    .catch(error => {
        console.log("error: " + error);
    })
    
});
