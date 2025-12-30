// src/pages/Profile.jsx
import React from 'react';
import ComposePost from '../components/profile/ComposePost/ComposePost';
import PostItem from '../components/profile/PostItem/PostItem';
import ProfileSidebar from '../components/profile/ProfileSidebar/ProfileSidebar';
import ReplyModal from '../components/profile/ReplyModal/ReplyModal';

import { Box, Grid, Paper, Typography, CircularProgress } from '@mui/material';

const Profile = ({ currentUser, updateUser }) => {
  // كل الـ states في مكان واحد عشان يكون سهل الفهم
  const [newPost, setNewPost] = React.useState('');
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);
  const [selectedPostForReply, setSelectedPostForReply] = React.useState(null);
  const [replyText, setReplyText] = React.useState('');
  const [editingPostId, setEditingPostId] = React.useState(null);
  const [editContent, setEditContent] = React.useState('');
  const [openMenuId, setOpenMenuId] = React.useState(null);
  const [showRepliesFor, setShowRepliesFor] = React.useState({});

  // اختيار صورة للبوست الجديد
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // إنشاء بوست جديد
  const handlePost = () => {
    if (!newPost.trim() && !selectedImage) return;

    const post = {
      id: Date.now(),
      content: newPost,
      image: selectedImage,
      likes: 0,
      likedByMe: false,
      replies: [],
      comments: 0,
      retweets: 0,
      retweetedByMe: false,
      time: 'Just now'
    };

    const updatedUser = {
      ...currentUser,
      posts: [post, ...(currentUser.posts || [])]
    };

    updateUser(updatedUser);

    // تنظيف الحقول بعد النشر
    setNewPost('');
    setSelectedImage(null);
    setShowEmojiPicker(false);
  };

  // تبديل اللايك
  const handleLike = (postId) => {
    const updatedPosts = currentUser.posts.map(post =>
      post.id === postId
        ? { ...post, likedByMe: !post.likedByMe, likes: post.likedByMe ? post.likes - 1 : post.likes + 1 }
        : post
    );
    updateUser({ ...currentUser, posts: updatedPosts });
  };

  // تبديل الريتويت
  const handleRetweet = (postId) => {
    const updatedPosts = currentUser.posts.map(post =>
      post.id === postId
        ? {
            ...post,
            retweetedByMe: !post.retweetedByMe,
            retweets: post.retweetedByMe ? post.retweets - 1 : post.retweets + 1
          }
        : post
    );
    updateUser({ ...currentUser, posts: updatedPosts });
  };

  // إضافة رد جديد
  const handleReply = (postId) => {
    if (!replyText.trim()) return;

    const newReply = {
      id: Date.now(),
      user: currentUser.name,
      username: currentUser.username,
      profilePic: currentUser.profilePic,
      content: replyText,
      time: 'Just now'
    };

    const updatedPosts = currentUser.posts.map(post =>
      post.id === postId
        ? {
            ...post,
            replies: [...(post.replies || []), newReply],
            comments: (post.comments || 0) + 1
          }
        : post
    );

    updateUser({ ...currentUser, posts: updatedPosts });
    setReplyText('');
    setSelectedPostForReply(null);
  };

  // بدء تعديل البوست
  const handleEdit = (post) => {
    setEditingPostId(post.id);
    setEditContent(post.content);
    setOpenMenuId(null);
  };

  // حفظ التعديل
  const saveEdit = (postId) => {
    const updatedPosts = currentUser.posts.map(post =>
      post.id === postId ? { ...post, content: editContent } : post
    );
    updateUser({ ...currentUser, posts: updatedPosts });
    setEditingPostId(null);
    setEditContent('');
  };

  // حذف البوست
  const handleDelete = (postId) => {
    const updatedPosts = currentUser.posts.filter(post => post.id !== postId);
    updateUser({ ...currentUser, posts: updatedPosts });
    setOpenMenuId(null);
  };

  // فتح/إغلاق قائمة الخيارات
  const toggleMenu = (postId) => {
    setOpenMenuId(openMenuId === postId ? null : postId);
  };

  // إظهار/إخفاء الردود
  const toggleReplies = (postId) => {
    setShowRepliesFor(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  // لو مفيش داتا، نعرض شاشة تحميل
  if (!currentUser) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2, color: '#3b2a20' }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 'lg', mx: 'auto', px: { xs: 2, sm: 3 }, pt: 4 }}>
      <Grid container spacing={4}>
        {/* الجزء الرئيسي - البوستات */}
        <Grid item xs={12} lg={8}>
          <Box>
            {/* كتابة بوست جديد */}
            <Paper elevation={3} sx={{ borderRadius: 4, mb: 4 }}>
              <ComposePost
                newPost={newPost}
                setNewPost={setNewPost}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                showEmojiPicker={showEmojiPicker}
                setShowEmojiPicker={setShowEmojiPicker}
                handlePost={handlePost}
                handleImageSelect={handleImageSelect}
              />
            </Paper>

            {/* قائمة البوستات */}
            <Box>
              {currentUser.posts && currentUser.posts.length > 0 ? (
                currentUser.posts.map((post) => (
                  <PostItem
                    key={post.id}
                    post={post}
                    currentUser={currentUser}
                    handleLike={handleLike}
                    handleRetweet={handleRetweet}
                    setSelectedPostForReply={setSelectedPostForReply}
                    editingPostId={editingPostId}
                    setEditingPostId={setEditingPostId}
                    editContent={editContent}
                    setEditContent={setEditContent}
                    saveEdit={saveEdit}
                    handleDelete={handleDelete}
                    openMenuId={openMenuId}
                    toggleMenu={toggleMenu}
                    handleEdit={handleEdit}
                    showRepliesFor={showRepliesFor}
                    toggleReplies={toggleReplies}
                  />
                ))
              ) : (
                <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 4 }}>
                  <Typography variant="h6" color="text.secondary">
                    No posts yet. Start sharing something!
                  </Typography>
                </Paper>
              )}
            </Box>
          </Box>
        </Grid>

        {/* السايدبار - مخفي على الموبايل */}
        <Grid item xs={12} lg={4} sx={{ display: { xs: 'none', lg: 'block' } }}>
          <ProfileSidebar currentUser={currentUser} />
        </Grid>
      </Grid>

      {/* مودال الرد */}
      <ReplyModal
        selectedPostForReply={selectedPostForReply}
        replyText={replyText}
        setReplyText={setReplyText}
        handleReply={handleReply}
        setSelectedPostForReply={setSelectedPostForReply}
        currentUser={currentUser}  /* مهم جدًا عشان الصورة في المودال */
      />
    </Box>
  );
};

export default Profile;