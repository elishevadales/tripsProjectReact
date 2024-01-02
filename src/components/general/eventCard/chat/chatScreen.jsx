import React from 'react'
import ChatInput from './chatInput'
const ChatScreen = () => {

    return (
          <div className='border my-2 mx-3 p-2' style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '905px', width:'600px' }}>
            <ChatInput/>
        </div>
    )
}

export default ChatScreen