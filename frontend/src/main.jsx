import { createRoot } from 'react-dom/client'
import { BrowserRouter,Routes,Route} from "react-router-dom";

import './index.css'
import Home from './components/Home';




createRoot(document.getElementById('root')).render(
<BrowserRouter>
<Routes>
<Route path="/*" element={<Home />} />
</Routes>
</BrowserRouter> 
)

