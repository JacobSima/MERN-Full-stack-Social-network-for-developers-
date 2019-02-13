import React, { Component } from 'react'
import './App.css'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import {Provider} from 'react-redux'
import store  from './store'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToekn'
import {setCurrentUser, logoutUser } from './actions/authActions'
import Dashboard from './components/dashboard/Dashboard'
import {clearCurrentProfile} from './actions/profileActions'
import PrivateRoute from './components/common/PrivateRoute'
import CreateProfile from './components/create-profile/CreateProfile'
import EditProfile from './components/edit-profile/EditProfile'
import AddExperience from './components/add-credentials/Add-experience'
import AddEducation from './components/add-credentials/Add-education'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
import NoFound from './components/no-found/NoFound'
import Post from './components/posts/Post'
import Posting from './components/post/Posting'


//check for token 
if(localStorage.jwtToken){
    //set auth token header auth
     setAuthToken(localStorage.jwtToken)
     //decode the token and get user info and exp
      const decoded = jwt_decode(localStorage.jwtToken)
     //set user and is
     store.dispatch(setCurrentUser(decoded))

     //check for expired token
     const currentTime = Date.now()/1000
     if(decoded.exp<currentTime){
       //logout user
       store.dispatch(logoutUser())
       //clear current profile
       store.dispatch(clearCurrentProfile())
       // Redirect to login
       window.location.href ='/login'
     }
}


class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar/>
          {/* <div className="container"> */}
          <Switch>
             <Route exact path="/" component={Landing}/>
             <Route exact path="/register" component={Register}/>
             <Route exact path="/login" component={Login}/> 
             <Route exact path="/profiles" component={Profiles}/> 
              <Route exact path="/profile/:handle" component={Profile}/>
               <PrivateRoute exact path ="/dashboard" component={Dashboard}/>
               <PrivateRoute exact path ="/create-profile" component={CreateProfile}/>
               <PrivateRoute exact path ="/edit-profile" component={EditProfile}/>
               <PrivateRoute exact path ="/add-experience" component={AddExperience}/>
               <PrivateRoute exact path ="/add-education" component={AddEducation}/>
               <PrivateRoute exact path ="/feed" component={Post}/>
               <PrivateRoute exact path ="/post/:id" component={Posting}/>
               <Route component={NoFound}/>
             </Switch>
          {/* </div> */}
          <Footer/>
        </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
