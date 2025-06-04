import React from 'react'
import { AppBar, Toolbar, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
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
        {/* <Button color="inherit" onClick={() => navigate('/login')}>Connexion</Button>
        <Button color="inherit" onClick={() => navigate('/register')}>Inscription</Button> */}
        </Toolbar>
    </AppBar>
  )
}

export default Header