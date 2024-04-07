const express = require("express");
const router = express.Router();
const User = require('../models/User')

router.post(
    "/users",
    async (req, res) => {
      const { first_name,last_name, email,gender,avatar,domain,available } = req.body;
      try{
        const details = await User.create({
          first_name,last_name, email,gender,avatar,domain,available
        });
        res.send(details);
      }
      catch(e){
        return res.status(404).json({error : "Email address must be unique"});
      }

    }
  );

router.get("/users",async (req, res) => {
  try {
    const n = await User.find();
    res.json(n);
  } catch(error) {
    return res.status(400).json({ errors: error });
  }
}
)
router.get(`/users/:id`,async (req, res) => {
  let id = req.params.id;
  try {
    const n = await User.findById(id);
    res.json(n);
  } catch(error) {
    return res.status(404).json({ errors: "User ID does not exist" });
  }
}
)
router.put(`/users/:id`,async (req, res) => {
  try{
    const currentUser = await User.findById(req.params.id);
    if(!currentUser){
      return res.status(404).json({error : "No User found"});
    }
  }
  catch(err){
    res.status(404).send(err)
  }
  const { first_name,last_name,email,gender,avatar,domain,available } = req.body;
  let updatedDetails = {};
  try {
    try{
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
    if (available) {
      updatedDetails.available = available;
    }}
    catch(err){
      res.json({error : err});
    }
    await User.findByIdAndUpdate(
      req.params.id,
      {$set : updatedDetails},
      { new: true }
    );
    console.log("2");
    res.send({updatedDetails});
  } catch(error) {
    return res.status(404).json({ errors: error });
  }
}
)


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
      res.status(404).json({error : "Invalid UserID"});
    }
  }
)
  module.exports= router