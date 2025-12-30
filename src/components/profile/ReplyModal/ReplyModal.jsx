// src/components/profile/ReplyModal/ReplyModal.jsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Divider,
  Stack
} from '@mui/material';

const ReplyModal = ({
  selectedPostForReply,
  replyText,
  setReplyText,
  handleReply,
  setSelectedPostForReply,
  currentUser  // أضفنا ده عشان الصورة تظهر صح
}) => {
  if (!selectedPostForReply) return null;

  const handleClose = () => {
    setSelectedPostForReply(null);
    setReplyText('');
  };

  const submitReply = () => {
    handleReply(selectedPostForReply.id);
    handleClose();
  };

  return (
    <Dialog
      open={Boolean(selectedPostForReply)}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          bgcolor: '#f8f3eb',
          boxShadow: 24
        }
      }}
    >
      <DialogTitle sx={{ color: '#3b2a20', fontWeight: 'bold', pb: 1 }}>
        Reply to post
      </DialogTitle>

      <DialogContent dividers sx={{ py: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#3b2a20', mb: 1 }}>
            Original post:
          </Typography>
          <Paper variant="outlined" sx={{ p: 2, bgcolor: '#ebe3d6', borderRadius: 3 }}>
            <Typography variant="body1" color="#3b2a20">
              {selectedPostForReply.content}
            </Typography>
            {selectedPostForReply.image && (
              <Box sx={{ mt: 2, borderRadius: 3, overflow: 'hidden' }}>
                <img
                  src={selectedPostForReply.image}
                  alt="Original post"
                  style={{ width: '100%', borderRadius: 12 }}
                />
              </Box>
            )}
          </Paper>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Stack direction="row" spacing={2}>
          {/* صورة المستخدم الحالي */}
          <Avatar
            src={currentUser?.profilePic || 'https://i.pravatar.cc/300?img=68'}
            sx={{ width: 48, height: 48 }}
          />
          <TextField
            multiline
            rows={4}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write your reply..."
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                bgcolor: '#f8f3eb'
              }
            }}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 2 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            borderRadius: 50,
            borderColor: '#3b2a20',
            color: '#3b2a20',
            textTransform: 'none',
            fontWeight: 'bold',
            px: 4
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={submitReply}
          variant="contained"
          disabled={!replyText.trim()}
          sx={{
            borderRadius: 50,
            bgcolor: '#3b2a20',
            color: '#f8f3eb',
            textTransform: 'none',
            fontWeight: 'bold',
            px: 5,
            boxShadow: 3,
            '&:disabled': {
              bgcolor: 'action.disabledBackground'
            }
          }}
        >
          Reply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReplyModal;