import React, { Component } from 'react'
import {connect} from 'react-redux'
import TextFieldGroup from '../common/TextFieldGroup'
import InputGroup from '../common/InputGroup'
import SelectListGroup from '../common/SelectListGroup'
import TextAreaFieldsGroup from '../common/TextAreaFieldsGroup'
import {createProfile,getCurrentProfile} from '../../actions/profileActions'
import { withRouter } from "react-router"
import isEmpty from '../../validation/is-empty'
import {Link} from 'react-router-dom'

 class CreateProfile extends Component {
    state={
      displaySocialInputs:false,
      handle:'',
      company:'',
      website:'',
      location:'',
      status:'',
      skills:'',
      githubusername:'',
      bio:'',
      twitter:'',
      facebook:'',
      linkedin:'',
      youtube:'',
      instagram:'',
      errors:{}
    }
    componentDidMount(){
      this.props.getCurrentProfile()
    }

    UNSAFE_componentWillReceiveProps(nextProps){
      if(nextProps.errors){
        this.setState({errors:nextProps.errors})
      }
      if(nextProps.profile.profile){
         const profile = nextProps.profile.profile
        //  const social = JSON.stringify(profile.social)
         const skillsCSV = profile.skills.join(',')
         // if profile field doesnt exist, make empty string
         profile.company =!isEmpty(profile.company)? profile.company:''
         profile.website =!isEmpty(profile.website)? profile.website:''
         profile.location =!isEmpty(profile.location)? profile.location:''
         profile.githubusername =!isEmpty(profile.githubusername)? profile.githubusername:''
         profile.bio =!isEmpty(profile.bio)? profile.bio:''
         profile.social =!isEmpty(profile.social)?profile.social:{}
         profile.twitter =!isEmpty(profile.social.twitter)?profile.social.twitter:''
         profile.facebook =!isEmpty(profile.social.facebook)?profile.social.facebook:''
         profile.linkedin =!isEmpty(profile.social.linkedin)?profile.social.linkedin:''
         profile.youtube =!isEmpty(profile.social.youtube)?profile.social.youtube:''
         profile.instagram =!isEmpty(profile.social.instagram)?profile.social.instagram:''

         //set component fields state
         this.setState({
            handle:profile.handle,
            company:profile.company,
            website:profile.website,
            location:profile.location,
            status:profile.status,
            skills:skillsCSV,
            githubusername:profile.githubusername,
            bio:profile.bio,
            twitter:profile.twitter,
            facebook:profile.facebook,
            linkedin:profile.linkedin,
            youtube:profile.youtube
         })

      }
    }

    onChange = e=>{this.setState({[e.target.name]:e.target.value})}

    onSubmit = e=>{
      e.preventDefault()
      const {handle,company,website,location,status,skills,githubusername,bio,twitter,facebook,linkedin,youtube,instagram} =this.state
         const profileData={
               handle,company,website,location,status,skills,githubusername,bio,twitter,facebook,linkedin,youtube,instagram
         }
         //create a profile
         this.props.createProfile(profileData,this.props.history)
          
    }
  render() {
    const {errors,displaySocialInputs} =this.state
     
    let socialInputs;
    if(displaySocialInputs){
      socialInputs =(
        <div>
          <InputGroup
            placeholder="Twitter profile URL"
            name= "twitter"
            icon ="fab fa-twitter"
            value = {this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="Facebook profile URL"
            name= "facebook"
            icon ="fab fa-facebook"
            value = {this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="Linkedin profile URL"
            name= "linkedin"
            icon ="fab fa-linkedin"
            value = {this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />
          <InputGroup
            placeholder="Youtube profile URL"
            name= "youtube"
            icon ="fab fa-youtube"
            value = {this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />
          <InputGroup
            placeholder="Instagram profile URL"
            name= "instagram"
            icon ="fab fa-instagram"
            value = {this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      )
    }

     //select options status
    const options=[

      {label:'* Select Professional Status',value:'0'},
      {label:'* Developer',value:'Developer'},
      {label:'* Junior Developer',value:'Junior Developer'},
      {label:'* Senior Developer',value:'Senior Developer'},
      {label:'* Student or Learning',value:'Student or Learning'},
      {label:'* Instructor or Teacher',value:'Instructor or Teacher'},
      {label:'* Intern',value:'Intern'},
      {label:'* Other',value:'Other'},
    ]
    return (
      <div className="container">
      <div className="create-profile">
         <div className="container">
          <div className="row">
           <div className="col-md-8 m-auto">
           <Link to="/dashboard" className="btn-btn-light">Go Back</Link>
            <h1 className="display-4 text-center">Edit Your Profile</h1>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={this.onSubmit}>
             
               <TextFieldGroup
                  placeholder= "* Profile Handle"
                  name ="handle"
                  value ={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
               />
              
              <SelectListGroup
                // placeholder= "* Status"
                name ="status"
                value ={this.state.status}
                onChange={this.onChange}
                error={errors.status}
                options={options}
              />

                <TextFieldGroup
                  placeholder= "Company"
                  name ="company"
                  value ={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
               />   

               <TextFieldGroup
                  placeholder= "Website"
                  name ="website"
                  value ={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
               />  
               <TextFieldGroup
                  placeholder= "Location"
                  name ="location"
                  value ={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
               />  
               <TextFieldGroup
                  placeholder= "* Skills"
                  name ="skills"
                  value ={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
               /> 
               <TextFieldGroup
                  placeholder= "Github Username"
                  name ="githubusername"
                  value ={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
               /> 

                <TextAreaFieldsGroup
                  placeholder= "Short Bio"
                  name ="bio"
                  value ={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
               /> 
               <div className="mb-3">
                    <button type="button" className="btn btn-light" onClick={()=>this.setState({displaySocialInputs:!displaySocialInputs})}
                    > Add Social Network Links</button> <span className="text-muted"> Optional</span>
                    
                  </div>
                {socialInputs}
                <input type="submit" value ="Submit" className="btn btn-info btn-block mt-4"/>
            </form>
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
     errors:state.errors
})

export default connect(mapStateToProps ,{getCurrentProfile,createProfile}) (withRouter(CreateProfile))
