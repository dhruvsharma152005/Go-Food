const express=require('express');
const router=express.Router();
const  User=require('../models/User');
const jwt=require("jsonwebtoken");
//JWTs, or JSON Web Tokens, are primarily used for securely transmitting information between two parties, typically a client and a server, and are commonly used for authentication and authorization purposes
const jwtSecret="MynameisEndtoEndYouTubeChannel$#"
const{body,validationResult}=require('express-validator');


const bcrypt=require("bcryptjs");

//
router.post('/createuser',
    [body('email').isEmail(),
        body('password','Incorrect Password').isLength({min:8}),
        body('name').isLength({min:5})
    ],
    async(req,res)=>
{
    const errors=validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
        }
        //A salt is a random string added to the password before hashing.
        //It makes every hash unique, even if two users have the same password.
        //So an attacker can’t use precomputed lookup tables (rainbow tables).
    const salt=await bcrypt.genSalt(10);
    let secPassword=await bcrypt.hash(req.body.password,salt)

    try
    {
        await User.create(
            {
                name:req.body.name,
                password:secPassword,
                email:req.body.email,
                location:req.body.location
            }
        )
        .then(res.json({success:true}));

    }
    catch(error)
    {
        console.log(error);
        res.json({success:false});
    }
})

//for login
router.post('/loginuser',
    [body('email').isEmail(),
        body('password','Incorrect Password').isLength({min:8})
    ],
    async(req,res)=>
{
    const errors=validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
        }

    let email=req.body.email;

    try
    {
        let userData=await User.findOne({email});//return this all
        if(!userData)
        {
            return res.status(400).json({errors:"Try logging with correct credentials(email)"})
        }
        const pwdCompare=await bcrypt.compare(req.body.password,userData.password)
        if(!pwdCompare)
        {
             return res.status(400).json({errors:"Try logging with correct credentials"})
        }

        //jwt header,payload(data) secretkey
        //data payload
        const data={
            user:{
                id:userData.id
            }
        }
        /*
         jwt.sign(payload, secret) creates a JWT token by:
         Taking your data as payload (the information you want to include in the token).
         Using jwtSecret as the secret key to sign and secure the token.
        */
        const authToken=jwt.sign(data,jwtSecret);//pyload means dta
        //diff authtoken generate everytime(secure)
        //Sending token to frontend
         return res.json({success:true,authToken:authToken})
        

    }
    catch(error)
    {
        console.log(error);
        res.json({success:false});
    }
})

module.exports=router;