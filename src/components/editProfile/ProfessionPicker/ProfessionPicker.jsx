// src/components/editProfile/ProfessionPicker/ProfessionPicker.jsx
import React from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox, Stack } from '@mui/material';
import BriefcaseIcon from '@mui/icons-material/Briefcase';

const professions = [
  'Full Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'UI/UX Designer',
  'Data Scientist',
  'Student',
  'Other'
];

const ProfessionPicker = ({ profession, setProfession, privacy, setPrivacy }) => {
  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1} mb={1}>
        <BriefcaseIcon sx={{ color: '#3b2a20' }} />
        <Typography variant="h6" sx={{ color: '#3b2a20', fontWeight: 'bold' }}>
          Profession
        </Typography>
      </Stack>

      <FormControl fullWidth>
        <InputLabel>Profession</InputLabel>
        <Select
          value={profession || ''}
          onChange={(e) => setProfession(e.target.value)}
          label="Profession"
        >
          <MenuItem value=""><em>Select profession</em></MenuItem>
          {professions.map((p) => (
            <MenuItem key={p} value={p}>
              {p}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControlLabel
        control={
          <Checkbox
            checked={privacy.profession || false}
            onChange={(e) => setPrivacy({ ...privacy, profession: e.target.checked })}
          />
        }
        label="Show on profile"
        sx={{ mt: 2 }}
      />
    </Box>
  );
};

export default ProfessionPicker;