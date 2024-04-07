const express = require("express");
const router = express.Router();
const User = require('../models/User')


//Retrieve all users
router.get("/users",async (req, res) => {
  try {
    const n = await User.find();
    return res.json({success : true,users : n});
  } catch(error) {
    return res.status(400).json({ errors: error,success : false });
  }
})

//Retrieve a specific user by ID.
router.get(`/users/:id`,async (req, res) => {
  let id = req.params.id;
  try {
    const n = await User.find({id : id});
    return res.json({success : "User found", users : n});
  } catch(error) {
    return res.status(404).json({ errors: "User ID does not exist",success : false });
  }
})

//Create a new user
router.post(
  "/users",
  async (req, res) => {
    const { first_name,last_name, email,gender,avatar,domain,available } = req.body;
    try{
      const details = await User.create({
        first_name,last_name, email,gender,avatar,domain,available
      });
      return res.json({success : "User added", details : details});
    }
    catch(e){
      return res.status(404).json({error : "Email address must be unique",success : false});
    }
  });

//Update an existing user
router.put(`/users/:id`,async (req, res) => {
  const { id,first_name,last_name,email,gender,avatar,domain,available } = req.body;
  let updatedDetails = {};
  try {
    try{
    if (id) {
      updatedDetails.id = id;
    }
      if (first_name) {
      updatedDetails.first_name = first_name;
    }
    if (last_name) {
      updatedDetails.last_name = last_name;
    }
    
    if (gender) {
      updatedDetails.gender = gender;
    }
    if (avatar) {
      updatedDetails.avatar = avatar;
    }
    if(email){
      updatedDetails.email=email;
    }
    if (domain) {
      updatedDetails.domain = domain;
    }
    updatedDetails.available=available;
  }
    catch(err){
      res.json({error : err,success : false});
    }
    await User.findOneAndUpdate(
      {id : req.params.id},
      updatedDetails
    );
    res.send({updatedDetails});
  } catch(error) {
    return res.status(404).json({ errors: "ID is not found",success : false });
  }
})

//Delete a user
router.delete("/users/:id",
  async(req,res)=>{
    try{
      const user= await User.findById(req.params.id);
      if(!user){
        return res.status(404).json({error : "UserID does not exist"})
      }
      else {
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json({success : "User deleted"})
      }
    }
    catch(err){
      return res.status(404).json({error : "Invalid UserID",success : false});
    }
  })
  module.exports= router