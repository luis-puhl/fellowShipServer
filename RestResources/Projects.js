// ProjectsResource.js

function ProjectsResource (server, db){
  var projectsCollection = db.collection('projects');
  console.log('including ProjectsResource')

  server.get("/projects", function (req, res, next) {
      projectsCollection.find(function (err, projects) {
          res.writeHead(200, {
              'Content-Type': 'application/json; charset=utf-8'
          });
          res.end(JSON.stringify(projects));
      });
      return next();
  });


  server.get('/project/:id', function (req, res, next) {
      projectsCollection.findOne({
          _id: db.ObjectId(req.params.id)
      }, function (err, data) {
          res.writeHead(200, {
              'Content-Type': 'application/json; charset=utf-8'
          });
          res.end(JSON.stringify(data));
      });
      return next();
  });

  server.post('/project', function (req, res, next) {
      var project = req.params;
      projectsCollection.save(project,
          function (err, data) {
              res.writeHead(200, {
                  'Content-Type': 'application/json; charset=utf-8'
              });
              res.end(JSON.stringify(data));
          });
      return next();
  });

  server.put('/project/:id', function (req, res, next) {
      // get the existing project
      projectsCollection.findOne({
          _id: db.ObjectId(req.params.id)
      }, function (err, data) {
          // merge req.params/project with the server/project

          var updProd = {}; // updated projects
          // logic similar to jQuery.extend(); to merge 2 objects.
          for (var n in data) {
              updProd[n] = data[n];
          }
          for (var n in req.params) {
              updProd[n] = req.params[n];
          }
          projectsCollection.update({
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

  server.del('/project/:id', function (req, res, next) {
      projectsCollection.remove({
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

exports.ProjectsResource = ProjectsResource;
