var path = require("path");
var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");
// module.exports = function (app) {
//   // Load index page
//   // app.get("/", function (req, res) {
//   //   console.log(`requested page is ${req.url}`);
//   //   res.render("layouts/main");
//   // });

//   // Render 404 page for any unmatched routes
//   app.get("*", function (req, res) {
//     res.render("404");
//   });
//   app.get("/members", isAuthenticated, function (req, res) {
//     res.sendFile(path.join(__dirname, "../public/members.html"));
//   });
//   app.get(`/career`, function (req, res) {
//     console.log(`requested page is ${req.url}`);
//     res.sendFile(path.join(__dirname, "/public/career.html"));
//   })
// };

// app.get("/example/:id", function(req, res) {
//   db.Example.findOne({ where: { id: req.params.id } }).then(function(
//     dbExample
//   ) {
//     res.render("example", {
//       example: dbExample
//     });
//   });
// });

// Requiring path to so we can use relative routes to our HTML files
// var path = require("path");
// //
// // Requiring our custom middleware for checking if a user is logged in
// var isAuthenticated = require("../config/middleware/isAuthenticated");
// //
module.exports = function (app) {
  //
  app.get("/", function (req, res) {
    // If the user already has an account send them to the members page
    // if (req.user) {
    //   res.redirect("/members");
    // }
    res.render("layouts/main");
  });
  //
  app.get("/login", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/members", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });
  app.get(`/career`, function (req, res) {
    console.log(`requested page is ${ req.url }`);
    res.sendFile(path.join(__dirname, "../public/career.html"));
    // res.render("career");
  });
};