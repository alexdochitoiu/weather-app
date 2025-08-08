import { useCallback, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import { citiesService } from '@/services';
import { City } from '@/types';

export const useCitiesActions = () => {
  const { state, dispatch } = useAppContext();

  // Load all cities on initialization
  const loadAllCities = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const allCities = await citiesService.getAllCities();
      dispatch({ type: 'SET_ALL_CITIES', payload: allCities });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load cities';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [dispatch]);

  // Initialize data on first load
  useEffect(() => {
    if (!state.isInitialized) {
      loadAllCities();
    }
  }, [state.isInitialized, loadAllCities]);

  const searchCities = useCallback(async (query: string) => {
    if (!query.trim()) {
      // Reset to show all cities
      dispatch({ type: 'RESET_SEARCH' });
      return;
    }

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const results = await citiesService.searchCities(query);
      dispatch({ type: 'SET_CITIES', payload: results });
      dispatch({ type: 'SET_HAS_SEARCHED', payload: true });
      dispatch({ type: 'SET_LAST_SEARCH_QUERY', payload: query });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to search cities';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      dispatch({ type: 'SET_CITIES', payload: [] });
      dispatch({ type: 'SET_HAS_SEARCHED', payload: true });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [dispatch]);

  const refreshSearch = useCallback(async () => {
    if (state.lastSearchQuery) {
      await searchCities(state.lastSearchQuery);
    } else {
      // Reload all cities
      await loadAllCities();
    }
  }, [state.lastSearchQuery, searchCities, loadAllCities]);

  const refreshAllCities = useCallback(async () => {
    await loadAllCities();
    if (!state.hasSearched) {
      dispatch({ type: 'RESET_SEARCH' });
    }
  }, [loadAllCities, state.hasSearched, dispatch]);

  const openAddForm = useCallback(() => {
    dispatch({ type: 'SET_EDITING_CITY', payload: null });
    dispatch({ type: 'SET_FORM_OPEN', payload: true });
  }, [dispatch]);

  const openEditForm = useCallback((city: City) => {
    dispatch({ type: 'SET_EDITING_CITY', payload: city });
    dispatch({ type: 'SET_FORM_OPEN', payload: true });
  }, [dispatch]);

  const closeForm = useCallback(() => {
    dispatch({ type: 'SET_FORM_OPEN', payload: false });
    dispatch({ type: 'SET_EDITING_CITY', payload: null });
  }, [dispatch]);

  const handleFormSuccess = useCallback(() => {
    const isEdit = Boolean(state.editingCity);
    const message = isEdit ? 'City updated successfully!' : 'City created successfully!';
    dispatch({ type: 'SET_SUCCESS', payload: message });
    
    // Refresh the data - if searching, refresh search, otherwise refresh all
    if (state.hasSearched && state.lastSearchQuery) {
      refreshSearch();
    } else {
      refreshAllCities();
    }
  }, [state.editingCity, state.hasSearched, state.lastSearchQuery, refreshSearch, refreshAllCities, dispatch]);

  const clearMessages = useCallback(() => {
    dispatch({ type: 'CLEAR_MESSAGES' });
  }, [dispatch]);

  const clearError = useCallback(() => {
    dispatch({ type: 'SET_ERROR', payload: null });
  }, [dispatch]);

  const clearSuccess = useCallback(() => {
    dispatch({ type: 'SET_SUCCESS', payload: null });
  }, [dispatch]);

  return {
    loadAllCities,
    searchCities,
    refreshSearch,
    refreshAllCities,
    openAddForm,
    openEditForm,
    closeForm,
    handleFormSuccess,
    clearMessages,
    clearError,
    clearSuccess,
  };
};
