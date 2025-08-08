import React from 'react';
import { Typography, Box } from '@mui/material';

const AppHeader: React.FC = () => {
  return (
    <Box sx={{ textAlign: 'center', mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Weather App - Cities Manager
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Search, add, edit, and manage cities for your weather application
      </Typography>
    </Box>
  );
};

export default AppHeader;
