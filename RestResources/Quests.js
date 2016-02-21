// QuestsResource.js

function QuestsResource (server, db){
  var questsCollection = db.collection('quests');
  console.log('including QuestsResource');

  server.get("/quests", function (req, res, next) {
      questsCollection.find(function (err, quests) {
          res.writeHead(200, {
              'Content-Type': 'application/json; charset=utf-8'
          });
          res.end(JSON.stringify(quests));
      });
      return next();
  });


  server.get('/quest/:id', function (req, res, next) {
      questsCollection.findOne({
          _id: db.ObjectId(req.params.id)
      }, function (err, data) {
          res.writeHead(200, {
              'Content-Type': 'application/json; charset=utf-8'
          });
          res.end(JSON.stringify(data));
      });
      return next();
  });

  server.post('/quest', function (req, res, next) {
      var quest = req.params;
      console.log (JSON.stringify(quest));
      questsCollection.save(quest,
          function (err, data) {
              res.writeHead(200, {
                  'Content-Type': 'application/json; charset=utf-8'
              });
              res.end(JSON.stringify(data));
          });
      return next();
  });

  server.put('/quest/:id', function (req, res, next) {
      // get the existing quest
      questsCollection.findOne({
          _id: db.ObjectId(req.params.id)
      }, function (err, data) {
          // merge req.params/quest with the server/quest
          if (err){
            console.log("got database error " + err);
          }
          console.log("updating data " + data);

          var updProd = {}; // updated quests
          // logic similar to jQuery.extend(); to merge 2 objects.
          for (var n in data) {
              updProd[n] = data[n];
          }
          for (var n in req.params) {
              updProd[n] = req.params[n];
          }
          questsCollection.update({
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

  server.del('/quest/:id', function (req, res, next) {
      questsCollection.remove({
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

exports.QuestsResource = QuestsResource;
