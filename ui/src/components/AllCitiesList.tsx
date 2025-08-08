import React from 'react';
import { Box, Typography } from '@mui/material';
import { useAppContext } from '@/context/AppContext';
import { useCitiesActions } from '@/hooks/useCitiesActions';
import { CityList } from '@/components';

const AllCitiesList: React.FC = () => {
  const { state } = useAppContext();
  const { openEditForm, refreshAllCities } = useCitiesActions();

  if (state.hasSearched) {
    return null;
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        All Cities ({state.cities.length} cities)
      </Typography>
      <CityList
        cities={state.cities}
        onEditCity={openEditForm}
        onRefresh={refreshAllCities}
      />
    </Box>
  );
};

export default AllCitiesList;
