import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { useAppContext } from '@/context/AppContext';
import { useCitiesActions } from '@/hooks/useCitiesActions';
import { EnhancedCityCard } from '@/components';
import { City } from '@/types';
import { citiesService } from '@/services';

const EnhancedSearchResults: React.FC = () => {
  const { state } = useAppContext();
  const { openEditForm, refreshSearch } = useCitiesActions();
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; city: City | null }>({
    open: false,
    city: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleDeleteClick = (city: City) => {
    setDeleteDialog({ open: true, city });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.city) return;

    setLoading(true);
    setError(null);

    try {
      await citiesService.deleteCity(deleteDialog.city.id);
      setSuccess(`${deleteDialog.city.name} has been deleted successfully!`);
      refreshSearch();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete city');
    } finally {
      setLoading(false);
      setDeleteDialog({ open: false, city: null });
    }
  };

  const handleDeleteCancel = () => {
    if (!loading) {
      setDeleteDialog({ open: false, city: null });
    }
  };

  if (!state.hasSearched) {
    return null;
  }

  if (state.cities.length === 0) {
    return (
      <Box>
        <Typography variant="h5" gutterBottom>
          Search Results
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="200px"
          bgcolor="grey.50"
          borderRadius={1}
        >
          <Typography variant="h6" color="text.secondary">
            No cities found. Try a different search term.
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Enhanced Search Results
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Found {state.cities.length} cities with detailed information including weather data and country details
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {state.cities.map((city) => (
          <Grid size={{ xs: 12, md: 6, lg: 4 }} key={city.id}>
            <EnhancedCityCard
              city={city}
              onEditCity={openEditForm}
              onDeleteCity={handleDeleteClick}
            />
          </Grid>
        ))}
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog.open} onClose={handleDeleteCancel}>
        <DialogTitle>Delete City</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete <strong>{deleteDialog.city?.name}</strong>?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={!!success}
        autoHideDuration={4000}
        onClose={() => setSuccess(null)}
      >
        <Alert onClose={() => setSuccess(null)} severity="success">
          {success}
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert onClose={() => setError(null)} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default EnhancedSearchResults;
