import { createRoot } from 'react-dom/client'
import {BrowserRouter , Routes , Route } from "react-router-dom";
import Home from "./Home.jsx";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL ='http://localhost:8080';

createRoot(document.getElementById('root')).render(    
   <BrowserRouter>
   <Routes>
    <Route path="/*" element={<Home/>} />
   </Routes>
   </BrowserRouter>
)
