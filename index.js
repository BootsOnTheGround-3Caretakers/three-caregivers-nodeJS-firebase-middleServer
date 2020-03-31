var express = require('express');
var jwt = require('jsonwebtoken');
var sqlite = require('sqlite3');
var crypto = require('crypto');
var admin=require('firebase-admin');

const cors = require("cors");

const KEY = "kissing-dressage-contrite-lied-yanine-electrum-unendingsukiyaki-pays44";
var admin = require("firebase-admin");

var serviceAccount = require("./caregivers-57d5f-firebase-adminsdk-uadod-f7886a13ff.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://caregivers-57d5f.firebaseio.com"
});

var db = new sqlite.Database("users.sqlite3");

var app = express();

app.use(cors());

// app.post('/signup', express.urlencoded(), function(req, res) {
//   // in a production environment you would ideally add salt and store that in the database as well
//   // or even use bcrypt instead of sha256. No need for external libs with sha256 though
//   var password = crypto.createHash('sha256').update(req.body.password).digest('hex');
//   db.get("SELECT FROM users WHERE username = ?", [req.body.username], function(err, row) {
//     if(row != undefined ) {
//       console.error("can't create user " + req.body.username);
//       res.status(409);
//       res.send("An user with that username already exists");
//     } else {
//       console.log("Can create user " + req.body.username);
//       db.run('INSERT INTO users(username, password) VALUES (?, ?)', [req.body.username, password]);
//       res.status(201);
//       res.send("Success");
//     }
//   });
// });

// app.post('/login', express.urlencoded(), function(req, res) {
//   console.log(req.body.username + " attempted login");
//   var password = crypto.createHash('sha256').update(req.body.password).digest('hex');
//   db.get("SELECT * FROM users WHERE (username, password) = (?, ?)", [req.body.username, password], function(err, row) {
//     if(row != undefined ) {
//       var payload = {
//         username: req.body.username,
//       };

//       var token = jwt.sign(payload, KEY, {algorithm: 'HS256', expiresIn: 60}); //30  (number) means seconds, or string "15d"
//       console.log(token);
//       console.log("Success");
//       res.send(token);
//     } else {
//       console.error("Failure");
//       res.status(401)
//       res.send("There's no user matching that");
//     }
//   });
// });

// Authentication middleware to be runon all routes below.
app.use(function(req,res,next) {
  console.log("login check FirebaseToken middleware run");
  // console.log(req.headers);
  // console.log(req.get('firebaseuid'));
  // console.log(req.get('firebasetoken'));
  // console.log( req.get('firebaseuid') & req.get('firebasetoken') );
  if ( req.get('firebaseuid')!=null & req.get('firebasetoken')!=null) {
    var firebase_uid = req.get('firebaseuid');
    var firebase_token = req.get('firebasetoken');
    admin.auth().verifyIdToken(firebase_token)
      .then(function(decodedToken) {
        let uid = decodedToken.uid;
        if (uid==firebase_uid) {
          console.log("Validated: token matches the uid")
          next();
        } else {
          console.log("Bad Token, uid-token mismatch")
          res.send("Bad Token");
        }
      }).catch(function(error) {
        console.log(error.message);
        res.status(401);
        res.send("Couldn't decode firebase token");
      });
  } else {
    res.status(401);
    res.send("Missing Firebase Header");
  }
})

// Routes
//test route for data
app.get('data', function(req, res) {
  try {
    console.log(Date().toString());
    setTimeout(function () {
      res.send("Very Secret Data");
    }, 3000);
  } catch {
    console.log("Should never see this.")
  }
});


app.get('/GettersLookingForMatch', function(req, res) {
  try {
    console.log(Date().toString());
    setTimeout(function () {
      res.send("Very Secret Data");
    }, 3000);
  } catch {
    console.log("Should never see this.")
  }
});


app.get('/GiversAvailableForMatch', function(req, res) {
  try {
    setTimeout(function () {
      res.send("Very Secret Data");
    }, 3000);
  } catch {
    console.log("Should never see this.")
  }
});

app.get('/testPassAlongKey', function(req, res) {
  var serverkey="3CAREGIVERS"
  try {
    axios
  } catch {
    console.log("Should never see this.")
  }
});


let port = process.env.PORT || 3000;
app.listen(port, function () {
    return console.log("Started user authentication server listening on port " + port);
});
