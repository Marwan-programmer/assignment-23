
const express = require('express')
const app = express()
const port = 3000;

let users = [];

app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 
let idCounter = 0;
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
///////////////get all users and search
app.get("/api/v1/users", function(req, res) {
  


    const searchUsers = users.filter(user => {
      if (user.userName.startsWith(req.query.search)){
        return user;
      }  
     })
    if (req.query.search){
      res.status(200).send(searchUsers);
    }
    else if (Object.keys(req.query).length === 0){
      res.status(200).send(users);
    }
    else {
      res.status(404).send();
    }



  });





//////////////post
app.post('/api/v1/users', function (req, res) {
    const {userName, lastName,email,url} = req.body;
    const found = users.some(user => user.userName === userName);
    
    if(found){
      res.status(409).send({userName:"exists"});
    }
    else {
      idCounter++;  
      users.push({id: idCounter, userName, lastName,email,url});
      res.status(201).send({id: idCounter, userName, lastName,email,url});
    }
  })
  


/////////////////delete
app.delete('/api/v1/users/:userId', function (req, res) {


    if (isNaN(req.params.userId)) {
      console.log(req.params.userId)
      res.status(400).send("hhgg");
  
    }
    let found = false
    let user = users.find(user => {
      if (req.params.userId == user.id) {
  
        found = true;
        return user
      }
    })
  
    if (!found) {
      res.status(404).send();
    }
  
    if (found) {
      console.log(Number(user.id))
      let index = users.indexOf(user)
      users.splice(Number(index), 1)
      res.status(200).send("Number(user.id)");
    }
  })
  
