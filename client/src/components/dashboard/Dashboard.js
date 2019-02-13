import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getCurrentProfile,deleteAccount} from '../../actions/profileActions'
import Spinner from '../common/Spinner'
import {Link} from 'react-router-dom'
import ProfileActions from './ProfileActions'
import Experience from './Experience'
import Education from './Education'

class Dashboard extends Component {

  componentDidMount(){
    //get current profile
    this.props.getCurrentProfile()
  }

  onDeleteClick=()=>{
    this.props.deleteAccount()
  }
  render() {
    const {user} = this.props.auth
    const {profile,loading}=this.props.profile
    let dashboardContent ;
    if(profile === null || loading){
      dashboardContent = <Spinner/>
    }else{
      //check if logged in user has profile data
      if(Object.keys(profile).length>0){
         // they have a profile
         dashboardContent =(
           <React.Fragment>
             <p className="lead text-muted">Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link></p>
             <ProfileActions/>
             <Experience experience ={profile.experience}/>
             <Education education ={profile.education}/>

             <div style ={{marginBottom:'60px'}}>
               <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">Delete My Account</button>
             </div>
           </React.Fragment>
         )
      }else{
         // there is not profile but user is logged in
         dashboardContent=(
           <div>
              <p className="lead text-muted">Welcome {user.name}</p>
              <p>You have not yet set up a profile ,Please add some info</p>
              <Link to="/create-profile" className="btn btn-lg btn-info">
                Create Profile
              </Link>
           </div>
         )
      }
    }
    return (
      <div  className="container">
      <div className="dashboard">
        <div className="conatiner">
          <div className="row">
            <div className="col-md-12">
             <h1 className="display-4">Dashboard</h1>
             {dashboardContent}
            </div>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

const mapStateToProps =state=>({
  profile:state.profile,
  auth:state.auth
})

export default connect(mapStateToProps,{getCurrentProfile,deleteAccount})(Dashboard)
