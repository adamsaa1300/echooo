// src/components/editProfile/EditProfileHeader/EditProfileHeader.jsx
import React from 'react';
import { Box, Avatar, IconButton, Typography } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const EditProfileHeader = ({ profilePic, setProfilePic, currentUser }) => {
  // دالة بسيطة لتغيير الصورة
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result); // نحدث الصورة مباشرة
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ textAlign: 'center', my: 5 }}>
      {/* الصورة مع زر الكاميرا فوقها */}
      <Box sx={{ position: 'relative', display: 'inline-block' }}>
        {/* الصورة الشخصية */}
        <Avatar
          src={profilePic || currentUser?.profilePic || 'https://i.pravatar.cc/300?img=68'}
          alt="Profile picture"
          sx={{
            width: 140,
            height: 140,
            border: '6px solid #f8f3eb',
            boxShadow: 3
          }}
        />

        {/* زر الكاميرا */}
        <IconButton
          component="label"
          sx={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            bgcolor: 'rgba(0,0,0,0.6)',
            color: 'white',
            width: 48,
            height: 48,
            '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' }
          }}
        >
          <CameraAltIcon fontSize="large" />
          {/* input مخفي لاختيار الصورة */}
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileChange}
          />
        </IconButton>
      </Box>

      {/* نص صغير تحت الصورة */}
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Click the camera to change photo
      </Typography>
    </Box>
  );
};

export default EditProfileHeader;