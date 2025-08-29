const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../../models/User');

// Called from index.js to register the strategy
exports.configureGoogleStrategy = () => {
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (e) {
      done(e);
    }
  });

  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const googleId = profile.id;
      const email = (profile.emails && profile.emails[0] && profile.emails[0].value || '').toLowerCase();
      let user = await User.findOne({ $or: [{ googleId }, { email }] });
      if (!user) {
        user = await User.create({
          email,
          googleId,
          isGoogleAccount: true,
          isVerified: true,
          role: 'customer', // default role for google signup; adjust as needed
        });
      } else if (!user.googleId) {
        user.googleId = googleId;
        user.isVerified = true;
        await user.save();
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));
};
