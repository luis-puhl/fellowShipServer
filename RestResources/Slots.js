// SlotsResource.js

function SlotsResource (server, db){
  var slotsCollection = db.collection('slots');
  console.log('including SlotsResource');

  server.get("/slots", function (req, res, next) {
      slotsCollection.find(function (err, slots) {
          res.writeHead(200, {
              'Content-Type': 'application/json; charset=utf-8'
          });
          res.end(JSON.stringify(slots));
      });
      return next();
  });


  server.get('/slot/:id', function (req, res, next) {
      slotsCollection.findOne({
          _id: db.ObjectId(req.params.id)
      }, function (err, data) {
          res.writeHead(200, {
              'Content-Type': 'application/json; charset=utf-8'
          });
          res.end(JSON.stringify(data));
      });
      return next();
  });

  server.post('/slot', function (req, res, next) {
      var slot = req.params;
      console.log (JSON.stringify(slot));
      slotsCollection.save(slot,
          function (err, data) {
              res.writeHead(200, {
                  'Content-Type': 'application/json; charset=utf-8'
              });
              res.end(JSON.stringify(data));
          });
      return next();
  });

  server.put('/slot/:id', function (req, res, next) {
      // get the existing slot
      slotsCollection.findOne({
          _id: db.ObjectId(req.params.id)
      }, function (err, data) {
          // merge req.params/slot with the server/slot
          if (err){
            console.log("got database error " + err);
          }
          console.log("updating data " + data);

          var updProd = {}; // updated slots
          // logic similar to jQuery.extend(); to merge 2 objects.
          for (var n in data) {
              updProd[n] = data[n];
          }
          for (var n in req.params) {
              updProd[n] = req.params[n];
          }
          slotsCollection.update({
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

  server.del('/slot/:id', function (req, res, next) {
      slotsCollection.remove({
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

exports.SlotsResource = SlotsResource;
