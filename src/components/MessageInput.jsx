import { useState } from 'react';

export default function MessageInput({ onSend }) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="input-bar">
  <div className="emoji-btn">
    <i className="ri ri-emotion-happy-line"></i>
  </div>
  <div className="attach-btn">
    <i className="ri ri-attachment-2"></i>
  </div>
  <input
    type="text"
    placeholder="اكتب رسالة..."
    value={text}
    onChange={(e) => setText(e.target.value)}
    onKeyDown={handleKeyDown}
  />
  <div className="send-btn" onClick={handleSend}>
    <i className="ri ri-send-plane-fill"></i>
  </div>
</div>
  );
}