// src/components/editProfile/InterestsSection/InterestsSection.jsx
import React from 'react';
import { Box, Typography, TextField, Chip, Stack, FormControlLabel, Checkbox } from '@mui/material';

const InterestsSection = ({ 
  interests, 
  setInterests, 
  interestInput, 
  setInterestInput, 
  privacy, 
  setPrivacy 
}) => {
  // دالة لإضافة اهتمام جديد لما المستخدم يضغط Enter
  const handleAddInterest = (e) => {
    if (e.key === 'Enter' && interestInput.trim()) {
      e.preventDefault(); // عشان ما يعملش سطر جديد
      const newInterest = interestInput.trim();
      if (!interests.includes(newInterest)) {
        setInterests([...interests, newInterest]);
      }
      setInterestInput(''); // نمسح الحقل
    }
  };

  // دالة لحذف اهتمام
  const handleRemoveInterest = (interestToRemove) => {
    setInterests(interests.filter(item => item !== interestToRemove));
  };

  return (
    <Box>
      {/* عنوان القسم */}
      <Typography variant="h6" gutterBottom sx={{ color: '#3b2a20', fontWeight: 'bold' }}>
        Interests
      </Typography>

      {/* الصندوق اللي فيه التاجات والإنبوت */}
      <Box
        sx={{
          border: '2px solid rgba(59, 42, 32, 0.3)',
          borderRadius: 3,
          p: 2,
          bgcolor: 'rgba(248, 243, 235, 0.5)'
        }}
      >
        {/* التاجات (الاهتمامات المضافة) */}
        <Stack direction="row" flexWrap="wrap" gap={1} mb={2}>
          {interests.map((interest, index) => (
            <Chip
              key={index}
              label={interest}
              onDelete={() => handleRemoveInterest(interest)}
              sx={{
                bgcolor: '#3b2a20',
                color: '#f8f3eb',
                fontWeight: 'medium'
              }}
            />
          ))}
        </Stack>

        {/* حقل الكتابة */}
        <TextField
          fullWidth
          value={interestInput}
          onChange={(e) => setInterestInput(e.target.value)}
          onKeyDown={handleAddInterest}
          placeholder="Type and press Enter to add..."
          variant="standard"
          InputProps={{
            disableUnderline: true // عشان يبدو زي إنبوت عادي داخل الصندوق
          }}
          sx={{ mt: 1 }}
        />
      </Box>

      {/* خيار الخصوصية */}
      <FormControlLabel
        control={
          <Checkbox
            checked={privacy.interests || false}
            onChange={(e) => setPrivacy({ ...privacy, interests: e.target.checked })}
          />
        }
        label="Show on profile"
        sx={{ mt: 2 }}
      />
    </Box>
  );
};

export default InterestsSection;