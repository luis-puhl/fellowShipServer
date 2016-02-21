// SkillsResource.js

function SkillsResource (server, db){
  var skillsCollection = db.collection('skills');
  console.log('including SkillsResource');

  server.get("/skills", function (req, res, next) {
      skillsCollection.find(function (err, skills) {
          res.writeHead(200, {
              'Content-Type': 'application/json; charset=utf-8'
          });
          res.end(JSON.stringify(skills));
      });
      return next();
  });


  server.get('/skill/:id', function (req, res, next) {
      skillsCollection.findOne({
          _id: db.ObjectId(req.params.id)
      }, function (err, data) {
          res.writeHead(200, {
              'Content-Type': 'application/json; charset=utf-8'
          });
          res.end(JSON.stringify(data));
      });
      return next();
  });

  server.post('/skill', function (req, res, next) {
      var skill = req.params;
      console.log (JSON.stringify(skill));
      skillsCollection.save(skill,
          function (err, data) {
              res.writeHead(200, {
                  'Content-Type': 'application/json; charset=utf-8'
              });
              res.end(JSON.stringify(data));
          });
      return next();
  });

  server.put('/skill/:id', function (req, res, next) {
      // get the existing skill
      skillsCollection.findOne({
          _id: db.ObjectId(req.params.id)
      }, function (err, data) {
          // merge req.params/skill with the server/skill
          if (err){
            console.log("got database error " + err);
          }
          console.log("updating data " + data);

          var updProd = {}; // updated skills
          // logic similar to jQuery.extend(); to merge 2 objects.
          for (var n in data) {
              updProd[n] = data[n];
          }
          for (var n in req.params) {
              updProd[n] = req.params[n];
          }
          skillsCollection.update({
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

  server.del('/skill/:id', function (req, res, next) {
      skillsCollection.remove({
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

exports.SkillsResource = SkillsResource;
