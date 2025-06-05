import React, { useEffect, useState } from 'react'
import { AppBar, Button, Toolbar, Typography} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    }, [location]);

    const handleLogout = () =>{
      localStorage.removeItem("token");
      setIsAuthenticated(false); //masquer le bouton
      navigate("/login");
    };

    const isLoginPage = location.pathname === "/login"
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
            <Typography
                variant="h6"
                component="div"
                onClick={() => navigate('/')}
                sx={{ flexGrow: 1, cursor: 'pointer' }}>
                    IM
            </Typography>
            {isAuthenticated && !isLoginPage &&(
              <Button variant="contained" onClick={handleLogout}>Se déconnecter</Button>
            )}
        {/* <Button color="inherit" onClick={() => navigate('/login')}>Connexion</Button>
        <Button color="inherit" onClick={() => navigate('/register')}>Inscription</Button> */}
        </Toolbar>
    </AppBar>
  )
}

export default Header