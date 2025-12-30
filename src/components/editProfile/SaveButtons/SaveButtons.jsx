// src/components/editProfile/SaveButtons/SaveButtons.jsx
import React from 'react';
import { Stack, Button } from '@mui/material';

const SaveButtons = ({ onSave, onCancel }) => {
  // كومبوننت بسيط فيه زرين: إلغاء وحفظ التغييرات
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }} // عمودي على الموبايل، أفقي على الشاشات الكبيرة
      justifyContent="flex-end"
      spacing={2}
      mt={5}
    >
      {/* زر الإلغاء - يرجع للصفحة السابقة */}
      <Button
        variant="outlined"
        size="large"
        onClick={onCancel || (() => window.history.back())} // لو مفيش onCancel نستخدم history.back
        sx={{
          borderRadius: 50,
          borderColor: '#3b2a20',
          color: '#3b2a20',
          textTransform: 'none',
          fontWeight: 'bold',
          px: 5,
          minWidth: 180
        }}
      >
        Cancel
      </Button>

      {/* زر الحفظ - ينفذ الدالة onSave */}
      <Button
        variant="contained"
        size="large"
        onClick={onSave}
        sx={{
          borderRadius: 50,
          bgcolor: '#3b2a20',
          color: '#f8f3eb',
          textTransform: 'none',
          fontWeight: 'bold',
          px: 6,
          minWidth: 200,
          boxShadow: 3,
          '&:hover': {
            bgcolor: '#2d2018'
          }
        }}
      >
        Save Changes
      </Button>
    </Stack>
  );
};

export default SaveButtons;