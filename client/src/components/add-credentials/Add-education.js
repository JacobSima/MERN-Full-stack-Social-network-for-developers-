import React, { Component } from 'react'
import {Link,withRouter} from 'react-router-dom'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldsGroup  from '../common/TextAreaFieldsGroup'
import{ connect} from 'react-redux'
import {addEducation} from '../../actions/profileActions'

 class AddEducation extends Component {
   state={
     school:'',
     degree:'',
     fieldofstudy:'',
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
     const{school,degree,fieldofstudy,from,to,current,description}=this.state
     const EduData ={school,degree,fieldofstudy,from,to,current,description}
     
     //add education action
     this.props.addEducation(EduData,this.props.history)
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
    const {errors,description,current,disabled,to,from,fieldofstudy,degree,school} = this.state
    return (
      <div className="container">
      <div className="add-experience">
          <div className="container">
           <div className="row">
             <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn-btn-light">Go Back</Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">Add any school.bootcamp.etc that you have attended</p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                 placeholder="* School"
                 name = "school"
                 value = {school}
                 onChange = {this.onChange}
                 error={errors.school}
                />
                <TextFieldGroup
                 placeholder="*Degree or Certification"
                 name = "degree"
                 value = {degree}
                 onChange = {this.onChange}
                 error={errors.degree}
                />
                <TextFieldGroup
                 placeholder="* Fieldofstudy"
                 name = "fieldofstudy"
                 value = {fieldofstudy}
                 onChange = {this.onChange}
                 error={errors.fieldofstudy}
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
                      placeholder="Education Description"
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

export default connect(mapStateToProps,{addEducation}) (withRouter(AddEducation))

