import React, { Component } from 'react'
import {Link} from 'react-router-dom'

 class ProfileGitHub extends Component {
   state={
     clientID:'efa1bd9973386221d462',
     clientSecret:'f735d27676d554506e1f022936de6cd30d4ba265',
     count:5,
     sort:'created:asc',
     repos:[]
   }
   async componentDidMount(){
     try{
      const{username}=this.props
      const {count,sort,clientID,clientSecret}=this.state
 
      const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientID}&client_secret=${clientSecret}`)
      const resData = await res.json()
      if(this.refs.myRef){
        if(resData.message === "Not Found"){
          this.setState({repos:[]})
        }else{
          this.setState({repos:resData})
        }
        
      }
     }
     catch(err){
       console.log(err)
     }
   }
  render() { 
    const {repos} =this.state
    let repoItems ;
    if(repos.length === 0){
      repoItems  = null
    }else{
      repoItems = repos.map(repo=>(
        <div key={repo.id} className="card car-body mb-2">
           <div className="row">
             <div className="col-md-6">
               <h4>
                 <Link to={repo.html_url} className="text-info" target="_blank" rel="noopener noreferrer">{repo.name} </Link>
               </h4>
               <p>{repo.description}</p>
             </div>
             <div className="col-md-6">
               <span className="badge badge-info mr-1">
                 Stars: {repo.stargazers_count}
               </span>
               <span className="badge badge-secondary mr-1">
                 Watchers: {repo.watchers_count}
               </span>
               <span className="badge badge-success">
                 Forks: {repo.forks_count}
               </span>
             </div>
           </div>
        </div>
      ))
    }
   
    return (
      <div ref="myRef">
           {repos.length ===0?null:<hr/>}
          {repos.length === 0?(null):( <h3 className="mb-4">Latest GitHub Repos</h3>) }  
          {repoItems}
      </div>
    )
  }
}

export default ProfileGitHub
