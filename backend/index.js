require('dotenv').config();
const express=require('express')

const app=express();
const port=process.env.VITE_PORT;
const mongoDB=require("./db"); //not import bcz we work on nodejs
mongoDB();

//this is new method for cors
/*const cors = require('cors');

// Allow requests from http://localhost:3000 only
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true // if you use cookies or auth headers
}));*/

//this is for cors error(manually)
// app.use((req,res,next)=>
// {
//     res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin,X-Requested-With,Content-Type,Accept"
//     );
//     next();
// })



//cors another
const cors = require('cors');
app.use(cors({
    origin: "https://go-food-95yb.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));

app.get('/',(req,res)=>{
    res.send('Helo world');
})
app.use(express.json());
app.use('/api',require("./Routes/CreateUser"));
app.use('/api',require("./Routes/DisplayData"));
app.use('/api',require("./Routes/OrderData"));
app.listen(port,()=>
{
    console.log(`Example app listenong on port ${port}`)
})