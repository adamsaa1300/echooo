// src/components/editProfile/PersonalInfoSection/PersonalInfoSection.jsx
import React from 'react';
import { Box, Typography, TextField, Stack } from '@mui/material';

const PersonalInfoSection = ({ name, setName, username, setUsername, bio, setBio }) => {
  // كومبوننت بسيط للمعلومات الشخصية: الاسم، اسم المستخدم، والبايو
  return (
    <Box>
      {/* عنوان القسم */}
      <Typography variant="h6" gutterBottom sx={{ color: '#3b2a20', fontWeight: 'bold' }}>
        Personal Information
      </Typography>

      {/* الحقول مرتبة مع مسافات بينهم */}
      <Stack spacing={3}>
        {/* حقل الاسم */}
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
          fullWidth
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
              bgcolor: '#f8f3eb'
            }
          }}
        />

        {/* حقل اسم المستخدم */}
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="@username"
          fullWidth
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
              bgcolor: '#f8f3eb'
            }
          }}
        />

        {/* حقل البايو */}
        <TextField
          label="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell us about yourself..."
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
              bgcolor: '#f8f3eb'
            }
          }}
        />
      </Stack>
    </Box>
  );
};

export default PersonalInfoSection;