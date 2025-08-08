import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { City } from '@/types';

// State interface
export interface AppState {
  allCities: City[];
  cities: City[];
  loading: boolean;
  error: string | null;
  success: string | null;
  searchTerm: string;
  isInitialized: boolean;
  formOpen: boolean;
  editingCity: City | null;
  hasSearched: boolean;
  lastSearchQuery: string;
}

// Action types
type AppAction =
  | { type: 'SET_ALL_CITIES'; payload: City[] }
  | { type: 'SET_CITIES'; payload: City[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SUCCESS'; payload: string | null }
  | { type: 'SET_FORM_OPEN'; payload: boolean }
  | { type: 'SET_EDITING_CITY'; payload: City | null }
  | { type: 'SET_HAS_SEARCHED'; payload: boolean }
  | { type: 'SET_LAST_SEARCH_QUERY'; payload: string }
  | { type: 'SET_INITIALIZED'; payload: boolean }
  | { type: 'CLEAR_MESSAGES' }
  | { type: 'RESET_SEARCH' };

// Initial state
const initialState: AppState = {
  allCities: [],
  cities: [],
  loading: true,
  error: null,
  success: null,
  searchTerm: '',
  isInitialized: false,
  formOpen: false,
  editingCity: null,
  hasSearched: false,
  lastSearchQuery: '',
};

// Reducer
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_ALL_CITIES':
      return { 
        ...state, 
        allCities: action.payload,
        cities: action.payload,
        isInitialized: true,
        loading: false
      };
    case 'SET_CITIES':
      return { ...state, cities: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_SUCCESS':
      return { ...state, success: action.payload };
    case 'SET_FORM_OPEN':
      return { ...state, formOpen: action.payload };
    case 'SET_EDITING_CITY':
      return { ...state, editingCity: action.payload };
    case 'SET_HAS_SEARCHED':
      return { ...state, hasSearched: action.payload };
    case 'SET_LAST_SEARCH_QUERY':
      return { ...state, lastSearchQuery: action.payload };
    case 'SET_INITIALIZED':
      return { ...state, isInitialized: action.payload };
    case 'CLEAR_MESSAGES':
      return { ...state, error: null, success: null };
    case 'RESET_SEARCH':
      return { 
        ...state, 
        cities: state.allCities,
        hasSearched: false, 
        lastSearchQuery: '',
        error: null 
      };
    default:
      return state;
  }
};

// Context type
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
