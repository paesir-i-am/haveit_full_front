import React from 'react';
import { useSelector } from 'react-redux';
import { formatTime } from '../../common/util/formatTime';
import './css/ChatHistoryList.scss';

const ChatHistoryList = () => {
  const chatbotState = useSelector((state) => state.chatbotSlice);
  const messages = chatbotState?.messages || [];
  
  return (
    <div className="chat-history-list">
      {messages.map((msg) => (
        <div key={msg.id} className={`chat-msg-row ${msg.sender === 'user' ? 'right' : 'left'}`}>
          <div className={`chat-bubble-container ${msg.sender}`}>
            <div className={`chat-bubble ${msg.sender}`}>
              {msg.message}
            </div>
            <div className="chat-timestamp">
              {formatTime(msg.timestamp)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatHistoryList;