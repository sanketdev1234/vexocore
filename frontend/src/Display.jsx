import {useState,useEffect} from "react";
import axios from "axios";
function Display(){
const [users,setusers]=useState([{}]);

useEffect(()=>{
async function getusers(){

// const all_users=await axios.get("/seeallusers");
// console.log(all_users);
// setusers(all_users.data);


const response=await fetch("http://localhost:8080/seeallusers");
console.log("the  response data",response);
const response_json=await response.json();
console.log("the json response data :",response_json);
};
getusers();


},[]);

return (
    <div>
    <p style={{ color: "black", fontSize: "50px" }}>Display</p>
    
    {
    users.map((user,idx)=>(
        <div key={idx}>
            <p>{user.username}</p>
            <p>{user.email}</p>
        </div>
    ))

    }
    </div>
)
}
export default Display;