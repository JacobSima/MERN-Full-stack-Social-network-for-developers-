import {GET_ERRORS,SET_CURRENT_USER} from './types'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToekn'
import jwt_decode from 'jwt-decode'

// Register User
export const registerUser = (userData,history)=> async dispatch =>{ 
  try{
    await axios.post('/api/users/register',userData)
    history.push('/login')
  }
  catch(err){
    dispatch({
      type:GET_ERRORS,
      payload:err.response.data
    })
  }
}

//login User
export const loginUser =(userData)=>async dispatch=>{
  try{
    const res = await axios.post('/api/users/login',userData)
    //get token from response
    const {token} = res.data
     //set token to local storage
     localStorage.setItem('jwtToken',token)
     // set token to Auth header
     setAuthToken(token);
     //Decode token to get user data
     const decoded = jwt_decode(token)
     // set the current user
     dispatch(setCurrentUser(decoded))
  }
  catch(err){
    dispatch({
      type:GET_ERRORS,
      payload:err.response.data
    })
  }
  }

  //set logged in user
  export const setCurrentUser =(decoded)=>{
    return {
      type:SET_CURRENT_USER,
      payload:decoded
    }
  }

  //log user out
  export const logoutUser =()=> dispatch =>{
    //remove token from localstorage
    localStorage.removeItem('jwtToken')
    // remove auth header for future request
    setAuthToken(false)
    //set the current user to {}  which will set isAuthenticated to false
    dispatch(setCurrentUser({}))
  }  

