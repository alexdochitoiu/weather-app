import React from 'react';
import { Paper, Divider } from '@mui/material';
import { useAppContext } from '@/context/AppContext';
import ConnectedSearchBar from './ConnectedSearchBar';
import CityToolbar from './CityToolbar';
import LoadingSpinner from './LoadingSpinner';
import SearchResults from './SearchResults';
import AllCitiesList from './AllCitiesList';
import WelcomeMessage from './WelcomeMessage';

const MainContent: React.FC = () => {
  const { state } = useAppContext();

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
      {/* Search Section */}
      <ConnectedSearchBar />

      <Divider sx={{ my: 3 }} />

      {/* Add City Button */}
      <CityToolbar />

      {/* Loading State */}
      {state.loading && <LoadingSpinner />}

      {/* Search Results Section */}
      {!state.loading && <SearchResults />}

      {/* All Cities Section */}
      {!state.loading && <AllCitiesList />}

      {/* Welcome Message - shown when no cities exist */}
      {!state.loading && <WelcomeMessage />}
    </Paper>
  );
};

export default MainContent;
