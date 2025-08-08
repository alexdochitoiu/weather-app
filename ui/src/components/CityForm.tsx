import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Rating,
  Typography,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import { City, CityCreate, CityUpdate } from '@/types';
import { citiesService } from '@/services';

interface CityFormProps {
  open: boolean;
  onClose: () => void;
  city?: City | null;
  onSuccess: () => void;
}

const CityForm: React.FC<CityFormProps> = ({ open, onClose, city, onSuccess }) => {
  const [formData, setFormData] = useState<CityCreate>({
    name: '',
    state: '',
    country: '',
    tourist_rating: undefined,
    date_established: '',
    estimated_population: undefined,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEdit = Boolean(city);

  useEffect(() => {
    if (city) {
      setFormData({
        name: city.name,
        state: city.state || '',
        country: city.country,
        tourist_rating: city.tourist_rating,
        date_established: city.date_established || '',
        estimated_population: city.estimated_population,
      });
    } else {
      setFormData({
        name: '',
        state: '',
        country: '',
        tourist_rating: undefined,
        date_established: '',
        estimated_population: undefined,
      });
    }
    setError(null);
  }, [city, open]);

  const handleInputChange = (field: keyof CityCreate) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value === '' ? undefined : value,
    }));
  };

  const handleNumberChange = (field: 'tourist_rating' | 'estimated_population') => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value === '' ? undefined : Number(value),
    }));
  };

  const handleRatingChange = (newValue: number | null) => {
    setFormData(prev => ({
      ...prev,
      tourist_rating: newValue || undefined,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isEdit && city) {
        // For edit, only send the updatable fields
        const updateData: CityUpdate = {
          tourist_rating: formData.tourist_rating,
          date_established: formData.date_established || undefined,
          estimated_population: formData.estimated_population,
        };
        await citiesService.updateCity(city.id, updateData);
      } else {
        // For create, send all fields
        await citiesService.createCity({
          ...formData,
          date_established: formData.date_established || undefined,
        });
      }
      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            {isEdit ? `Edit ${city?.name}` : 'Add New City'}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="City Name"
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  required
                  disabled={isEdit || loading}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="State/Province"
                  value={formData.state}
                  onChange={handleInputChange('state')}
                  disabled={isEdit || loading}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Country"
                  value={formData.country}
                  onChange={handleInputChange('country')}
                  required
                  disabled={isEdit || loading}
                />
              </Grid>
              <Grid size={12}>
                <Box>
                  <Typography component="legend">Tourist Rating</Typography>
                  <Rating
                    name="tourist-rating"
                    value={formData.tourist_rating || 0}
                    onChange={(_, newValue) => handleRatingChange(newValue)}
                    disabled={loading}
                  />
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Date Established"
                  type="date"
                  value={formData.date_established}
                  onChange={handleInputChange('date_established')}
                  disabled={loading}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Estimated Population"
                  type="number"
                  value={formData.estimated_population || ''}
                  onChange={handleNumberChange('estimated_population')}
                  disabled={loading}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} disabled={loading}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading || !formData.name.trim() || !formData.country.trim()}
            >
              {loading ? 'Saving...' : (isEdit ? 'Update' : 'Create')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

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

export default CityForm;
