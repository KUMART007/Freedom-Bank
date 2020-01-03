const passport = require('passport')
const db = require("../models");

module.exports = app => {
    //POST: login 
    app.post('/api/login', passport.authenticate('local-login',{
      successReturnToOrRedirect: '/dashboard',
      failureRedirect: '/',
      failureFlash:true
    }))
    //POST: account creation
    app.post('/api/signup',passport.authenticate('local-signup',{
      successReturnToOrRedirect: '/dashboard',
      failureRedirect: '/',
      failureFlash: true 
    }))
    //creates a account
    app.post('/api/createAccount',function(req,res){
      let create =  createUniqueAccountNumber(req.body,req.user)
      setTimeout(function(){
         if(create === true){
           res.redirect('/dashboard')
         }
      }, 200);
    })
    //sends money to another account
    app.post('/api/sendmoney',function(req,res){
      console.log(req.body)
      db.transactions.create({
        account_id: req.params.id,
        transaction_type: req.body.transaction_type,
        comment: req.body.comment,
        amount: req.body.amount,
        updated_balance: req.body.updated_balance
      }).then((result) => {
        res.json(result);
        db.Account.update({
          current_balance: result.updated_balance
        }, {
            where: {
            user_id: req.params.id
          }
        })
      })
    })
    //logs you out
    app.get(`/logout`, (req, res) => {
      req.logout();
      res.redirect(`/`);
    });



    // app.post('/createAccount')



  // app.get("/api/user_data/:email", (req, res) => {
  //   db.User.findAll({
  //     where: {
  //       email: req.params.email
  //     }
  //   }).then(result => {
  //     res.json(result);
  //   });
  // });

  // app.post(`/api/login`, passport.authenticate(`local`, {
  //   successRedirect:'/member',
  //   failureRedirect:'/',
  //   failureFlash: true
  // }), (req, res) => {
  //   console.log(req.user)
  //   res.json(req.user)   
  // });

  // app.post(`/api/signup`, (req, res) => {
  //   console.log(req.body);

  //   db.User.create({
  //     username: req.body.username,
  //     email: req.body.email,
  //     password: req.body.password
  //   })
  //     .then(user => {
  //       req.login(user, function(err) {
  //         if (err) res.status(400).json(err);
  //         res.json({ location: "/members" });
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       res.json(err);
  //     });
  // });

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
    //creates a unique number and checks to see if that account number is unique
    function createUniqueAccountNumber(body,id){
      let testNum = ''

      for(let i = 0; i < 8; i++){
        let randomNum = Math.floor(Math.random() * 9)
        testNum = testNum + randomNum.toString()
      }
      testNum = parseInt(testNum)
      body.account_number = testNum
      body.userId = id
      db.Account.findOne({
        where: {
          account_number: testNum
        }
      }).then(data =>{
        if(!data){
          try{
            db.Account.create(body).then(function(db){
              console.log('account created')
            })
          } catch {
            console.log('account creatation failed')
          }
        } else if(data){
          createUniqueAccountNumber(body,id)
        }
      })
      return true
    }
};
