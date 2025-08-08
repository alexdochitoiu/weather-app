import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const LoadingSpinner: React.FC = () => {
  return (
    <Box display="flex" justifyContent="center" py={4}>
      <CircularProgress />
    </Box>
  );
};

export default LoadingSpinner;
