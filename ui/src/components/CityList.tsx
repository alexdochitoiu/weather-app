import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  Rating,
  Chip,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { City } from '@/types';
import { citiesService } from '@/services';

interface CityListProps {
  cities: City[];
  onEditCity: (city: City) => void;
  onRefresh: () => void;
}

const CityList: React.FC<CityListProps> = ({ cities, onEditCity, onRefresh }) => {
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
      onRefresh();
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

  const formatNumber = (num: number | undefined): string => {
    if (!num) return 'N/A';
    return new Intl.NumberFormat().format(num);
  };

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  if (cities.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
        bgcolor="grey.50"
        borderRadius={1}
      >
        <Typography variant="h6" color="text.secondary">
          No cities found. Try a different search term or add a new city.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        {cities.map((city) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={city.id}>
            <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="div" gutterBottom>
                  {city.name}
                </Typography>
                
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  {city.state ? `${city.state}, ${city.country}` : city.country}
                </Typography>

                {city.tourist_rating && (
                  <Box sx={{ mb: 2 }}>
                    <Typography component="legend" variant="body2">
                      Tourist Rating
                    </Typography>
                    <Rating value={city.tourist_rating} readOnly />
                  </Box>
                )}

                <Box sx={{ mb: 1 }}>
                  <Chip
                    label={`Population: ${formatNumber(city.estimated_population)}`}
                    variant="outlined"
                    size="small"
                    sx={{ mr: 1, mb: 1 }}
                  />
                  {city.date_established && (
                    <Chip
                      label={`Est. ${formatDate(city.date_established)}`}
                      variant="outlined"
                      size="small"
                      sx={{ mb: 1 }}
                    />
                  )}
                </Box>
              </CardContent>

              <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
                <Button
                  startIcon={<EditIcon />}
                  onClick={() => onEditCity(city)}
                  size="small"
                >
                  Edit
                </Button>
                <Button
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDeleteClick(city)}
                  color="error"
                  size="small"
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
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

export default CityList;
