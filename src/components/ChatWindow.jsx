import MessageInput from './MessageInput';

export default function ChatWindow({ currentChat, onSendMessage }) {
  return (
    <div className="open-chat">
      <div className="chat-header">
        <div className="user">
          <div className="avatar default-avatar">
            <i className="ri ri-user-3-line"></i>
          </div>
          {currentChat.name}
        </div>
        <div>
          <i className="ri ri-information-line"></i> Info
        </div>
      </div>

      <div className="messages">
        {currentChat.messages.map((msg, i) => (
          <div key={i}>
            <div className={`msg ${msg.sender}`}>
              {msg.text}
            </div>
            <div className="msg-time">{msg.time}</div>
          </div>
        ))}
      </div>

      <MessageInput onSend={onSendMessage} />
    </div>
  );
}