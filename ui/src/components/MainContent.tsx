import React from 'react';
import { Paper, Divider } from '@mui/material';
import { useAppContext } from '@/context/AppContext';
import ConnectedSearchBar from './ConnectedSearchBar';
import CityToolbar from './CityToolbar';
import LoadingSpinner from './LoadingSpinner';
import EnhancedSearchResults from './EnhancedSearchResults';
import AllCitiesList from './AllCitiesList';
import WelcomeMessage from './WelcomeMessage';

const MainContent: React.FC = () => {
  const { state } = useAppContext();

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
      <ConnectedSearchBar />

      <Divider sx={{ my: 3 }} />

      <CityToolbar />

      {state.loading && <LoadingSpinner />}

      {!state.loading && <EnhancedSearchResults />}

      {!state.loading && <AllCitiesList />}

      {!state.loading && <WelcomeMessage />}
    </Paper>
  );
};

export default MainContent;
