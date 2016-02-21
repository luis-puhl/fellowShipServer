var restify = require('restify');
var mongojs = require('mongojs');

// database config
var mongoConnectionString = 'mongodb://localhost:27017/fellowship';
var mongoCollections = [];
var db = mongojs(mongoConnectionString, mongoCollections);

// database test and error handling
db.on('error', function (err) {
    console.log('database error', err)
})
db.on('connect', function () {
    console.log('database connected')
})

// instantiate server
var server = restify.createServer();

server.on('InternalServer', function (req, res, err, cb) {
  console.log('restify error', err);
  err.body = 'something is wrong!';
  return cb();
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

// include the resources
var projects = require('./RestResources/Projects')
projects.ProjectsResource(server, db)

var missions = require('./RestResources/Missions')
missions.MissionsResource(server, db)

var quests = require('./RestResources/Quests')
quests.QuestsResource(server, db)

var users = require('./RestResources/Users')
users.UsersResource(server, db)

var profiles = require('./RestResources/Profiles')
profiles.ProfilesResource(server, db)

var slots = require('./RestResources/Slots')
slots.SlotsResource(server, db)

var skills = require('./RestResources/Skills')
skills.SkillsResource(server, db)

// inicitate
server.listen(3000, function () {
    console.log("Server started @ 3000");
});

module.exports = server;
