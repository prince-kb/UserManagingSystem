const express = require("express");
const router = express.Router();
const Team = require("../models/Team");

//Get all teams
router.get("/teams", async (req, res) => {
  try {
    const n = await Team.find();
    return res.json({ success: true, teams: n });
  } catch (err) {
    return res.json({ success: false });
  }
});

//Add user to team
router.put("/team/:id", async (req, res) => {
  let id = Number.parseInt(req.params.id);
  let { name } = req.body;
  try {
    const n = await Team.findOne({ name: name });
    if (!n) {
      const n = await Team.create({ name: name, id: [id] });
      return res.json({
        success: true,
        result: `${name} created and ${id} added`,
        team: n,
      });
    } else {
      if (n.id.find((e) => e === id)) {
        return res.json({ success: false, error: "User already exist" });
      }
      let array = n.id;
      array.push(id);
      try {
        const p = await Team.findOneAndUpdate({ name: name }, { id: array });
        return res.json({ success: true, team: p });
      } catch (err) {
        return res.json({ success: false, error: err });
      }
    }
  } catch (err) {
    return res.json({ success: false, error: err });
  }
});


//Deleting a team
router.delete("/team",async(req,res)=>{
    const {name} = req.body
    try{
        const p =await Team.findOneAndDelete({name : name});
        return res.json({success : true,team : p});
    }catch(err){
        return res.json({success : false,error : err})
    }
})


module.exports = router;
