const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const data = require("../data");
const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const generateToken = require("../utils");

const userRouter = express.Router();

userRouter.get(
  "/seed",
  // expressAsyncHandler catches errors and sends them to function in server.js that handles them(check last function)
  expressAsyncHandler(async (req, res) => {
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

userRouter.post('/signin', expressAsyncHandler(async(req,res)=>{
    const user = await User.findOne({email: req.body.email})
    console.log(req.body);
    if(user){
        if(bcrypt.compareSync(req.body.password, user.password)){
            res.send({
                id: user._id,
                name: user.name,
                email:user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user)
            })
        }
        return;
    }
    res.status(401).send({message:'invalid email or password'})
}))

userRouter.post('/register',expressAsyncHandler(async(req,res)=>{
  const user = new User({
    username: req.body.username,
    email:req.body.email,
    password: bcrypt.hashSync(req.body.password,10)
  })
  const createdUser = await user.save()
  res.send({
    id: user._id,
    name: user.username,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(createdUser),
  });
}))

module.exports = userRouter;
