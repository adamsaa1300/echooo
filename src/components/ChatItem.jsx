export default function ChatItem({ chat, isActive, onClick }) {
  return (
    <div className={`chat-item ${isActive ? 'active' : ''}`} onClick={onClick}>
      <div className="avatar default-avatar">
        <i className="ri ri-user-3-line"></i>
      </div>
      <div className="info">
        <div className="name">{chat.name}</div>
        <div className="message">{chat.lastMessage || ""}</div>
      </div>
      <div className="time">{chat.time}</div>
    </div>
  );
}