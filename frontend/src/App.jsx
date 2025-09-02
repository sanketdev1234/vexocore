import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './components/Home.jsx';
import './App.css';
import Navbar from './components/Navbar.jsx';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Example logout handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };
useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/userstatus', {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setIsAuthenticated(true);
        setUser(data);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    }
  };
  fetchUser();
}, []);

  return (
    <Router>
          <Navbar
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
      />
      <Home />
    </Router>
  );
}

export default App;
