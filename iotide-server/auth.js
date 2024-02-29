const dotenv = require("dotenv");
dotenv.config();

const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcrypt");

const User = require("./models/User");

const JWTsecret = process.env.JWT_SECRET;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findOne({
          username: jwt_payload.username,
          password: jwt_payload.password,
        });

        if (
          user &&
          (await bcrypt.compare(jwt_payload.password, user.password))
        ) {
          return done(null, user);
        }

        return done(null, false);
      } catch (err) {
        console.error("Error in JWT Strategy:", error);
        return done(error, false);
      }
    })
  );
};

module.exports = passport;
