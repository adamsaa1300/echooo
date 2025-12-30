// src/components/profile/ComposePost/ComposePost.jsx
import React from 'react';
import { Box, TextField, IconButton, Button, Popover } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

const emojis = ['😊', '😂', '❤️', '🔥', '👍', '🎉', '💯', '🤩', '🥳', '✨'];

const ComposePost = ({ 
  newPost, 
  setNewPost, 
  selectedImage, 
  setSelectedImage, 
  handlePost, 
  handleImageSelect 
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  // فتح قائمة الإيموجي
  const handleEmojiClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // إغلاق قائمة الإيموجي
  const handleCloseEmoji = () => {
    setAnchorEl(null);
  };

  // إضافة إيموجي للنص
  const addEmoji = (emoji) => {
    setNewPost(prev => prev + emoji);
    handleCloseEmoji();
  };

  return (
    <Box sx={{ bgcolor: '#f8f3eb', borderRadius: 3, p: 3, mb: 3, boxShadow: 1 }}>
      {/* حقل كتابة البوست */}
      <TextField
        multiline
        rows={3}
        value={newPost}
        onChange={(e) => setNewPost(e.target.value.slice(0, 280))}
        placeholder="What's happening?"
        fullWidth
        variant="outlined"
        sx={{ 
          bgcolor: '#f8f3eb',
          '& .MuiOutlinedInput-root': {
            borderRadius: 3,
          }
        }}
      />

      {/* عرض الصورة المختارة */}
      {selectedImage && (
        <Box sx={{ mt: 2, position: 'relative', borderRadius: 3, overflow: 'hidden' }}>
          <img 
            src={selectedImage} 
            alt="Post preview" 
            style={{ width: '100%', borderRadius: 12, display: 'block' }} 
          />
          <Button
            onClick={() => setSelectedImage(null)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              minWidth: 32,
              width: 32,
              height: 32,
              bgcolor: 'rgba(0,0,0,0.6)',
              color: 'white',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' }
            }}
          >
            ×
          </Button>
        </Box>
      )}

      {/* الأزرار السفلية */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* زر رفع الصورة */}
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="image-upload"
            type="file"
            onChange={handleImageSelect}
          />
          <label htmlFor="image-upload">
            <IconButton component="span" color="primary">
              <PhotoCameraIcon />
            </IconButton>
          </label>

          {/* زر الإيموجي */}
          <IconButton onClick={handleEmojiClick} color="primary">
            <EmojiEmotionsIcon />
          </IconButton>

          {/* قائمة الإيموجي */}
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleCloseEmoji}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <Box sx={{ p: 2, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 1 }}>
              {emojis.map((emoji) => (
                <Button
                  key={emoji}
                  onClick={() => addEmoji(emoji)}
                  sx={{ 
                    minWidth: 50, 
                    height: 50, 
                    fontSize: '1.8rem',
                    '&:hover': { bgcolor: 'action.hover' }
                  }}
                >
                  {emoji}
                </Button>
              ))}
            </Box>
          </Popover>
        </Box>

        {/* زر النشر */}
        <Button
          variant="contained"
          onClick={handlePost}
          disabled={!newPost.trim() && !selectedImage}
          sx={{ 
            borderRadius: 50, 
            px: 4, 
            bgcolor: '#3b2a20',
            textTransform: 'none',
            fontWeight: 'bold',
            '&:disabled': {
              bgcolor: 'action.disabledBackground',
            }
          }}
        >
          Post
        </Button>
      </Box>
    </Box>
  );
};

export default ComposePost;