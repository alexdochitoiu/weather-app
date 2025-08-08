import React from 'react';
import { Box, Typography } from '@mui/material';
import { useAppContext } from '@/context/AppContext';

const WelcomeMessage: React.FC = () => {
  const { state } = useAppContext();

  // Only show welcome message if loading, not initialized, or no cities exist
  if (state.loading || state.hasSearched || (state.isInitialized && state.cities.length > 0)) {
    return null;
  }

  // Show different messages based on state
  if (!state.isInitialized) {
    return null; // Loading will handle this
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      py={6}
      bgcolor="grey.50"
      borderRadius={1}
    >
      <Typography variant="h5" gutterBottom>
        No Cities Found
      </Typography>
      <Typography variant="body1" color="text.secondary" align="center">
        There are no cities in the database yet. Click "Add New City" to add the first city.
      </Typography>
    </Box>
  );
};

export default WelcomeMessage;
