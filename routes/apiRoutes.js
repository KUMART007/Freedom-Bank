// var db = require("../models");

// module.exports = function(app) {
//   // Get all examples
//   app.get("/api/examples", function(req, res) {
//     db.Example.findAll({}).then(function(dbExamples) {
//       res.json(dbExamples);
//     });
//   });

//   // Create a new example
//   app.post("/api/examples", function(req, res) {
//     db.Example.create(req.body).then(function(dbExample) {
//       res.json(dbExample);
//     });
//   });

//   // Delete an example by id
//   app.delete("/api/examples/:id", function(req, res) {
//     db.Example.destroy({ where: { id: req.params.id } }).then(function(
//       dbExample
//     ) {
//       res.json(dbExample);
//     });
//   });
// };

var db = require("../models");
var passport = require("../config/passport");

module.exports = (app) => {

  app.get("/api/user_data/:email", (req, res)=> {
    db.User.findAll({
      where: {
        email: req.params.email
      }
    }).then((result) => {
      res.json(result);
    })
  });


  app.post(`/api/login`, passport.authenticate(`local`), (req, res) => {
    res.json(`/accounts`)
  });

  app.post(`/api/signup`, (req, res) => {
    console.log(req.body);

    db.User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }).then(() => {
      res.redirect(307, `/api/login`);
    }).catch((err) => {
      console.log(err);
      res.json(err);
    })
  })

  app.get(`/logout`, (req, res) => {
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        email: req.user.email,
        // id: req.user.id
      });
    }
  })

}