const User = require('../models/User')
const JwtStrategy = require('passport-jwt').Strategy
const   ExtractJwt = require('passport-jwt').ExtractJwt
const {secretOrKey} = require('./keys')
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretOrKey

module.exports =passport=>{
  passport.use(new JwtStrategy(opts,async(jwt_payload, done)=>{
    const user = await User.findOne({_id:jwt_payload.id})
    if(!user) return done(null,false)
    return done(null,user)
}));

}



