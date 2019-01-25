const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

//load models
const Profile = require('../../models/Profile')
const User = require('../../models/User')

const validateProfileInput =require('../../validation/profile')
const validateExperienceInput = require('../../validation/experience')
const validateEducationInput = require('../../validation/education')

//@route    GET api/profile
//@desc     get current users profile
//@access   Private
router.get('/',[passport.authenticate('jwt',{session:false})],async(req,res)=>{
  const {errors,isValid}= validateProfileInput(req.body)
  if(!isValid){return res.status(400).json(errors) }

  const profile = await Profile.findOne({user:req.user.id}).populate('user',['name','avatar'])
  if(!profile){errors.nonprofile='There is not profile for this user';return res.status(404).json(errors)}
  res.json(profile)

})

//@route    GET api/profile/all
//@desc     get all profile 
//@access   Public
router.get('/all',async(req,res)=>{
  let errors={}
    const profiles = await Profile.find().populate('user',['name','avatar']).sort({date:-1})
    if(!profiles){errors.nonprofile='There is no profiles';return res.status(404).json(errors)}
    res.json(profiles)
})

//@route    GET api/profile/handle/:handle
//@desc     get profile by handle
//@access   Public
router.get('/handle/:handle',async(req,res)=>{
  let errors={}
    const profile = await Profile.findOne({handle:req.params.handle}).populate('user',['name','avatar'])
    if(!profile){errors.nonprofile='There is no profile for this user';return res.status(404).json(errors)}
    res.json(profile)

})

//@route    GET api/profile/user/:user_id
//@desc     get profile by user ID
//@access   Public
router.get('/user/:user_id',async(req,res)=>{
  let errors={}
    const profile = await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar'])
    if(!profile){errors.nonprofile='There is not profile for this user';return res.status(404).json(errors)}
    res.json(profile)

})

//@route    POST api/profile
//@desc     create/edit user profile
//@access   Private
router.post('/',[passport.authenticate('jwt',{session:false})],async(req,res)=>{
  const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

  // Get fields
  const profileFields = {};
  profileFields.user = req.user.id;
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.githubusername)
    profileFields.githubusername = req.body.githubusername;
  // Skills - Spilt into array
  if (typeof req.body.skills !== 'undefined') {
    profileFields.skills = req.body.skills.split(',');
  }
   // Social
   profileFields.social = {};
   if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
   if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
   if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
   if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
   if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
  
  let profile = await Profile.findOne({user:req.user.id})
  if(profile){
    //update
    profile = await Profile.findOneAndUpdate({user:req.user.id},{$set:profileFields},{new:true}) 
    return res.json(profile)
  }
   //check if the handle exist
   let handle =await Profile.findOne({handle:profileFields.handle})
   if(handle) {errors.handle ='That handle already exists'; return res.status(400).json(erros)}
   //save profile
   let newProfile = new Profile(profileFields)
       newProfile = await newProfile.save() 
       res.json(newProfile)

})

//@route    POST api/profile/experience
//@desc    add experience to profile
//@access   Private
router.post('/experience',[passport.authenticate('jwt',{session:false})],async(req,res)=>{
  
  const {errors,isValid}=validateExperienceInput(req.body)
  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

      let profile = await Profile.findOne({user:req.user.id})
      const newExp ={
        title:req.body.title,
        company:req.body.company,
        location:req.body.location,
        from:req.body.from ,
        to:req.body.to,
        current:req.body.current,
        description:req.body.description
      }
      //add to the experience array
      profile.experience.unshift(newExp)
      profile = await profile.save()
      res.json(profile)
})

//@route    POST api/profile/education
//@desc    add education to profile
//@access   Private
router.post('/education',[passport.authenticate('jwt',{session:false})],async(req,res)=>{
  
  const {errors,isValid}=validateEducationInput(req.body)
  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }
 
      let profile = await Profile.findOne({user:req.user.id})
      const newEdu ={
        school:req.body.school,
        degree:req.body.degree,
        fieldofstudy:req.body.fieldofstudy,
        from:req.body.from ,
        to:req.body.to,
        current:req.body.current,
        description:req.body.description
      }
      //add to the education array
      profile.education.unshift(newEdu)
      profile = await profile.save()
      res.json(profile)
})

//@route    delete api/profile/experience/:exp_id
//@desc     delete experience from  profile
//@access   Private
router.delete('/experience/:exp_id',[passport.authenticate('jwt',{session:false})],async(req,res)=>{
  
      let profile = await Profile.findOne({user:req.user.id})
      //get remove index
      const removeIndex = profile.experience
                          .map(item=>item.id)
                          .indexOf(req.params.exp_id)
      //splice out the array
      profile.experience.splice(removeIndex,1)
      profile = await profile.save()
      res.json(profile)
})

//@route    delete api/profile/education/:exp_id
//@desc     delete education from  profile
//@access   Private
router.delete('/education/:edu_id',[passport.authenticate('jwt',{session:false})],async(req,res)=>{
  
  let profile = await Profile.findOne({user:req.user.id})
  //get remove index
  const removeIndex = profile.education
                      .map(item=>item.id) 
                      .indexOf(req.params.edu_id)
  //splice out the array
  profile.education.splice(removeIndex,1)
  profile = await profile.save()
  res.json(profile)
})

//@route    delete api/profile
//@desc     delete user and profile
//@access   Private
router.delete('/',[passport.authenticate('jwt',{session:false})],async(req,res)=>{
   await Profile.findOneAndRemove({user:req.user.id})
   await User.findOneAndRemove({_id:req.user.id})
   res.json({success:true})
})
module.exports = router