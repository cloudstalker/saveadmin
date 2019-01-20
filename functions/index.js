const functions = require('firebase-functions');

var adminInstance = require("firebase-admin");
var serviceAccount = require('./serviceAcc.json');
adminInstance.initializeApp({
    credential: adminInstance.credential.cert(serviceAccount),
    databaseURL: 'https://nussave-app.firebaseio.com'
});

// Getting Login Info & Giving custom tokens back to the client
exports.getToken = functions.https.onCall((data, context) => {
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

// Change user name and password
exports.changeCredential = functions.https.onCall((data, context) => {
    const username = data["username"];
    const password = data["password"];
    var adminDbRef = adminInstance.database().ref('/User/Admin');
    return adminDbRef.once('value')
    .then(function(snapshot)
    {
        admins = snapshot.val();
        var rightCred = false;
        var adminId = "AD12345";
        // Single admin account implementation
        var newAdminObj = new Object();
        newAdminObj["username"] = username;
        newAdminObj["password"] = password;
        newAdminObj["id"] = adminId;
        var update = new Object();
        update[adminId] = newAdminObj;
        return adminDbRef.update(update).catch(error => {
            console.log("error: " + error);
        })
    })
    .catch(error => {
        console.log("error: " + error);
    })
});