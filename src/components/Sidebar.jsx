import Header from './Header';
import ChatList from './ChatList';

export default function Sidebar({ chats, currentChat, onSelectChat }) {
  return (
    <div className="sidebar">
      <Header />
      <div className="tabs">
        <div className="tab">
          <i className="ri ri-home-4-line"></i>
        </div>
        <div className="tab">
          <i className="ri ri-group-line"></i>
        </div>
        <div className="tab active">
          <i className="ri ri-message-3-line"></i>
        </div>
      </div>
      <ChatList chats={chats} currentChat={currentChat} onSelectChat={onSelectChat} />
    </div>
  );
}