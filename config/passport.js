
let passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;

let db = require("../models");

passport.use(new LocalStrategy({
        usernameField: "email"
    },
    (email, password, done) => {
        db.User.findOne({
            where: {
                email: email
            }
        }).then((dbUser) => {
            if (!dbUser) {
                return done(null, false, {
                    message: "Email is not valid!"
                });
            } else if (!dbUser.validPassword(password)) {
                return (done, false, {
                    message: "Incorrect Password!"
                });
            }
            return (done, dbUser);
        })
    }

));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});
//
passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

module.exports = passport;
