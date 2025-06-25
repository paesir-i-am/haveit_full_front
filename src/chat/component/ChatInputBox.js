import React from 'react';
import './css/ChatInputBox.scss';

const ChatInputBox = ({ input, setInput, onSend, loading, disabled }) => (
  <div className="chat-input-box">
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && onSend()}
      disabled={loading || disabled}
    />
    <button onClick={onSend} disabled={loading || !input.trim() || disabled}>
      {loading ? '...' : '전송'}
    </button>
  </div>
);

export default ChatInputBox;