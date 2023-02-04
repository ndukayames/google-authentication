const User = require("../models/user.model");
const generateJWT = require("../services/jwt.service");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_OAUTH2_CLIENT_ID,
        clientSecret: process.env.GOOGLE_OAUTH2_SECRET,
        callbackURL: "http://127.0.0.1:8000/auth/google/callback",
        passReqToCallback: true,
      },
      async (request, accessToken, refreshToken, profile, done) => {
        try {
          let existingUser = await User.findOne({ email: profile.id });
          if (existingUser) {
            return done(null, existingUser);
          }
          // if user does not exist create a new user
          console.log("Creating new user...");
          let user = {
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
          };

          let newUser = new User(user);
          newUser.account_type = "google";
          await newUser.save();
          let tokenBody = {
            id: newUser.id,
            email: newUser.email,
          };
          let token = generateJWT({ tokenBody });
          done(null, token);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
  passport.serializeUser((suser, done) => {
    if (suser) return done(null, suser);
    else return done(null, false);
  });
  passport.deserializeUser((duser, done) => {
    if (duser) return done(null, duser);
    else return done(null, false);
  });
};
