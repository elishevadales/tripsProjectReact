import React, { useEffect, useState } from 'react';
import MyMessage from './myMessage';
import Message from './message';
import notificationSound from '../../../../sounds/messenger-notification.wav';



const ChatBody = ({ socket, userId, oldMessages }) => {
  const [messages, setMessages] = useState([]);
  const [audio] = useState(new Audio(notificationSound));



  useEffect(() => {
    socket.on('new-message', (data) => {
      setMessages([data, ...messages])
      if (data?.user_id?._id !== userId)
        audio.play()
    })
  }, [socket, messages]);

  return (
    <>
      <div
        className='px-4  flex-column m-0 py-2 '
        style={{
          // width: '850px',
          height: '500px',
          display: 'flex',
          flexDirection: 'column',
          backgroundSize: 'cover', // Adjust to your needs
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <div
          className='d-flex flex-column-reverse chat p-3'
          style={{ flex: 1, overflowY: 'auto' }}
        >

          <div className='d-flex justify-content-center align-items-center'>
            <span className='text-muted text-center' style={{ maxWidth: '180px' }}>הודעות אלו גליות לכול המשתמשים באתר</span>
          </div>


          {messages.map((message, index) => (
            message.user_id._id === userId ? (
              <MyMessage
                message={message}
                last={index === 0 || message?.user_id?._id !== oldMessages[index - 1].user_id?._id}
                alignLeft={false}
                key={index}
                index={index}
              />
            ) : (
              <Message
                message={message}
                last={index === 0 || message?.user_id?._id !== oldMessages[index - 1].user_id?._id}
                alignLeft={true}
                key={index}
                index={index}

              />
            )
          ))}


          {oldMessages.map((message, index) => (
            message?.user_id._id === userId ? (
              <MyMessage
                message={message}
                last={index === 0 || message?.user_id?._id !== oldMessages[index - 1].user_id?._id}
                alignLeft={false}
                key={index}
                index={index}
              />
            ) : (
              <Message
                message={message}
                last={index === 0 || message?.user_id?._id !== oldMessages[index - 1].user_id?._id}
                alignLeft={true}
                key={index}
                index={index}

              />
            )
          ))}

        </div>
      </div>
    </>
  )
}

export default ChatBody