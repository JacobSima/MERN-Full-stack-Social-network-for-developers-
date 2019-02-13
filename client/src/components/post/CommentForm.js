import React, { Component } from 'react'
import {connect} from 'react-redux'
import TextAreaFieldsGroup from '../common/TextAreaFieldsGroup'
import {addComment} from '../../actions/postActions'

 class CommentForm extends Component {
  state={
    text:'',
    errors:{}
  }
  
  componentWillReceiveProps(nextProps){
    if(nextProps.errors){ 
      this.setState({errors:nextProps.errors})
    }
  }

  onChange = e =>{this.setState({[e.target.name]:e.target.value})}

  onSubmit =e=>{
    e.preventDefault()
   const {user}=this.props.auth
   const {postId}=this.props
   const newComment ={
     text:this.state.text,
     name:user.name,
     avatar:user.avatar
   }

   this.props.addComment(postId,newComment)

   //clear the fields
   this.setState({text:'',errors:{}})

  }
  render() {
    const{errors,text}= this.state
    return (
      <div className="post-form mb-3">
            <div className="card card-info">
              <div className="card-header bg-info text-white">
                Make a comment...
              </div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <TextAreaFieldsGroup 
                      placeholder="Reply to post"
                      name="text"
                      value={text}
                      onChange={this.onChange}
                      error={errors.text}
                    />
                  </div>
                  <button type="submit" className="btn btn-dark">Submit</button>
                </form>
              </div>
            </div>
          </div>
    )
  }
}

const mapStateToProps=state=>({
  errors:state.errors,
  auth:state.auth
})

export default connect(mapStateToProps,{addComment}) (CommentForm)
