// src/components/editProfile/LocationField/LocationField.jsx
import React from 'react';
import { Box, Typography, TextField, FormControlLabel, Checkbox, Stack } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const LocationField = ({ location, setLocation, privacy, setPrivacy }) => {
  // كومبوننت بسيط لحقل الموقع مع خيار الخصوصية
  return (
    <Box>
      {/* العنوان مع الأيقونة */}
      <Stack direction="row" alignItems="center" spacing={1} mb={1}>
        <LocationOnIcon sx={{ color: '#3b2a20' }} />
        <Typography variant="h6" sx={{ color: '#3b2a20', fontWeight: 'bold' }}>
          Location
        </Typography>
      </Stack>

      {/* حقل كتابة الموقع */}
      <TextField
        fullWidth
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="e.g. Amman, Jordan"
        variant="outlined"
        sx={{
          mb: 2,
          '& .MuiOutlinedInput-root': {
            borderRadius: 3,
            bgcolor: '#f8f3eb'
          }
        }}
      />

      {/* خيار إظهار الموقع في البروفايل */}
      <FormControlLabel
        control={
          <Checkbox
            checked={privacy.location || false}
            onChange={(e) =>
              setPrivacy({ ...privacy, location: e.target.checked })
            }
          />
        }
        label="Show on profile"
      />
    </Box>
  );
};

export default LocationField;