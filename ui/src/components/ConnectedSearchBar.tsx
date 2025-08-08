import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { useCitiesActions } from '@/hooks/useCitiesActions';
import SearchBar from './SearchBar';

const ConnectedSearchBar: React.FC = () => {
  const { state } = useAppContext();
  const { searchCities } = useCitiesActions();

  return (
    <SearchBar 
      onSearch={searchCities} 
      loading={state.loading}
      placeholder="Search cities..."
    />
  );
};

export default ConnectedSearchBar;
