var express = require('express');
// var jwt = require('jsonwebtoken');
// var sqlite = require('sqlite3');
var crypto = require('crypto');
var admin=require('firebase-admin');
var bodyParser = require('body-parser')
const cors = require("cors");
const KEY = (Math.floor(Math.random()* (10**15)).toString()) + "kfsafissing-dressage-contrite-lied-yanine-electrum-unendingsukiyaki-pays44-"+ (Math.floor(Math.random()* (10**15)).toString());
// console.log(KEY);
var serviceAccount = require("./caregivers-57d5f-firebase-adminsdk-uadod-f7886a13ff.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://caregivers-57d5f.firebaseio.com"
});

// var db = new sqlite.Database("users.sqlite3");
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
app.get('/data', function(req, res) {
  try {
    console.log(Date().toString());
    setTimeout(function () {
      res.send("Very Secret Data");
    }, 3000);
  } catch {
    console.log("Should never see this.")
  }
});

//////////////// USER ROUTES
app.get('/user/CreateOrEditMyGiveOffers', function(req, res, next) {
  // get the list of give offers for this userEmail, from daniel
  // Display it as a form.
  //  Show BASIC and ADVANCE. Advanced is hidden and includes other stuff.
  //  Admin override cannot be changed by the user.
  //  Think about stuff we don't want the user to change.
  // When UPDATE is hit, send the form back to Daniel
  res.send("EditGiveOffers -- handlebars page")
  //TODO: Figure out how to have the firebase or angularJS in a template?
  //ANS: Just stick it in the bottom of the template page.
});

app.get('/user/NewNeedRequest', function(req, res, next) {
  // get the list of any outstandingNeedRequest for this userEmail, from daniel
  // Display it just to remind them they have 1. (Give them an edit button)
  // Check if there is a limit on the outstanding NeedRequests (default1). 
       // Override this with an override code that is stored in firebase.
  // 
  //  Show BASIC and ADVANCE. Advanced is hidden and includes other stuff.
  //  Admin override cannot be changed by the user.
  //  Think about stuff we don't want the user to change.
  // When NEW is hit, send the form back to Daniel
  res.send("NewNeedRequest -- handlebars page")
  //ANS: Just stick firebase+bootstrap+angularJS  in the bottom of the template page.
});

app.get('/user/EditNeedRequest/:needId', function(req, res, next) {
  // get the list of any this Need Request, from daniel
  // If it already has assigned Givers, then don't let them change this. (Suggest they create a new need)
  // Allow them to delete the need. (DELETE button)
  // 
  //  Show BASIC and ADVANCE. Advanced is hidden and includes other stuff.
  //  Admin override cannot be changed by the user.
  //  Think about stuff we don't want the user to change.
  // When NEW is hit, send the form back to Daniel
  res.send("NewNeedRequest -- handlebars page")
  //ANS: Just stick firebase+bootstrap+angularJS  in the bottom of the template page.
});

app.get('/user/UpdateUserDetailsIncludingOptional', function(req, res, next) {
  //Let them update the user fields except for the Give Offers.
  // For the admin fields, only show if account is flagged.

  res.send("UpdateUserDetailsIncludingOptional -- handlebars page")
  //ANS: Just stick firebase+bootstrap+angularJS  in the bottom of the template page.
});



/////////////// API

// new
app.post('/api/raw/User/new', function(req, res) {
  try {
    res.send("New User");
  } catch {
    console.log("Should never see this.")
  }
});

// update/edit user
app.post('/api/raw/User/update/:userid', function(req, res) {
  try {
    res.send("Very Secret Update user");
  } catch {
    console.log("Should never see this.")
  }
});


// new NeedRequest
app.post('/api/raw/NeedRequest/new', function(req, res) {
  try {
    res.send("New User");
  } catch {
    console.log("Should never see this.")
  }
});

// update/edit user
app.post('/api/raw/NeedRequest/update/:need_request_id', function(req, res) {
  try {
    res.send("Very Secret Update NeedRequest");
  } catch {
    console.log("Should never see this.")
  }
});


// // GettersLookingForMatch
// type = {count,records}
// limit, default to 100
// queryparams: Country, Zip, locality, hashtag, need, userid
// includeRadius (bool)
// if includeRadius, a lat-long needs to be given; if not, it will be the lat-lon of the zip which would then be required
app.get('/api/raw/GettersLookingForMatch', function(req, res) {
  try {
    //TODO: reminder, req.query gives the object/dictionary after the "?"
    // check if they are admin
    res.send("Very Secret GettersLookingForMatch");
  } catch {
    console.log("Should never see this.")
  }
});

//blurred means no personally identifiable information, essentially just counts.
app.get('/api/blurred/GettersLookingForMatch', function(req, res) {
  try {
    res.send("Not as Secret GettersLookingForMatch");
  } catch {
    console.log("Should never see this.")
  }
});


// // GiversAvailableForMatch
// type = {count,records}
// limit, default to 100
// queryparams: Country, Zip, locality, hashtag, need, userid
// includeRadius (bool)
// if includeRadius, a lat-long needs to be given; if not, it will be the lat-lon of the zip which would then be required
app.get('/api/raw/GiversAvailableForMatch', function(req, res) {
  try {
    // check if they are admin
    res.send("Very Secret GiversAvailableForMatch");
  } catch {
    console.log("Should never see this.")
  }
});


app.get('/api/blurred/GiversAvailableForMatch', function(req, res) {
  try {
    res.send("Not as secret Secret GiversAvailableForMatch");
  } catch {
    console.log("Should never see this.")
  }
});

// // Matches
// partialYN:  default: true  : include partially compete matches.
// limit, default to 100
// queryparams: Country, Zip, locality, hashtag, need, userid
// includeRadius (bool)
// if includeRadius, a lat-long needs to be given; if not, it will be the lat-lon of this user.
app.get('/api/raw/Matches', function(req, res) {
  try {
    res.send("Very Secret Matches");
  } catch {
    console.log("Should never see this.")
  }
});

app.get('/api/blurred/Matches', function(req, res) {
  try {
    res.send("Not as Secret Matches");
  } catch {
    console.log("Should never see this.")
  }
});

// create a "match"
// change the need requests "assigned" and slots.
// cahnge the assigned Giver's slots
app.post('/api/raw/Matches/create', function(req, res) {
  try {
    res.send("Very Secret New Match");
  } catch {
    console.log("Should never see this.")
  }
});




/////////////// ADMIN
// use handlebars or some templating to build these routes


app.get('/admin/all', function(req, res) {
  try {
    // two step:  verify that they have admin rights to their firebaseuser, and also ask them to submit a site password.
    // rotate site password weekly, and if they enter an old password, give them a hint/ phone number to call. If their entry is WRONG and notOld, then just reject.
    res.send("Not as Secret Matches");
  } catch {
    console.log("Should never see this.");
  }
});


app.get('/admin/looking_for_match/:country/z/:zip/h/:hashtag/need/:need', function(req, res) {
  try {
    // First, check that the req.params isn't all "ALL".
    // one step:  verify that they have admin rights to their firebaseuser.
    res.send("Not as Secret Matches");
  } catch {
    console.log("Should never see this.")
  }
});

app.get('/admin/list_count/:country/z/:zip/h/:hashtag/need/:need', function(req, res) {
  try {
    // First, check that the req.params isn't all "ALL".
    // one step:  verify that they have admin rights to their firebaseuser.
    res.send("Admin Counts");
  } catch {
    console.log("Should never see this.")
  }
});


app.get('/admin/matched/:country/z/:zip/h/:hashtag/need/:need', function(req, res) {
  try {
    // First, check that the req.params isn't all "ALL".
    // one step:  verify that they have admin rights to their firebaseuser.
   res.send("Not as Secret Matched");
  } catch {
    console.log("Should never see this.")
  }
});








let port = process.env.PORT || 3000;
app.listen(port, function () {
    return console.log("Started user authentication server listening on port " + port);
});
