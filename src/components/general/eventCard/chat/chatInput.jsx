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
    <div className={`container   ${isFocused ? 'focused' : ''}  border-0 d-flex m-0`} style={{ borderRadius: '30px 30px 30px 30px'}}>
      <div className="row  d-danger p-1 d-flex "  >
        
        <div className="col-11  d-flex justify-content-start  p-0 pe-5 py-2">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="form-control    border-0 shadow-none example "
            style={{
              borderRadius:"30px",
              width: '550px',
              color:'black',
              minHeight:'20px',
              maxHeight: '100px', // Set the maximum height for the input
              resize: 'none', // Disable the textarea resize handle
              background:"rgba(22, 1, 255, 0.34)",
            }}
            placeholder="Type your message..."
            id="chatTextarea"
            maxLength={5000}
          />
        </div>
 
        <div className="col-1 mt-auto  py-3 d-flex align-items-start ">
          <button
          id="sendButton"
            type="button"
            className="btn btn-rounded btn-icon text-white "
            style={{
              transition: 'color 0.3s',
              borderRadius: '50%', border: 'none',
              textAlign:'left'
            }}
            onMouseEnter={(e) => (e.target.style.color = 'blue')}
            onClick={handleSendMessage}
          >
            <i className="fa fa-paper-plane fa-2x" aria-hidden="true" style={{ color: "rgba(22, 1, 255, 0.34)", transform: "scaleX(-1)" }}></i>

          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
