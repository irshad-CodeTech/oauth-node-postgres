const config = require("config");

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: config.get("google.clientId"),
      clientSecret: config.get("google.clientSecret"),
      callbackURL: config.get("google.callbackUrl"), // should be in sync specified while creating client id on google dev portal
      passReqToCallback: true
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
