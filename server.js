const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')

//load routes
  const users = require('./routes/api/users')
  const profile = require('./routes/api/profile')
  const posts= require('./routes/api/posts')
 

// initialize the app
  const app = express()

//connect to mongoDB
const {mongURL} = require('./config/keys')
  mongoose.connect(mongURL,{ useNewUrlParser: true } )
    .then(()=>console.log('MongoDB connected...'))
    .catch(ex=>console.log(ex))


//Middleware 
 //passport middleware
 app.use(passport.initialize())
  //passport config
  require('./config/passport')(passport)   
  //body parser middlewares
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
 
 
 
 

 
//use routes
  app.use('/api/users',users)
  app.use('/api/profile',profile)
  app.use('/api/posts',posts)

// Serve Static if in production
if(process.env.NODE_ENV === 'production'){
   //set a static folder
   app.use(express.static('client/build'))

   // create route that it is anything but not the about route
   app.get('*',(req,res)=>{
      res.sendFile(path.resolve(__dirname,'client','build,index.html'))
   })
}
 
//listen the server port
  const port = process.env.PORT || 5000
  app.listen(port,async()=>console.log(`Server started on port ${port}`))