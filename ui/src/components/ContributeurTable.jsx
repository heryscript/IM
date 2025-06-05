import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ContributeurTable = ({ users = [], onView, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Liste des contributeurs
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Prénom</TableCell>
            <TableCell>Nom</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Fonction</TableCell>
            <TableCell>Organisation</TableCell>
            <TableCell>GitHub</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.firstname}</TableCell>
                <TableCell>{user.lastname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.function}</TableCell>
                <TableCell>{user.organisation}</TableCell>
                <TableCell>{user.githubUsername}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <IconButton
                      aria-label="voir"
                      color="primary"
                      onClick={() => onView && onView(user)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      aria-label="modifier"
                      color="secondary"
                      onClick={() => onEdit && onEdit(user)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="supprimer"
                      color="error"
                      onClick={() => onDelete && onDelete(user.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} align="center">
                Aucun utilisateur trouvé.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ContributeurTable;
