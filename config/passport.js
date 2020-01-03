const db = require("../models");

module.exports = function(passport)  {
  const LocalStrategy = require("passport-local").Strategy;

  passport.use('local-login',new LocalStrategy(
    {
      username: "username"
    },
    (username, password, done) => {
      db.User.findOne({
        where: {
          username:username
        }
      }).then(dbUser => {
        if (!dbUser) {
          console.log('username failed')
          return done(null, false, { message: 'Incorrect username.' });
        } else if (dbUser.validPassword(password)) {
          console.log('pw failed')
          return done(null, false, { message: 'Incorrect password.' });
        }
        console.log('sucessful passport')
        return done(null, dbUser);
      });
    }
  )
)

  passport.use('local-signup',new LocalStrategy(
    
    {
      usernameField: 'username'
    },(username,password,done) => {
      db.User.findOne({
        where: {
          username: username
        }
        }).then(dbUser =>{
          console.log('checcking username')
          if(dbUser){
            done(null,false, {message: "Email already taken."})
          } else {
            let newUser = {
              username: username,
              password: password
            }
            db.User.create(newUser).then(function(newUser){
              console.log('user created')
              if(!newUser){
                return done(null,false)
              }
              if(newUser){
                return done(null,newUser)
              }
            })
          }
        })
      }
    ))

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  }) 

  passport.deserializeUser(function(user, done) { 
    done(null, user); 
  });
}