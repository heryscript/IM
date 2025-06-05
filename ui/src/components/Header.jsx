import React, { useEffect, useState } from 'react'
import { AppBar, Button, Toolbar, Typography} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

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
                  <motion.div
          onClick={() => navigate('/')}
          style={{ flexGrow: 1, cursor: 'pointer' }}
          animate={{ scale: [1, 1.02, 1], color: ['#fff', '#e3f2fd', '#fff'] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut'
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 600,
              letterSpacing: '1px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
              display: 'inline-block',
            }}
          >
            You<span style={{ color: '#f50057' }}>dentity</span>
          </Typography>
        </motion.div>
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