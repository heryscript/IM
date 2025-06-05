import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Typography, Box } from '@mui/material';

const data = [
  { name: 'Actifs', value: 60 },
  { name: 'En attente', value: 25 },
  { name: 'Partis', value: 15 },
];

const COLORS = ['#4caf50', 'blue', '#f44336'];

const ContributeurChart = () => {
  return (
    <Box sx={{ width: '100%', mt: 4 }}>
      {/* ✅ Légende générale */}
      <Typography variant="h6" align="center" gutterBottom>
        Répartition des contributeurs
      </Typography>

      <ResponsiveContainer width="50%" height={300}>
        <PieChart>
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
          <Tooltip />
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ContributeurChart;
