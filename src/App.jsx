// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import FollowList from './components/profile/FollowList/FollowList';

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Container,
  CssBaseline,
  CircularProgress
} from '@mui/material';

import {
  Home,
  Person,
  ChatBubbleOutline,
  NotificationsOutlined,
  SettingsOutlined,
  Search
} from '@mui/icons-material';

import './App.css'; // خليناه بس للخلفية العامة

function App() {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  // جلب بيانات اليوزر من الـ API
  React.useEffect(() => {
    fetch('http://localhost:3001/user')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch user');
        return res.json();
      })
      .then(data => {
        // نصلح البوستس لو في حاجة ناقصة
        const fixedPosts = (data.posts || []).map(post => ({
          ...post,
          replies: post.replies || [],
          comments: post.comments || post.replies?.length || 0,
          retweets: post.retweets || 0,
          retweetedByMe: post.retweetedByMe || false,
          likedByMe: post.likedByMe || false,
        }));

        setCurrentUser({ ...data, posts: fixedPosts });
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading user:', err);
        setLoading(false);
      });
  }, []);

  // دالة لتحديث اليوزر
  const updateUser = (updated) => {
    setCurrentUser(updated);
    fetch('http://localhost:3001/user', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    }).catch(err => console.error('Error updating user:', err));
  };

  // شاشة التحميل
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          bgcolor: '#f5efe6'
        }}
      >
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2, color: '#3b2a20' }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  return (
    <Router>
      <CssBaseline />
      <Box className="app-container">
        {/* الـ Navbar الثابت */}
        <AppBar position="fixed" color="transparent" elevation={1}>
          <Toolbar>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3b2a20' }}>
              Echooo
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

            {/* الأيقونات */}
            <IconButton component={Link} to="/" color="inherit">
              <Home />
            </IconButton>

            <IconButton component={Link} to="/" color="primary">
              <Person sx={{ fontSize: 28 }} />
            </IconButton>

            <IconButton color="inherit">
              <ChatBubbleOutline />
            </IconButton>

            <IconButton color="inherit">
              <NotificationsOutlined />
            </IconButton>

            <IconButton color="inherit">
              <SettingsOutlined />
            </IconButton>

            {/* البحث يختفي على الموبايل */}
            <IconButton color="inherit" sx={{ display: { xs: 'none', md: 'block' } }}>
              <Search />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* المحتوى الرئيسي */}
        <Container maxWidth="lg" sx={{ mt: 10, pb: 4 }}>
          <Routes>
            <Route path="/" element={<Profile currentUser={currentUser} updateUser={updateUser} />} />
            <Route path="/edit-profile" element={<EditProfile currentUser={currentUser} updateUser={updateUser} />} />
            <Route path="/following" element={<FollowList type="following" />} />
            <Route path="/followers" element={<FollowList type="followers" />} />
            <Route path="*" element={<Profile currentUser={currentUser} updateUser={updateUser} />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

export default App;