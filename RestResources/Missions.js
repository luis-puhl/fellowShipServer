// missionsResource.js

function MissionsResource (server, db){
  var missionsCollection = db.collection('missions');
  console.log('including MissionsResource');

  server.get("/missions", function (req, res, next) {
      missionsCollection.find(function (err, missions) {
          res.writeHead(200, {
              'Content-Type': 'application/json; charset=utf-8'
          });
          res.end(JSON.stringify(missions));
      });
      return next();
  });


  server.get('/mission/:id', function (req, res, next) {
      missionsCollection.findOne({
          _id: db.ObjectId(req.params.id)
      }, function (err, data) {
          res.writeHead(200, {
              'Content-Type': 'application/json; charset=utf-8'
          });
          res.end(JSON.stringify(data));
      });
      return next();
  });

  server.post('/mission', function (req, res, next) {
      var mission = req.params;
      console.log (JSON.stringify(mission));
      missionsCollection.save(mission,
          function (err, data) {
              res.writeHead(200, {
                  'Content-Type': 'application/json; charset=utf-8'
              });
              res.end(JSON.stringify(data));
          });
      return next();
  });

  server.put('/mission/:id', function (req, res, next) {
      // get the existing mission
      missionsCollection.findOne({
          _id: db.ObjectId(req.params.id)
      }, function (err, data) {
          // merge req.params/mission with the server/mission
          if (err){
            console.log("got database error " + err);
          }
          console.log("updating data " + data);

          var updProd = {}; // updated missions
          // logic similar to jQuery.extend(); to merge 2 objects.
          for (var n in data) {
              updProd[n] = data[n];
          }
          for (var n in req.params) {
              updProd[n] = req.params[n];
          }
          missionsCollection.update({
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

  server.del('/mission/:id', function (req, res, next) {
      missionsCollection.remove({
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

exports.MissionsResource = MissionsResource;
