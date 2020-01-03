const db = require("../models")
const passport = require('passport')


  module.exports = app => {
    //home page
    app.get("/", function(req, res) {
      // if(req.Authenticate()){
      //   res.redirect('/dashboard')
      // } else {
        res.render('login')
      // }

    });
    //account dashbord when logged in
    app.get('/dashboard', function(req,res){
      if(req.user){
        db.Account.findOne({
          where: {
            userId: req.user
          }
        }).then(function(data){
          console.log(data)
          res.render('dashboard', {user: data})
        })
      } else {
        res.redirect('/')
      }
    })

    //redirects when going to unknown route
    app.get("*", function(req, res) {
      res.redirect("/");
    }); 
  }

function isLoggedIn(req, res, next) {
 
  if (req.isAuthenticated())
   
      return next();
       
  res.redirect('/404');

}