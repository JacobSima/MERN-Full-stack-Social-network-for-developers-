import React, { Component } from 'react'
import {Link,withRouter} from 'react-router-dom'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldsGroup  from '../common/TextAreaFieldsGroup'
import{ connect} from 'react-redux'
import {addExperience} from '../../actions/profileActions'

 class AddExperience extends Component {
   state={
     company:'',
     title:'',
     location:'',
     from :'',
     to:'',
     current:false,
     description:'',
     errors:{},
     disabled:false
   }

   UNSAFE_componentWillReceiveProps(nextProps){
     const {errors}=nextProps
     if(errors){
       this.setState({errors})
     }
   }

   onSubmit =e=>{
     e.preventDefault()
     const{company,title,location,from,to,current,description}=this.state
     const ExpData ={company,title,location,from,to,current,description}
     
     //add experience action
     this.props.addExperience(ExpData,this.props.history)
   }
   onChange = e =>{
    this.setState({[e.target.name]:e.target.value})
   } 
   onCheck = e =>{
      this.setState({
        disabled:!this.state.disabled,
        current:!this.state.current
      })
   }
  render() {
    const {errors,description,current,disabled,to,from,location,title,company} = this.state
    return (
      <div className="container">
      <div className="add-experience">
          <div className="container">
           <div className="row">
             <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn-btn-light">Go Back</Link>
              <h1 className="display-4 text-center">Add Experience</h1>
              <p className="lead text-center">Add any job or position that you have had in the past or current</p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                 placeholder="* Company"
                 name = "company"
                 value = {company}
                 onChange = {this.onChange}
                 error={errors.company}
                />
                <TextFieldGroup
                 placeholder="* Job Title"
                 name = "title"
                 value = {title}
                 onChange = {this.onChange}
                 error={errors.title}
                />
                <TextFieldGroup
                 placeholder="* Location"
                 name = "location"
                 value = {location}
                 onChange = {this.onChange}
                 error={errors.location}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                 name = "from"
                 type="date"
                 value = {from}
                 onChange = {this.onChange}
                 error={errors.from}
                
                />
                <h6>To Date</h6>
                 <TextFieldGroup
                 name = "to"
                 type="date"
                 value = {to}
                 onChange = {this.onChange}
                 error={errors.to}
                 disabled = {disabled?'disabled':''}
                />
                <div className="form-check mb-4">
                 <input type="checkbox"
                        className="form-check-input"
                        name="current"
                        value={current}
                        checked={current}
                        onChange={this.onCheck}
                        id="current"
                 />
                 <label htmlFor="current" className="form-check-label">Current Job</label>
                </div>
                <TextAreaFieldsGroup
                      placeholder="Job Description"
                      name="description"
                      value ={description}
                      onChange={this.onChange}
                      error ={errors.description}
                />
                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
              </form>
             </div>
           </div>
          </div>
      </div>
      </div>
    )
  }
}

const mapStateToProps=state=>({
  profile:state.profile,
  errors:state.errors
})

export default connect(mapStateToProps,{addExperience}) (withRouter(AddExperience))

