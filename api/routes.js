const express=require('express')
const router=express.Router()
const User=require('./models/users')
const crypto=require('crypto')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


router.post("/signup",async(req,res)=>{
    const {name,email,password}=req.body
    const user=await User.findOne({email:email})
    console.log(name)
    if(user){
        res.status(400).send({error:"User with this email address already exists"})
        return
    }else{
        const hashedPass=await bcrypt.hash(password,10)
        console.log(hashedPass)
        const newUser=new User({
            name:name,
            email:email,
            password:hashedPass
        })

        try{
            await newUser.save()
            res.status(200).send({message:"User Registered Successfully"})
        }catch(err){
            console.log(err)
            res.status(400).send({error:"Error occured while saving the user: ",err})
        }
    }
})

router.post("/login",async(req,res)=>{
    const generateKey = () => {
        const key = crypto.randomBytes(32).toString("hex");
        return key;
      };
    const {email,password}=req.body
    const savedUser = await User.findOne({ email: email });
    if (!savedUser) {
      return res.status(422).send({ error: "Invalid Credentials" });
    }
      try {
        bcrypt.compare(password, savedUser.password, (err, result) => {
          if (result) {
            const key = generateKey();
            const token = jwt.sign({ userId: savedUser._id }, key);
            return res.status(422).send({ message: "Logged IN", data: token,id:savedUser._id,name:savedUser.name });
          } else {
            console.log("Error");
            return res.status(422).send({ error: "Invalid Credentials2" });
          }
        });
      } catch (err) {
        console.log(err);
      }
    
})

router.post("/updateProfile",async(req,res)=>{
  const {name,email,password,newPassword}=req.body
  try{
    const user=await User.findOne({email:email})
    if(user){
      bcrypt.compare(password,user.password,(err,result)=>{
        if(result){
          const hashedPass=bcrypt.hash(newPassword,10)
          user.password=hashedPass
          user.name=name
          res.status(200).send({message:"Password changed"})
        }else{
          res.status(500).send({error:"Invalid old password"})
        }
      })
    }else{
      res.send(400).send({error:"Please enter valid email"})
    }
  }catch(err){
    res.send(440).send({error:"Something went wrong"})
  }
})
module.exports=router