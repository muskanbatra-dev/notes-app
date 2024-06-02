const router = require('express').Router();
const userSchema = require('../models/User');


router.post('/login',async(req,res)=>{
    
    try{

        const user = await userSchema.findOne({email:req.body.email})

        !user && res.status(404).json({"message":"user not found",status:false});

        const validatePassword = req.body.password === user.password;

        !validatePassword && res.status(404).json({"message":"password",status:false});

        if(validatePassword && user){
            res.status(200).json(user);
        }

    }catch(error){
         res.status(500).json(error);
    }

})

router.post('/register',async(req,res)=>{

   const user = new userSchema({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password
   });

   try{
    const userData = await user.save();
    res.status(200).json(userData);
   }catch(error){
        res.status(500).json(error);
   }

})

module.exports = router;