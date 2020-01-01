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
var initBal = 1250.00;
module.exports = app => {
  app.get("/api/user/me", (req, res) => {
    db.User.findAll({
      where: {
        id: req.user.id
        // id:req.params.id
      },
      attributes:{exclude:["password"]}
    }).then((result) => {
      console.log(`Result for member is ${result}`);
      res.json(result);
    });
  });
    app.get("/api/account", (req, res) => {
      db.Account.findAll({
        where: {
          id: req.user.id
          // id:req.params.id
        },
      }).then((result) => {
        console.log(`Result for member is ${result}`);
        res.json(result);
      });
    });

  // app.get("/api/user_data/:username", (req, res) => {
  //   db.User.findOne({
  //     where: {
  //       username: req.params.username
  //     }
  //   }).then((result) => {
  //     console.log(`Username at API is : ${result}`);
  //     res.json(result);
  //   });
  // });

  app.get(`/api/usercheck/:email`, (req, res) => {
    db.User.findAll({
      where: {
        email: req.params.email
      }
    }).then((result) => {
      console.log(`Returning ${result}`);
      res.json(result);
    })
  })

  app.post(`/api/login`, passport.authenticate(`local`), (req, res) => {
    console.log('logging')
    res.json({
      location: "/members"
    });
  });

  app.post(`/api/signup`, (req, res) => {
    console.log(req.body);

    db.User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      })
      .then(user => {
        req.login(user, function (err) {
          if (err) res.status(400).json(err);
          res.json({
            location: "/members"
          });
          db.Account.create({
            userid: req.user.id,
            current_balance: initBal
          }).then((acc) => {
            
          })
        });
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      });
  });

  // app.get(`/logout`, (req, res) => {
  //   if (!req.user) {
  //     res.json({});
  //   } else {
  //     res.json({
  //       email: req.user.email
  //       // id: req.user.id
  //     });
  //   }
  // });
  app.get(`/logout`, (req, res) => {
    req.logout();
    res.redirect(`/`);
  });
};