import React, { useState } from 'react';
import {
  Paper,
  InputBase,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';

interface SearchBarProps {
  onSearch: (query: string) => void;
  loading?: boolean;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  loading = false,
  placeholder = "Search cities...",
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Search Cities
      </Typography>
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          maxWidth: 500,
        }}
        elevation={2}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          disabled={loading}
        />
        {searchTerm && (
          <IconButton
            type="button"
            sx={{ p: '10px' }}
            aria-label="clear"
            onClick={handleClear}
            disabled={loading}
          >
            <ClearIcon />
          </IconButton>
        )}
        <IconButton
          type="submit"
          sx={{ p: '10px' }}
          aria-label="search"
          disabled={loading || !searchTerm.trim()}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
        Enter a city name to search. Leave empty and search to see all cities.
      </Typography>
    </Box>
  );
};

export default SearchBar;
