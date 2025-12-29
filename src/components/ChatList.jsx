import ChatItem from './ChatItem';

export default function ChatList({ chats, currentChat, onSelectChat }) {
  return (
    <div className="chat-list">
      {chats.map(chat => (
        <ChatItem
          key={chat.id}
          chat={chat}
          isActive={currentChat.id === chat.id}
          onClick={() => onSelectChat(chat)}
        />
      ))}
    </div>
  );
}