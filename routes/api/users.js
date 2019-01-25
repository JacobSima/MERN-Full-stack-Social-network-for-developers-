const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const gravatar = require('gravatar')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const passport = require('passport')

//load keys
const {secretOrKey} = require('../../config/keys')
//load inputs validation
const validateRegisterInput = require('../../validation/register')
const validateLoginInput  = require('../../validation/login')


//@route   GET api/users/register
//@desc    Register user
//@access   Public
router.post('/register',async(req,res)=>{
    const {errors,isValid} = validateRegisterInput(req.body) 
    //check validation
    if(!isValid) return res.status(400).json(errors)

     let user = await User.findOne({email:req.body.email})
     if(user){errors.email ='Email already exists';return res.status(400).json(errors)}
     //get a gravatar image from gravatar node module
     const avatar = gravatar.url(req.body.email, {
       s: '200', // size
        r: 'pg', // rating
        d: 'mm' // default
      });
      //hash the password
      const password = await bcrypt.hash(req.body.password,10)

     //create new user
     const newUser = new User({
        name:req.body.name,
        email:req.body.email,
        avatar,
        password,
     })
     // save new user
     user = await newUser.save()
     res.json(user)
})

//@route   GET api/users/login
//@desc    Login user / returning a JWT 
//@access   Public
router.post('/login',async(req,res)=>{
   
    //check for input validation
    const {errors,isValid} =validateLoginInput(req.body)
    //check validation
    if(!isValid) return res.status(400).json(errors)

    const email = req.body.email
    const password = req.body.password

    //find the user by email
    const user = await User.findOne({email})
    if(!user){errors.email="User not found";return res.status(404).json(errors)}

    //check password
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){errors.password="Password incorect"; return res.status(400).json(errors)}
    //create a JWT a send to the UI
    const payload ={id:user.id,name:user.name,avatar:user.avatar}  // create jwt payload
    //sign the token
    const token = await jwt.sign(payload,secretOrKey,{expiresIn:3600})
    res.json({success:true,token:'Bearer ' + token})

}) 

//@route   GET api/users/current
//@desc    return current user
//@access   private
router.get('/current',[passport.authenticate('jwt', {session: false })],async(req,res)=>{    
  res.json({
    id:req.user.id,
    name:req.user.name,
    email:req.user.email
  })
})

module.exports = router