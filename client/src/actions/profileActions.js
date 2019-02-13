import axios from 'axios'
import {GET_PROFILE,PROFILE_LOADING,CLEAR_CURRENT_PROFILE, GET_ERRORS,SET_CURRENT_USER,GET_PROFILES } from './types'


//get current profile
export const getCurrentProfile =()=> async dispatch =>{
  try{
    dispatch(setProfileLoading())
  const res =  await axios.get('/api/profile')
  dispatch({
    type:GET_PROFILE,
    payload:res.data
  })

  }
  catch(err){
    dispatch({
      type:GET_PROFILE,
      payload:{}
    })
  }
   
}


//get profile by handle
export const getprofileByHandle =(handle)=> async dispatch =>{
  try{
    dispatch(setProfileLoading())
  const res =  await axios.get(`/api/profile/handle/${handle}`)
  dispatch({
    type:GET_PROFILE,
    payload:res.data
  })

  }
  catch(err){
    dispatch({
      type:GET_PROFILE,
      payload:null
    })
  }
   
}


//Create Profile
export const createProfile =(profileData,history)=>async dispatch=>{
  try{
    await axios.post('/api/profile',profileData)
    history.push('/dashboard')
  }
  catch(err){
    dispatch({
      type:GET_ERRORS,
      payload:err.response.data
    })
  }
    
}

//Add experience
export const addExperience =(expData,history)=> async dispatch =>{
  try{
    await axios.post('/api/profile/experience',expData)
    history.push('/dashboard')
  }
  catch(err){ dispatch({type:GET_ERRORS,payload:err.response.data})}
    
}
//add addEducation
export const addEducation =(EduData,history)=> async dispatch=>{
    try{
          await axios.post('/api/profile/education',EduData)
          history.push('/dashboard')
    }
    catch(err){dispatch({type:GET_ERRORS,payload:err.response.data})}
}

//delete experience
export const deleteExperience = (id) => async dispatch =>{
  try{
   const res =  await axios.delete(`/api/profile/experience/${id}`)
    dispatch({
      type:GET_PROFILE,
      payload:res.data
    })
}catch(err){dispatch({type:GET_ERRORS,payload:err.response.data})}
  }

//deleteEducation
export const deleteEducation =id=> async dispatch =>{
  try{
   const res =  await axios.delete(`/api/profile/education/${id}`)
    dispatch({
      type:GET_PROFILE,
      payload:res.data
    })
}catch(err){dispatch({type:GET_ERRORS,payload:err.response.data})}
  }
    

//gets all profiles
  export const getprofiles=()=> async dispatch =>{
    try{
      dispatch(setProfileLoading())
      const res = await axios.get('/api/profile/all')
      dispatch({
        type:GET_PROFILES,
        payload:res.data
      })
    }
    catch(err){dispatch({type:GET_PROFILES,payload:null})}
    
  }


//Delete Account and Profile
export const deleteAccount =()=> async dispatch =>{
  try{
    if(window.confirm('Are you sure?')){
      await axios.delete('/api/profile')
      dispatch({
        type:SET_CURRENT_USER,
        payload:{} 
      })
   }
  }
  catch(err){
    dispatch({
      type:GET_ERRORS,
      payload:err.response.data
    })
  }
  
}



//profile loading
export const setProfileLoading =()=>({
  type:PROFILE_LOADING
})
//clear profile
export const clearCurrentProfile =()=>({
  type:CLEAR_CURRENT_PROFILE
})
