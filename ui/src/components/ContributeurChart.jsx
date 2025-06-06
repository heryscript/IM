import React from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, Paper
} from '@mui/material';

const data = [
  { name: 'Actifs', value: 1 },
  { name: 'En attente', value: 2 },
  { name: 'Partis', value: 1 },
];

const COLORS = ['#4caf50', '#ff9800', '#f44336'];

const rows = [
  { nom: 'monicarandria@gmail.com', poste: 'RH',statut: 'Actif' },
  { nom: 'ericnomenjanahary11@gmail.com', poste:"Developpeur Java", statut: 'En attente' },
  { nom: 'fanasinjaka18@gmail.com', poste:"Developpeur IA", statut: 'Parti' },
  { nom: 'Tirindrafale@gmail.com',poste:"Integrateur", statut: 'Actif' },
  { nom: 'Emma78@gmail.com',poste:"Assistante" ,statut: 'En attente' },
];

const ContributeurChart = () => {
  return (
    <Box sx={{ width: '100%', mt: 4 }}>
      <Typography variant="h6" align="center" gutterBottom>
        Répartition des contributeurs
      </Typography>

      <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {/* Table à gauche */}
        <Paper elevation={2} sx={{ flex: 1, minWidth: 300 }}>
          <Typography variant="subtitle1" sx={{ p: 2 }}>
            Détail des contributeurs
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Statut</strong></TableCell>
                <TableCell><strong>Poste</strong></TableCell>   
                
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.nom}</TableCell>
                  <TableCell>{row.statut}</TableCell>
                  <TableCell>{row.poste}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        {/* Graphique à droite */}
        <Box sx={{ flex: 1, minWidth: 300, height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
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
      </Box>
    </Box>
  );
};

export default ContributeurChart;
