import React, { useEffect, useState } from 'react';
import MyMessage from './myMessage';
import Message from './message';

const ChatBody = ({ socket, userId, oldMessages }) => {
  const [messages, setMessages] = useState([]);

  console.log("oldMessages",oldMessages)

  useEffect(() => {
    socket.on('new-message', (data) => {
      setMessages([ data, ...messages])
      console.log("new ", data)
    })
  }, [socket, messages]);

  return (<>
    <div
        className='p-2  flex-column m-0'
        style={{
          width: '850px',
          height: '500px',
          display: 'flex',
          flexDirection: 'column',
          // backgroundImage: `url('https://raw.githubusercontent.com/telegramdesktop/tdesktop/dev/Telegram/Resources/art/bg_initial.jpg')`,
          backgroundSize: 'cover', // Adjust to your needs
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          // background:'rgba(255, 255, 255, 0.505)'
        }}
      >
      <div
        className='d-flex flex-column-reverse chat p-3'
        style={{ flex: 1, overflowY: 'auto' }}
      >

       

        {messages.map((message, index) => (
          message.user_id._id === userId ? (
            <MyMessage
      message={message}
      last={index === 0  || message?.user_id?._id !== oldMessages[index -1].user_id?._id}
      // last={index === oldMessages.length - 1 || message?.user_id?._id !== oldMessages[index + 1].user_id?._id}
      alignLeft={false}
      key={index}
      index={index}
    />
          ) : (
            <Message
      message={message}
      last={index === 0 || message?.user_id?._id !== oldMessages[index -1].user_id?._id}
      // last={index === oldMessages.length - 1 || message?.user_id?._id !== oldMessages[index + 1].user_id?._id}
      alignLeft={true}
      key={index}
      index={index}

    />
          )
        ))}


{oldMessages.map((message, index) => (
  message?.user_id._id  === userId ? (
    <MyMessage
      message={message}
      last={index === 0  || message?.user_id?._id !== oldMessages[index -1].user_id?._id}
      // last={index === oldMessages.length - 1 || message?.user_id?._id !== oldMessages[index + 1].user_id?._id}
      alignLeft={false}
      key={index}
      index={index}
    />
  ) : (
    <Message
      message={message}
      last={index === 0 || message?.user_id?._id !== oldMessages[index -1].user_id?._id}
      // last={index === oldMessages.length - 1 || message?.user_id?._id !== oldMessages[index + 1].user_id?._id}
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