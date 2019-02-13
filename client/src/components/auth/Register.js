import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect } from  'react-redux'
import {registerUser} from '../../actions/authActions'
import {withRouter} from 'react-router-dom'
import TextFieldGroup from '../common/TextFieldGroup'

 class Register extends Component {

  state={
      name:'',
      email:'',
      password:'',
      password2:'',
      errors:{}
     }

  componentDidMount(){
    const {isAuthenticated} = this.props.auth
    if(isAuthenticated){
      this.props.history.push('/dashboard')
    }
  }
 
  componentWillReceiveProps(nextProps){
   
    if(nextProps.errors){
      this.setState({errors:nextProps.errors})
    }

  } 

  onChange= e=>this.setState({[e.target.name]:e.target.value})
  onSubmit =e =>{
      e.preventDefault()
    const {name,email,password,password2}=this.state
    const newUser = {
      name,
      email,
      password,
      password2
    }
    //register user
    this.props.registerUser(newUser,this.props.history)
    

  }  

  render() {
    const {name,email,password,password2,errors}=this.state
    return (
      <div className="container">
      <div className="register">
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Sign Up</h1>
          <p className="lead text-center">Create your DevConnector account</p>
          <form noValidate onSubmit={this.onSubmit} >
            <TextFieldGroup
              name="name"
              placeholder="Name"
              value={name}
              type="text"
              onChange={this.onChange}
              error={errors.name}
            />
            <TextFieldGroup
              name="email"
              placeholder="Email Address"
              value={email}
              type="email"
              onChange={this.onChange}
              error={errors.email}
            />          
            <TextFieldGroup
              name="password" 
              placeholder="Password" 
              value={password}
              type="password" 
              onChange={this.onChange}
              error={errors.password}
            />
            <TextFieldGroup
              name="password2" 
              placeholder="Confirm Password" 
              value={password2}
              type="password" 
              onChange={this.onChange}
              error={errors.password2}
            />
            <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
  </div>
  </div>
    )
  }
}

Register.proptypes ={
  registerUser:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired,
}

const mapStateToProps =state=>({
   auth:state.auth,
   errors:state.errors
})
export default connect(mapStateToProps,{registerUser})(withRouter(Register))
