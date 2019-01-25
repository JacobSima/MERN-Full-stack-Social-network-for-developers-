const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')
const Post = require('../../models/Post')
const Profile = require('../../models/Profile')

//
const validatePostInput = require('../../validation/post')

//@route    GET api/posts/test
//@desc     Test posts route
//@access   Public
router.get('/test',async(req,res)=>res.json({posts:'works'}))

//@route    Post api/posts
//@desc     Get post
//@access   Public
router.get('/',async(req,res)=>{
     const posts =await Post.find().sort({date:-1})
     res.json(posts)
})

//@route    Get api/posts/:id
//@desc     Get post by id
//@access   Public
router.get('/:id',async(req,res)=>{
    const post =await Post.findOne({_id:req.params.id})
    res.json(post)
})

//@route    Post api/posts
//@desc     Create post
//@access   Private
router.post('/',[passport.authenticate('jwt',{session:false})],async(req,res)=>{
  const {errors,isValid} = validatePostInput(req.body) 
    //check validation
    if(!isValid) return res.status(400).json(errors)

    let newPost = new Post({
        text:req.body.text,
        name:req.body.name,
        avatar:req.body.avatar,
        user:req.user.id
    })

    newPost = await newPost.save()
    res.json(newPost )
})

//@route    DELETE api/posts/:id
//@desc     delete post
//@access   Private
router.delete('/:id',[passport.authenticate('jwt',{session:false})],async(req,res)=>{
     const post = await Post.findOne({_id:req.params.id})
     //check for post owner
     if(post.user.toString()!== req.user.id ){
         return res.status(401).json({notautorized:'user not autorized'})
     }
     await post.remove()
     res.json({success:true})

})


//@route    Post api/posts/like/:id
//@desc     Like a post
//@access   Private
router.post('/like/:id',[passport.authenticate('jwt',{session:false})],async(req,res)=>{
    let post = await Post.findOne({_id:req.params.id})
    let likes = post.likes.filter(like=> like.user.toString()=== req.user.id)
    if(likes.length>0){
        return res.status(400).json({alreadyliked:'User already liked this post'})
    }
    // add user id to the likes array
    post.likes.unshift({user:req.user.id})
    post = await post.save()
    res.json(post) 


})
//@route    Post api/posts/unlike/:id
//@desc     Unlike a post
//@access   Private
router.post('/unlike/:id',[passport.authenticate('jwt',{session:false})],async(req,res)=>{
    let post = await Post.findOne({_id:req.params.id})
    let likes = post.likes.filter(like=> like.user.toString()=== req.user.id)
    if(likes.length === 0){
        return res.status(400).json({notLiked:'You have not yet like the post'})
    }
    // get the remove index
      const removedIndex = post.likes.map(item=>item.user.toString()).indexOf(req.user.id)
    // splice out of array
    post.likes.splice(removedIndex,1)
    post = await post.save()
    res.json(post)
})

//@route    Post api/post/comment/:id
//@desc     Add comment to post
//@access   Private
router.post('/comment/:id',[passport.authenticate('jwt',{session:false})],async(req,res)=>{
    const {errors,isValid} = validatePostInput(req.body) 
    //check validation
    if(!isValid) return res.status(400).json(errors)

   let post = await Post.findOne({_id:req.params.id})
   const newComment={
       text:req.body.text,
       name:req.body.name,
       avatar:req.body.avatar,
       user:req.user.id
   }
   //add to comment array
   post.comments.unshift(newComment)
   //save post
   post = await post.save()
   res.json(post)
})

//@route    Delete api/post/comment/:id/comment_id
//@desc     remove comment from post, you post id and comment id
//@access   Private
router.delete('/comment/:id/:comment_id',[passport.authenticate('jwt',{session:false})],async(req,res)=>{
   let post = await Post.findOne({_id:req.params.id})
   //check if the comment exists
   const isPostThere = post.comments.filter(comment=>comment._id.toString()=== req.params.comment_id)
   
   if(isPostThere.length ===0){return res.status(404).json({commentnotexixts:'comment does not exist'})}

   //get remove index
   const removeIndex = post.comments.map(comment=>comment._id.toString()).indexOf(req.params.comment_id)

   //splice it out the array
   post.comments.splice(removeIndex,1)
   post = await post.save()
   res.json(post)

})
module.exports = router