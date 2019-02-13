import React, { Component } from 'react'
import  {connect} from 'react-redux'
import PostForm from './PostForm'
import  Spinner from '../common/Spinner'
import {getPosts} from '../../actions/postActions'
import PostFeed from './PostFeed'

 class Post extends Component {
   componentDidMount(){
     this.props.getPosts()
   }
  render() {
    const {posts,loading} =this.props.post
    let postContent
    if(posts === null || loading){
      postContent=<Spinner />
    }else{
      postContent =<PostFeed posts={posts}/>
    }
    return (
      <div className="container">
      <div className="feed">
         <div className="container">
         <div className="row">
          <div className="col-md-12">
           <PostForm />
           {postContent}
          </div>
         </div>
         </div>
      </div>
      </div>
    )
  }
}

const mapStateToprops=state=>({
  post:state.post
})

export default connect(mapStateToprops,{getPosts}) (Post)
