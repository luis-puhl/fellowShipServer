// ProfilesResource.js

function ProfilesResource (server, db){
  var profilesCollection = db.collection('profiles');
  console.log('including ProfilesResource');

  server.get("/profiles", function (req, res, next) {
      profilesCollection.find(function (err, profiles) {
          res.writeHead(200, {
              'Content-Type': 'application/json; charset=utf-8'
          });
          res.end(JSON.stringify(profiles));
      });
      return next();
  });


  server.get('/profile/:id', function (req, res, next) {
      profilesCollection.findOne({
          _id: db.ObjectId(req.params.id)
      }, function (err, data) {
          res.writeHead(200, {
              'Content-Type': 'application/json; charset=utf-8'
          });
          res.end(JSON.stringify(data));
      });
      return next();
  });

  server.post('/profile', function (req, res, next) {
      var profile = req.params;
      console.log (JSON.stringify(profile));
      profilesCollection.save(profile,
          function (err, data) {
              res.writeHead(200, {
                  'Content-Type': 'application/json; charset=utf-8'
              });
              res.end(JSON.stringify(data));
          });
      return next();
  });

  server.put('/profile/:id', function (req, res, next) {
      // get the existing profile
      profilesCollection.findOne({
          _id: db.ObjectId(req.params.id)
      }, function (err, data) {
          // merge req.params/profile with the server/profile
          if (err){
            console.log("got database error " + err);
          }
          console.log("updating data " + data);

          var updProd = {}; // updated profiles
          // logic similar to jQuery.extend(); to merge 2 objects.
          for (var n in data) {
              updProd[n] = data[n];
          }
          for (var n in req.params) {
              updProd[n] = req.params[n];
          }
          profilesCollection.update({
              _id: db.ObjectId(req.params.id)
          }, updProd, {
              multi: false
          }, function (err, data) {
              res.writeHead(200, {
                  'Content-Type': 'application/json; charset=utf-8'
              });
              res.end(JSON.stringify(data));
          });
      });
      return next();
  });

  server.del('/profile/:id', function (req, res, next) {
      profilesCollection.remove({
          _id: db.ObjectId(req.params.id)
      }, function (err, data) {
          res.writeHead(200, {
              'Content-Type': 'application/json; charset=utf-8'
          });
          res.end(JSON.stringify(true));
      });
      return next();
  });


}

exports.ProfilesResource = ProfilesResource;
