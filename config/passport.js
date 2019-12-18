let passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;

let db = require("../models");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email"
    },
    (email, password, done) => {
      db.User.findOne({
        where: {
          email: email
        }
      }).then(dbUser => {
        if (!dbUser) {
          console.log("no user");
          return done(null, false, {
            message: "Email is not valid!"
          });
        } else if (!dbUser.validPassword(password)) {
          console.log("wrong password");
          return (
            done,
            false,
            {
              message: "Incorrect Password!"
            }
          );
        }

        return done(false, dbUser);
      });
    }
  )
);

passport.serializeUser(function(user, cb) {
  cb(null, user);
});
//
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

module.exports = passport;
