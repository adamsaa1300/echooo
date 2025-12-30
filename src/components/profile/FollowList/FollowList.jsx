// src/components/profile/FollowList/FollowList.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  Divider,
  Stack
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// بيانات مؤقتة - ممكن نغيرها بداتا حقيقية بعدين
const mockUsers = [
  { id: 1, name: 'Ahmad Ali', username: 'ahmad_dev', profilePic: 'https://i.pravatar.cc/300?img=1', isFollowing: true },
  { id: 2, name: 'Sara Mohammed', username: 'sara_design', profilePic: 'https://i.pravatar.cc/300?img=2', isFollowing: false },
  { id: 3, name: 'Omar Khaled', username: 'omar_code', profilePic: 'https://i.pravatar.cc/300?img=3', isFollowing: true },
  { id: 4, name: 'Layla Hassan', username: 'layla_art', profilePic: 'https://i.pravatar.cc/300?img=4', isFollowing: false },
  { id: 5, name: 'Yousef Ibrahim', username: 'yousef_pro', profilePic: 'https://i.pravatar.cc/300?img=5', isFollowing: true },
  { id: 6, name: 'Nour Fatima', username: 'nour_photo', profilePic: 'https://i.pravatar.cc/300?img=6', isFollowing: false },
];

const FollowList = ({ type }) => {
  const [users, setUsers] = useState(mockUsers);

  const title = type === 'following' ? 'People you follow' : 'Your followers';

  // دالة لتبديل حالة المتابعة
  const toggleFollow = (userId) => {
    setUsers(users.map(user =>
      user.id === userId
        ? { ...user, isFollowing: !user.isFollowing }
        : user
    ));
  };

  // فلترة المستخدمين حسب النوع
  const displayedUsers = type === 'following'
    ? users.filter(u => u.isFollowing)
    : users;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5efe6', py: 6 }}>
      <Box sx={{ maxWidth: 'md', mx: 'auto', px: 3 }}>
        <Paper elevation={6} sx={{ borderRadius: 4, overflow: 'hidden' }}>
          {/* الرأس مع زر الرجوع */}
          <Box sx={{ bgcolor: '#f8f3eb', p: 3 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Button
                component={Link}
                to="/"
                startIcon={<ArrowBackIcon />}
                sx={{ color: '#3b2a20' }}
              >
                Back
              </Button>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#3b2a20', flexGrow: 1 }}>
                {title}
              </Typography>
            </Stack>
          </Box>

          <Divider />

          {/* قائمة المستخدمين */}
          {displayedUsers.length > 0 ? (
            <List>
              {displayedUsers.map((user) => (
                <React.Fragment key={user.id}>
                  <ListItem
                    secondaryAction={
                      type === 'following' ? (
                        <Button
                          variant="outlined"
                          onClick={() => toggleFollow(user.id)}
                          sx={{
                            borderRadius: 50,
                            borderColor: '#3b2a20',
                            color: '#3b2a20',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            px: 4
                          }}
                        >
                          Following
                        </Button>
                      ) : (
                        <Button
                          variant={user.isFollowing ? 'outlined' : 'contained'}
                          onClick={() => toggleFollow(user.id)}
                          sx={{
                            borderRadius: 50,
                            textTransform: 'none',
                            fontWeight: 'bold',
                            px: 4,
                            bgcolor: user.isFollowing ? 'transparent' : '#3b2a20',
                            borderColor: '#3b2a20',
                            color: user.isFollowing ? '#3b2a20' : '#f8f3eb',
                            '&:hover': {
                              bgcolor: user.isFollowing ? 'rgba(59,42,32,0.1)' : '#3b2a20'
                            }
                          }}
                        >
                          {user.isFollowing ? 'Following' : 'Follow'}
                        </Button>
                      )
                    }
                    sx={{ px: 3, py: 2 }}
                  >
                    <ListItemAvatar>
                      <Avatar src={user.profilePic} alt={user.name} sx={{ width: 56, height: 56 }} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          {user.name}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body2" color="text.secondary">
                          @{user.username}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          ) : (
            <Box sx={{ p: 8, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                No {type === 'following' ? 'people you follow' : 'followers'} yet.
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default FollowList;