import React, { useState } from 'react';

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className={`container mt-3 bg-dark ${isFocused ? 'focused' : ''}`}>

      

      <div className="row">
        <div className="col-1">
          <button
            type="button"
            className="btn btn-rounded btn-icon text-white bg-dark"
            style={{
              transition: 'color 0.3s',
              borderRadius: '50%',
            }}
            onMouseEnter={(e) => (e.target.style.color = 'blue')}
            onClick={handleSendMessage}
          >
            <i className="fa fa-paper-plane text-white" aria-hidden="true"></i>
          </button>
        </div>
        <div className="col-8">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="form-control bg-dark text-white border-0 shadow-none hide-scroll"
            style={{
              maxHeight: '100px', // Set the maximum height for the input
              resize: 'none', // Disable the textarea resize handle
            }}
            placeholder="Type your message..."
            id="chatTextarea"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
