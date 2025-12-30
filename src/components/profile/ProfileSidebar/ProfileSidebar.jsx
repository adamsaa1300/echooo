// src/components/profile/ProfileSidebar/ProfileSidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Paper,
  Avatar,
  Typography,
  Stack,
  Button,
  Divider,
  Chip
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BriefcaseIcon from '@mui/icons-material/Briefcase';
import CakeIcon from '@mui/icons-material/Cake';

const ProfileSidebar = ({ currentUser }) => {
  // حساب العمر من تاريخ الميلاد
  const calculateAge = (birthdate) => {
    if (!birthdate) return null;
    const today = new Date();
    const birth = new Date(birthdate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const age = calculateAge(currentUser.birthdate);

  return (
    <Box sx={{ width: 320, position: 'sticky', top: 100, alignSelf: 'flex-start' }}>
      <Paper elevation={3} sx={{ borderRadius: 4, overflow: 'hidden' }}>
        {/* صورة الملف الشخصي */}
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Avatar
            src={currentUser.profilePic || 'https://i.pravatar.cc/300?img=68'}
            alt={currentUser.name}
            sx={{ width: 120, height: 120, mx: 'auto', border: '4px solid #f8f3eb' }}
          />
        </Box>

        <Divider />

        {/* معلومات المستخدم */}
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#3b2a20' }}>
            {currentUser.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            @{currentUser.username}
          </Typography>

          {currentUser.bio && (
            <Typography variant="body2" sx={{ mb: 3, color: '#4b5563' }}>
              {currentUser.bio}
            </Typography>
          )}

          {/* الإحصائيات */}
          <Stack direction="row" spacing={4} sx={{ mb: 3 }}>
            <Box component={Link} to="/following" sx={{ textDecoration: 'none' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3b2a20' }}>
                {currentUser.following || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Following
              </Typography>
            </Box>
            <Box component={Link} to="/followers" sx={{ textDecoration: 'none' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3b2a20' }}>
                {currentUser.followers || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Followers
              </Typography>
            </Box>
          </Stack>

          {/* زر تعديل الملف */}
          <Button
            component={Link}
            to="/edit-profile"
            variant="contained"
            fullWidth
            sx={{
              borderRadius: 50,
              bgcolor: '#3b2a20',
              textTransform: 'none',
              fontWeight: 'bold',
              py: 1.5,
              mb: 3,
              boxShadow: 3,
              '&:hover': { bgcolor: '#2d2018' }
            }}
          >
            Edit Profile
          </Button>

          <Divider sx={{ my: 2 }} />

          {/* تفاصيل إضافية */}
          <Stack spacing={2}>
            {currentUser.privacy?.location && currentUser.location && (
              <Stack direction="row" spacing={1} alignItems="center">
                <LocationOnIcon sx={{ color: '#6b7280' }} />
                <Typography variant="body2" color="text.secondary">
                  {currentUser.location}
                </Typography>
              </Stack>
            )}

            {currentUser.privacy?.profession && currentUser.profession && (
              <Stack direction="row" spacing={1} alignItems="center">
                <BriefcaseIcon sx={{ color: '#6b7280' }} />
                <Typography variant="body2" color="text.secondary">
                  {currentUser.profession}
                </Typography>
              </Stack>
            )}

            {currentUser.privacy?.birthdate && age && (
              <Stack direction="row" spacing={1} alignItems="center">
                <CakeIcon sx={{ color: '#6b7280' }} />
                <Typography variant="body2" color="text.secondary">
                  {age} years old
                </Typography>
              </Stack>
            )}
          </Stack>

          {/* الاهتمامات */}
          {currentUser.privacy?.interests && currentUser.interests?.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#3b2a20', mb: 1 }}>
                Interests
              </Typography>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {currentUser.interests.map((interest, index) => (
                  <Chip
                    key={index}
                    label={interest}
                    size="small"
                    sx={{
                      bgcolor: '#3b2a20',
                      color: '#f8f3eb',
                      fontWeight: 'bold'
                    }}
                  />
                ))}
              </Stack>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfileSidebar;