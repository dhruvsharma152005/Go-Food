import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom' //usenavigate redirect
function Login() {

  const[credentials,setcredentials]=useState({email:"",password:""})
  let navigate=useNavigate();
      const handleSubmit=async(e)=>
      {
          e.preventDefault();
          console.log(JSON.stringify({email:credentials.email,password:credentials.password}));
          const response=await fetch("https://go-food-autj.vercel.app/api/loginuser",{
          method:'POST',
          headers:
          {
              "Content-Type":"application/json",
          },
          //to convert your JavaScript object into a JSON-formatted string
          //body expects a string
          body:JSON.stringify({email:credentials.email,password:credentials.password})
      }
      );
      const json=await response.json();
      console.log(json);
      if(!json.success)
      {
          alert("Enter valid credentials");
      }
//navigate to home page after login
       if(json.success)
      {
        //localStorage is a Web API provided by browsers to store key-value pairs locally on the user’s device.
        //"authToken" is the key you chose to store.
        //json.authToken is the value, which in your case is the JWT token you received from your backend 
        localStorage.setItem("userEmail",credentials.email);
        localStorage.setItem("authToken",json.authToken)
        navigate("/");
        /*
        Why store it?
        ✅ So that later you can:
        Keep the user logged in across page reloads
        Send it in your fetch requests for protected routes:
        */
      }
      }
  
  
      //without this form remain static(does not type anything there
      const onChange=(e)=>
      {
          setcredentials({...credentials,[e.target.name]:e.target.value});
      }

  return (
    <div>
       <div className="container">
          <form onSubmit={handleSubmit}>
          
      
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} id="exampleInputPassword1"/>
        </div>
       
        <button type="submit" className="m-3 btn btn-success">Submit</button>
        <Link to="/createuser" className='m-3 btn btn-danger'>I am a new user</Link>
      </form>
      </div>
      
    </div>
  )
}

export default Login
