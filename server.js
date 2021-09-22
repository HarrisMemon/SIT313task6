
const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require('mongoose')
const Expert = require("./models/Experts.js");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/TASK6", {useNewUrlParser:true})

app.route("/experts")
.get((req,res)=>{
  Expert.find((err,expertlist)=>{
    if (err) {res.send(err)}
    else {res.send(expertlist)}
  })
})
.delete((req,res)=>{
  Expert.deleteMany((err)=>{
    if (err) {res.send(err)}
    else {res.send("All Experts Deleted Succesfully")}
  })
})
.post((req,res)=>{
  const expert = new Expert({
    name: req.body.name,
    address: req.body.address,
    mobile: req.body.mobile,
    password: req.body.password
  })
  expert.save((err) =>{
    if (err) {res.send(err)}
    else res.send("Added new Expert")
  })
})

app.route('/experts/:ename')

.get((req,res)=>{
  Expert.findOne({name: req.params.ename}, (err, found)=>{
    if (!err)(res.send(found))
    else res.send("No matched Expert")
  })
})
.delete((req,res)=>{
  Expert.deleteOne({name: req.params.ename}, (err)=>{
    if (err) {res.send(err)}
    else {res.send("Expert Deleted Succesfully")}
  })
})
.put((req,res)=>{
  Expert.updateOne(
    {name: req.params.ename},
    {name: req.body.name},
    {address: req.body.address},
    {mobile: req.body.mobile},
    {password:req.body.password}
    , 
   
    (err)=>{
      if (err) {res.send(err)}
      else res.send("Updated")
    }
  )
    console.log(req.body.name)
})
.patch((req,res)=>{
  Expert.updateOne(
    {name: req.params.ename},
    {$set: {
      name: req.body.name,
      address: req.body.address,
      mobile: req.body.mobile,
      password:req.body.password
    }}, 
   
    (err)=>{
      if (err) {res.send(err)}
      else res.send("Updated")
    }
  )
    console.log(req.body.name)
})


app.listen(8080, function (req, res){
  console.log("server is running on port 8080");
})
