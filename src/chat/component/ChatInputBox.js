import React from 'react';
import './css/ChatInputBox.scss';

const ChatInputBox = ({ input, setInput, onSend, loading }) => (
  <div className="chat-input-box">
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && onSend()}
      disabled={loading}
    />
    <button onClick={onSend} disabled={loading || !input.trim()}>
      {loading ? '...' : '전송'}
    </button>
  </div>
);

export default ChatInputBox;