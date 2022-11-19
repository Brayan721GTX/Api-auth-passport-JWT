var passport = require('passport');
var LocalStrategy = require('passport-local');
const {User} = require('./models');
const md5 = require('md5');
require('dotenv').config()

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_JWT_KEY
}

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log(jwt_payload.data);
    return done(null, jwt_payload.data);
}));

passport.use(new LocalStrategy(async function verify(username, password, cb) {
    const user = await User.findOne({where:{username:username}});
    if(user === null) {return cb(null, false, {msg:"Incorrect username or password."})}
    if(md5(password) != user.password) {return cb(null, false, {msg:"Incorrect username or password."})}
    return cb(null, user.dataValues.id)
  }));