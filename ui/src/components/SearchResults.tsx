import React from 'react';
import { Box, Typography } from '@mui/material';
import { useAppContext } from '@/context/AppContext';
import { useCitiesActions } from '@/hooks/useCitiesActions';
import { CityList } from '@/components';

const SearchResults: React.FC = () => {
  const { state } = useAppContext();
  const { openEditForm, refreshSearch } = useCitiesActions();

  if (!state.hasSearched) {
    return null;
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Search Results ({state.cities.length} cities found)
      </Typography>
      <CityList
        cities={state.cities}
        onEditCity={openEditForm}
        onRefresh={refreshSearch}
      />
    </Box>
  );
};

export default SearchResults;
