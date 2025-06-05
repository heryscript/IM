import React, { useState } from 'react';
import { 
  AppBar, Toolbar, Typography, Drawer, List, ListItem, 
  ListItemIcon, ListItemText, CssBaseline, Box, Container 
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import CardDashboard from '../components/CardDashboard.jsx';
import ContributeurTable from '../components/ContributeurTable.jsx';
const drawerWidth = 200;

function Dashboard() {
  const [selectedMenu, setSelectedMenu] = useState('Dashboard');

  // Fonction pour afficher le contenu selon le menu sélectionné
  const renderContent = () => {
    switch (selectedMenu) {
      case 'Dashboard':
        return (
          <>
            <Typography>Bienvenue dans votre tableau de bord.</Typography>
            <CardDashboard/>
          </>
        );
      case 'Fonctionnalités':
        return (
          <>
            <Typography variant="h4" gutterBottom>Fonctionnalités</Typography>
            <ContributeurTable/>
          </>
        );
      case 'Statistiques':
        return (
          <>
            <Typography variant="h4" gutterBottom>Statistiques</Typography>
            <Typography>Analyse et graphiques.</Typography>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { 
            width: drawerWidth, 
            boxSizing: 'border-box',
            top: '64px', // décale sous AppBar si tu en as un
            height: 'calc(100% - 64px)'
          },
        }}
      >
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {[
              { text: 'Dashboard', icon: <DashboardIcon /> },
              { text: 'Fonctionnalités', icon: <PeopleIcon /> },
              { text: 'Statistiques', icon: <BarChartIcon /> },
            ].map((item) => (
              <ListItem 
                button 
                key={item.text}
                selected={selectedMenu === item.text}
                onClick={() => setSelectedMenu(item.text)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Contenu principal */}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Container sx={{ mt: 2 }}>
          {renderContent()}
        </Container>
      </Box>
    </Box>
  );
}

export default Dashboard;
