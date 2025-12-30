// src/components/profile/PostItem/PostItem.jsx
import React from 'react';
import {
  Box,
  Paper,
  Avatar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Stack,
  Collapse,
  Button,
  TextField
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RepeatIcon from '@mui/icons-material/Repeat';
import RepeatOnIcon from '@mui/icons-material/RepeatOn';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const PostItem = ({
  post,
  currentUser,
  handleLike,
  handleRetweet,
  setSelectedPostForReply,
  editingPostId,
  setEditingPostId,
  editContent,
  setEditContent,
  saveEdit,
  handleDelete,
  openMenuId,
  toggleMenu,
  handleEdit,
  showRepliesFor,
  toggleReplies
}) => {
  const isLiked = post.likedByMe;
  const isRetweeted = post.retweetedByMe;
  const isEditing = editingPostId === post.id;
  const hasReplies = (post.comments || 0) > 0;

  const [anchorEl, setAnchorEl] = React.useState(null);

  // فتح قائمة الخيارات (تعديل / حذف)
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    toggleMenu(post.id);
  };

  // إغلاق القائمة
  const handleMenuClose = () => {
    setAnchorEl(null);
    toggleMenu(null);
  };

  return (
    <Paper elevation={2} sx={{ borderRadius: 4, mb: 3, overflow: 'hidden' }}>
      <Box sx={{ p: 3 }}>
        {/* رأس البوست */}
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Avatar
            src={currentUser.profilePic || 'https://i.pravatar.cc/300?img=68'}
            alt={currentUser.name}
            sx={{ width: 48, height: 48 }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {currentUser.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  @{currentUser.username} · {post.time || 'Just now'}
                </Typography>
              </Box>

              {/* زر الثلاث نقاط */}
              <IconButton onClick={handleMenuClick} size="small">
                <MoreHorizIcon />
              </IconButton>

              {/* قائمة التعديل والحذف */}
              <Menu
                anchorEl={anchorEl}
                open={openMenuId === post.id}
                onClose={handleMenuClose}
                PaperProps={{ sx: { borderRadius: 3 } }}
              >
                <MenuItem onClick={() => handleEdit(post)}>
                  <EditIcon fontSize="small" sx={{ mr: 1 }} />
                  Edit
                </MenuItem>
                <MenuItem onClick={() => handleDelete(post.id)} sx={{ color: 'error.main' }}>
                  <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                  Delete
                </MenuItem>
              </Menu>
            </Stack>

            {/* محتوى البوست */}
            <Box sx={{ mt: 2 }}>
              {isEditing ? (
                <Box>
                  <TextField
                    multiline
                    fullWidth
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    variant="outlined"
                    sx={{ mb: 1 }}
                  />
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => saveEdit(post.id)}
                      sx={{ borderRadius: 50, bgcolor: '#3b2a20' }}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        setEditingPostId(null);
                        setEditContent('');
                      }}
                      sx={{ borderRadius: 50 }}
                    >
                      Cancel
                    </Button>
                  </Stack>
                </Box>
              ) : (
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                  {post.content}
                </Typography>
              )}
            </Box>

            {/* صورة البوست */}
            {post.image && !isEditing && (
              <Box sx={{ mt: 2, borderRadius: 3, overflow: 'hidden' }}>
                <img
                  src={post.image}
                  alt="Post"
                  style={{ width: '100%', display: 'block', borderRadius: 12 }}
                />
              </Box>
            )}

            {/* الأزرار: لايك، ريتويت، رد */}
            <Stack direction="row" spacing={4} sx={{ mt: 3, alignItems: 'center' }}>
              {/* لايك */}
              <IconButton
                onClick={() => handleLike(post.id)}
                sx={{ color: isLiked ? '#e91e63' : 'inherit' }}
              >
                {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {post.likes || 0}
                </Typography>
              </IconButton>

              {/* ريتويت */}
              <IconButton
                onClick={() => handleRetweet(post.id)}
                sx={{ color: isRetweeted ? '#4caf50' : 'inherit' }}
              >
                {isRetweeted ? <RepeatOnIcon /> : <RepeatIcon />}
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {post.retweets || 0}
                </Typography>
              </IconButton>

              {/* رد */}
              <IconButton
                onClick={() => setSelectedPostForReply(post)}
                color="primary"
              >
                <ChatBubbleOutlineIcon />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {post.comments || 0}
                </Typography>
              </IconButton>
            </Stack>
          </Box>
        </Stack>

        {/* إظهار/إخفاء الردود */}
        {hasReplies && (
          <Button
            onClick={() => toggleReplies(post.id)}
            startIcon={showRepliesFor[post.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            sx={{ mt: 2, textTransform: 'none', color: '#3b2a20' }}
          >
            {showRepliesFor[post.id] ? 'Hide' : 'Show'} replies ({post.comments})
          </Button>
        )}

        {/* قائمة الردود */}
        <Collapse in={showRepliesFor[post.id]}>
          <Box sx={{ mt: 3 }}>
            <Divider sx={{ mb: 2 }} />
            {post.replies && post.replies.length > 0 ? (
              post.replies.map((reply) => (
                <Stack key={reply.id} direction="row" spacing={2} sx={{ mb: 3 }}>
                  <Avatar src={reply.profilePic} alt={reply.user} sx={{ width: 40, height: 40 }} />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      {reply.user}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      @{reply.username} · {reply.time}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      {reply.content}
                    </Typography>
                  </Box>
                </Stack>
              ))
            ) : (
              <Typography color="text.secondary">No replies yet.</Typography>
            )}
          </Box>
        </Collapse>
      </Box>
    </Paper>
  );
};

export default PostItem;