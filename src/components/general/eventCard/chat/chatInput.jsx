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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.altKey) {
      e.preventDefault(); 
      handleSendMessage();
    } else if (e.key === 'Enter' && e.altKey) {
      setMessage((prevMessage) => prevMessage + '\n'); 
    }
  };

  return (
    <div className={` container ${isFocused ? 'focused' : ''}  m-0 `} >
      <div className="row  p-1  mb-3">
      <div className="col-3"></div>
        <div className="col-6 d-flex justify-content-start p-0 pe-5 py-2 ">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            className="form-control border-0 shadow-none example px-3 pb-1 pt-3 bg-white "
            style={{
              borderRadius: "30px",
              width: '400px',
              color: 'black',
              minHeight: '15px',
              maxHeight: '100px',
              resize: 'none',
            }}
            placeholder="הקלד את ההודעה שלך ..."
            id="chatTextarea"
            maxLength={5000}
          />
        </div>

        <div className="col-1 mt-auto py-2 d-flex align-items-start">
          <button
            id="sendButton"
            type="button"
            className="btn btn-rounded btn-icon text-white"
            style={{
              transition: 'color 0.3s',
              borderRadius: '50%', border: 'none',
              textAlign: 'left'
            }}
            onClick={handleSendMessage}
          >
            <i className="fa fa-paper-plane fa-2x" aria-hidden="true" style={{ color: "#077F7A", transform: "scaleX(-1)" }}></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
