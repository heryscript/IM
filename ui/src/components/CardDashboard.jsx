import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import ContributeurChart from './ContributeurChart.jsx';
import UserService from '../services/UserService.js';

function CardDashboard() {
  const [data, setData] = useState({
    contributeurs : 0,
    packages: 0,
    utilisateurs : 0,
  });

  useEffect(() => {
    handleFetchUsers();
  }, []);

  const handleFetchUsers = async() =>{
    UserService.findAll()
      .then(res => {
        console.log("Users fetched successfully:", res);
      })
      .catch(err => {
        console.error("Error fetching users:", err);
    });
  }


  const cards = [
    { title: 'Contributeurs', value: '1 254' },
    { title: 'Packages', value: '124' },
    { title: 'Utilisateurs', value: "6" },
  ];

  return (
    <Box  sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
      {cards.map((card, index) => (
        <Card  key={index} 
        sx={{ 
          minWidth: 250,
          flex: 1,
          transition: '0.3s',
          "&:hover": {
            transform: 'scale(1.03)',
            boxShadow : 6,
            backgroundColor: '#f0f4ff',
          },
           }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {card.title}
            </Typography>
            <Typography variant="h4" color="primary">
              {card.value}
            </Typography>
          </CardContent>
        </Card>
      ))}
      <ContributeurChart/>
    </Box>
  );
}

export default CardDashboard;
