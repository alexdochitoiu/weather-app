import React from 'react';
import { Box, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useCitiesActions } from '@/hooks/useCitiesActions';

const CityToolbar: React.FC = () => {
  const { openAddForm } = useCitiesActions();

  return (
    <Box sx={{ mb: 3 }}>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={openAddForm}
        size="large"
      >
        Add New City
      </Button>
    </Box>
  );
};

export default CityToolbar;
