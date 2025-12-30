// src/components/editProfile/BirthdatePicker/BirthdatePicker.jsx
import React from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Stack
} from '@mui/material';

// قوائم الأيام والشهور والسنين
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

const BirthdatePicker = ({
  day,
  setDay,
  month,
  setMonth,
  year,
  setYear,
  privacy,
  setPrivacy
}) => {
  return (
    <Box>
      {/* عنوان القسم */}
      <Typography variant="h6" gutterBottom sx={{ color: '#3b2a20', fontWeight: 'bold' }}>
        Birthdate
      </Typography>

      {/* اختيار اليوم والشهر والسنة */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={2}>
        {/* اختيار اليوم */}
        <FormControl fullWidth>
          <InputLabel>Day</InputLabel>
          <Select
            value={day || ''}
            onChange={(e) => setDay(e.target.value)}
            label="Day"
          >
            <MenuItem value=""><em>Day</em></MenuItem>
            {days.map((d) => (
              <MenuItem key={d} value={d}>
                {d}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* اختيار الشهر */}
        <FormControl fullWidth>
          <InputLabel>Month</InputLabel>
          <Select
            value={month || ''}
            onChange={(e) => setMonth(e.target.value)}
            label="Month"
          >
            <MenuItem value=""><em>Month</em></MenuItem>
            {months.map((m) => (
              <MenuItem key={m} value={m}>
                {m}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* اختيار السنة */}
        <FormControl fullWidth>
          <InputLabel>Year</InputLabel>
          <Select
            value={year || ''}
            onChange={(e) => setYear(e.target.value)}
            label="Year"
          >
            <MenuItem value=""><em>Year</em></MenuItem>
            {years.map((y) => (
              <MenuItem key={y} value={y}>
                {y}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {/* خيار إظهار العمر */}
      <FormControlLabel
        control={
          <Checkbox
            checked={privacy.birthdate || false} // لو privacy null مش هيحصل خطأ
            onChange={(e) =>
              setPrivacy({ ...privacy, birthdate: e.target.checked })
            }
          />
        }
        label="Show age on profile"
      />
    </Box>
  );
};

export default BirthdatePicker;