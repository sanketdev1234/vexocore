import {useState , useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router"
function Signup() {
     const Navigate=useNavigate();
    const [formData , setfromData]=useState({username:"please enter the name",email:"enter the email" , password:"enter the password"})

    const handleonchange=(event)=>{
        console.log(event);
        console.log(event.target.name);
        console.log(event.target.value);
        setfromData((prev)=>({... prev,[event.target.name]:event.target.value}));
    }
    const handleonsubmit=async(event)=>{
        event.preventDefault();
        const response=await axios.post("/signup",formData);
        console.log(response);
        setfromData({username:"please enter the name",email:"enter the email" , password:"enter the password"})
        Navigate("/login");
    }

  return (
    <div>
      <p style={{ color: "black", fontSize: "50px" }}>Signup</p>
     <br>
     </br>
    <br>
     </br>
      <form onSubmit={handleonsubmit}>
      
     <div>
    <label htmlFor="username">username</label>
    <input type="input" id="username" name="username" value={formData.username} 
    onChange={handleonchange}></input>
     </div>
     <div>
    <label htmlFor="email">email</label>
    <input type="email" id="email" name="email" value={formData.email} 
    onChange={handleonchange}></input>
     </div>
     <div>
    <label htmlFor="password">password</label>
    <input type="password" id="password" name="password" value={formData.password}
    onChange={handleonchange}></input>
     </div>
<br></br>
     <button >submit</button>

      </form>
    </div>
  );
}

export default Signup;
