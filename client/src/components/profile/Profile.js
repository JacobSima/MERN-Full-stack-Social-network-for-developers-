import React, { Component } from 'react'
import ProfileAbout from './ProfileAbout'
import ProfileCreds from './ProfileCreds'
import ProfileGitHub from './ProfileGitHub'
import ProfileHeader from './ProfileHeader'
import Spinner from '../common/Spinner'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getprofileByHandle} from '../../actions/profileActions'


 class Profile extends Component {

  componentDidMount(){
    const {handle}= this.props.match.params
    if(handle){
      this.props.getprofileByHandle(handle)
    }
  }
  componentWillReceiveProps(nextProps){
     if(nextProps.profile.profile === null && this.props.profile.loading){
       this.props.history.push('/not-found')
     }
  }

  render() {
    const {profile,loading}=this.props.profile
    let profileContent;
    if(profile=== null || loading){
      profileContent = <Spinner/>
    }else{
      profileContent =(
        //display your profile
        <div>
          <div className="row">
           <div className="col-md-6">
            <Link to ="/profiles" className="btn btn-light mb-3 float-left">
            Back To profiles
            </Link>
           </div>
           <div className="col-md-6">
            
           </div>
          </div>
          <ProfileHeader profile={profile}/>
          <ProfileAbout profile={profile}/>
          <ProfileCreds education={profile.education}  experience={profile.experience}/>
          {profile.githubusername?(<ProfileGitHub username={profile.githubusername}/>):null}
          
        </div>
      )
    }
    return (
      <div className="profile">
           <div className="container">
            <div className="row">
             <div className="col-md-12">
              {profileContent}
             </div>
            </div>
           </div>
      </div>
    )
  }
}

const mapStateToProps=state=>({
  profile:state.profile
})

export default connect(mapStateToProps,{getprofileByHandle}) (Profile)
