import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import './App.css';

const initialChats = [
  {
    id: 1,
    name: "Ahmad",
    messages: [],
    lastMessage: "Hey, how's it going?",
    time: "2h ago"
  },
  {
    id: 2,
    name: "Fatima",
    messages: [],
    lastMessage: "Hey",
    time: "2m ago"
  },
  {
    id: 3,
    name: "Salma",
    messages: [],
    lastMessage: "",
    time: "2m ago"
  },
  {
    id: 4,
    name: "Zied",
    messages: [],
    lastMessage: "Let's catch up!",
    time: "2h ago"
  }
];

function App() {
  const [chats, setChats] = useState(initialChats);
  const [currentChat, setCurrentChat] = useState(chats[0]);

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMessage = {
      text,
      sender: 'sent',
      time: now
    };

    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === currentChat.id
          ? { ...chat, messages: [...chat.messages, newMessage], lastMessage: text, time: "الآن" }
          : chat
      )
    );

    setCurrentChat(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage],
      lastMessage: text,
      time: "الآن"
    }));
  };

  return (
    <div className="container" dir="rtl">
      <div className="split-view">
        <Sidebar
          chats={chats}
          currentChat={currentChat}
          onSelectChat={setCurrentChat}
        />
        <ChatWindow
          currentChat={currentChat}
          onSendMessage={sendMessage}
        />
      </div>
    </div>

  );
}

export default App;