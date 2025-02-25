const express=require('express')
const router=express.Router()
const User=require('../models/User')
const {body, validationResult}=require('express-validator');
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const jwtSecret="dfghjkyjdsxcbvjthgrsdfzcvxcbvfg";
router.post("/createuser",[
body('email','Not an email').isEmail(),
body('name','Username must be of minimum 4 letters').isLength({min:4}),
body('password','Incorrect Password').isLength({min:6})],
async(req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }

    const salt=await bcrypt.genSalt(10);
    let secPassword=await bcrypt.hash(req.body.password,salt)
    try{
        await User.create({
            name:req.body.name,
            password:secPassword,
            email:req.body.email,
            location:req.body.location
        })
        res.json({success:true});
    }
    catch(err)
    {
        console.log(err);
        res.json({success:false});
    }
})

router.post("/login",[
    body('email','Not an email').isEmail(),
    body('password','Incorrect Password').isLength({min:6})],
    async(req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }    
        let email=req.body.email;
        try{
            let userdata=await User.findOne({email});
            if(!userdata){
                return res.status(400).json({errors:"Try logging with correct credentials"})
            }
            const pwdCompare=await bcrypt.compare(req.body.password,userdata.password)
            if(!pwdCompare)
            {
                return res.status(400).json({errors:"Try logging with correct credentials"})
            }

            const data={
                user:{
                    id:userdata.id
                }
            }
            const authToken=jwt.sign(data,jwtSecret)
            return res.json({success:true,authToken:authToken})
        }
        catch(err)
        {
            console.log(err);
            res.json({success:false});
        }
    })
    

module.exports=router;