import axios from 'axios'
import {ADD_POST,GET_ERRORS,GET_POSTS,POST_LOADING, GET_POST,DELETE_POST} from './types'

//add post
export const addPost =postData=> async dispatch =>{
  try{
    const res = await axios.post('/api/posts',postData)
    dispatch({
      type:ADD_POST,
      payload:res.data
    })
  }
  catch(err){dispatch({type:GET_ERRORS,payload:err.response.data})}  
}

//get posts
export const getPosts =()=> async dispatch =>{
  try{
     dispatch(setPostLoading())
    const res = await axios.get('/api/posts')
    dispatch({
      type:GET_POSTS,
      payload:res.data
    })
  }
  catch(err){dispatch({type:GET_POST,payload:null})}  
}

//get post
export const getPost =id=> async dispatch =>{
  try{
     dispatch(setPostLoading())
    const res = await axios.get(`/api/posts/${id}`)
    dispatch({
      type:GET_POST,
      payload:res.data
    })
  }
  catch(err){dispatch({type:GET_POST,payload:null})}  
}



//delete post
export const deletePost =id=> async dispatch =>{
  try{
    await axios.delete(`/api/posts/${id}`)
    dispatch({
      type:DELETE_POST,
      payload:id
    })
  }
  catch(err){dispatch({type:GET_ERRORS,payload:err.response.data})}  
}

//add like
export const addLike =id=> async dispatch =>{
  try{
    await axios.post(`/api/posts/like/${id}`)
    dispatch(getPosts())
  }
  catch(err){dispatch({type:GET_ERRORS,payload:err.response.data})}  
}

//remove like
export const removeLike =id=> async dispatch =>{
  try{
    await axios.post(`/api/posts/unlike/${id}`)
    dispatch(getPosts())
  }
  catch(err){dispatch({type:GET_ERRORS,payload:err.response.data})}  
}

//addComment
export const addComment =(postId,newComment)=> async dispatch =>{
  try{
    const res = await axios.post(`/api/posts/comment/${postId}`,newComment)
    dispatch({
      type:GET_POST,
      payload:res.data
    })
  }
  catch(err){dispatch({type:GET_ERRORS,payload:err.response.data})}  
}

//deleteComment
export const deleteComment =(postId,commentId)=> async dispatch =>{
  try{
    const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`)
    dispatch({
      type:GET_POST,
      payload:res.data
    })
  }
  catch(err){dispatch({type:GET_ERRORS,payload:err.response.data})}  
}


//set post loading state
export const setPostLoading =()=>({
  type:POST_LOADING
})
