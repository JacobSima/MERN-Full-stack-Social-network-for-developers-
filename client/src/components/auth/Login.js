import React, { Component } from 'react'
import {connect}from 'react-redux'
import PropTypes from 'prop-types'
import {loginUser} from '../../actions/authActions'
import TextFieldGroup from '../common/TextFieldGroup'

 class Login extends Component {
   state ={
     email:'',
     password:'',
     errors:{}
   }   
   componentDidMount(){
    const {isAuthenticated} = this.props.auth
    if(isAuthenticated){
      this.props.history.push('/dashboard')
    }
  }
   componentWillReceiveProps(nextProps){
     if(nextProps.auth.isAuthenticated) {this.props.history.push('/dashboard')}
     if(nextProps.errors){
       this.setState({errors:nextProps.errors})
     }
   }

   onChange =e=>this.setState({[e.target.name]:e.target.value})

   onSubmit =e=>{ 
     e.preventDefault()
     const {email,password}=this.state
     const userData ={
       email,
       password
     }
     this.props.loginUser(userData)
   }
  
  render() {
    const {email,password,errors}=this.state
    return (
      <div className="container">
      <div className="login">
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Log In</h1>
          <p className="lead text-center">Sign in to your DevConnector account</p>
          <form onSubmit={this.onSubmit}>
            <TextFieldGroup
              name="email"
              placeholder="Email Address" 
              value={email}
              type="email" 
              onChange={this.onChange}
              error={errors.email}
            />
            <TextFieldGroup
              placeholder="Password" 
              name="password" 
              type="password"  
              value={password}
              onChange={this.onChange}
              error={errors.password}
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
Login.proptypes={
  loginUser:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired,
}

const mapStateToprops =state =>({
  auth:state.auth,
  errors:state.errors
})

export default connect(mapStateToprops,{loginUser})(Login )
