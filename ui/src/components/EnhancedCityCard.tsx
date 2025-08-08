import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Rating,
  Chip,
  Box,
  Avatar,
  Divider,
  Grid,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Thermostat as TempIcon,
  Water as HumidityIcon,
  Air as WindIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { City } from '@/types';

interface EnhancedCityCardProps {
  city: City;
  onEditCity: (city: City) => void;
  onDeleteCity: (city: City) => void;
}

const EnhancedCityCard: React.FC<EnhancedCityCardProps> = ({
  city,
  onEditCity,
  onDeleteCity,
}) => {
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

  const formatTemperature = (temp: number): string => {
    return `${Math.round(temp)}°C`;
  };

  return (
    <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        {/* Header with Flag and City Name */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {city.flag && (
            <Avatar
              src={city.flag}
              alt={`${city.country} flag`}
              sx={{ width: 32, height: 24, mr: 2 }}
              variant="rounded"
            />
          )}
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h5" component="div">
              {city.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
              <LocationIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
              <Typography variant="subtitle2" color="text.secondary">
                {city.state ? `${city.state}, ${city.country}` : city.country}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Country Codes and Currency */}
        <Box sx={{ mb: 2 }}>
          {city.country_code_2 && (
            <Chip
              label={city.country_code_2}
              size="small"
              variant="outlined"
              sx={{ mr: 1 }}
            />
          )}
          {city.country_code_3 && (
            <Chip
              label={city.country_code_3}
              size="small"
              variant="outlined"
              sx={{ mr: 1 }}
            />
          )}
          {city.currency_code && (
            <Chip
              label={city.currency_code}
              size="small"
              color="primary"
              variant="outlined"
            />
          )}
        </Box>

        {/* Tourist Rating */}
        {city.tourist_rating && (
          <Box sx={{ mb: 2 }}>
            <Typography component="legend" variant="body2" sx={{ mb: 0.5 }}>
              Tourist Rating
            </Typography>
            <Rating value={city.tourist_rating} readOnly size="small" />
          </Box>
        )}

        {/* Weather Information */}
        {city.weather && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 1 }}>
              Current Weather
            </Typography>
            <Box sx={{ 
              bgcolor: 'primary.light', 
              color: 'primary.contrastText',
              p: 1.5, 
              borderRadius: 2,
              mb: 1 
            }}>
              <Grid container spacing={2} alignItems="center">
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <TempIcon sx={{ fontSize: 20, mr: 1 }} />
                    <Typography variant="h6">
                      {formatTemperature(city.weather.temperature)}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                    {city.weather.description}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <HumidityIcon sx={{ fontSize: 16, mr: 0.5 }} />
                    <Typography variant="body2">
                      {city.weather.humidity}%
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <WindIcon sx={{ fontSize: 16, mr: 0.5 }} />
                    <Typography variant="body2">
                      {city.weather.wind_speed} m/s
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}

        <Divider sx={{ my: 2 }} />

        {/* City Details */}
        <Box>
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
          onClick={() => onDeleteCity(city)}
          color="error"
          size="small"
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default EnhancedCityCard;
