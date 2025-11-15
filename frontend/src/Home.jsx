import {Routes , Route } from "react-router-dom";
import App from "./App.jsx";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import Display from "./Display.jsx";

function Home(){
return (
<>
<Routes>
<Route path="/" element={<App/>}/> 
<Route path="/signup" element={<Signup/>} /> 
<Route path="/login" element={<Login/>}/> 
<Route path="/display" element={<Display/>}/> 
</Routes>
</>
)
}
export default Home;