import ChatInput from './chatInput';
import MyMessage from './myMessage';
import Message from './message';
import React, { useState, useEffect } from 'react';
import { API_URL, TOKEN_NAME, doApiGet, doApiMethod } from '../../../../services/apiService'
import ChatBody from './chatBody'
const ChatScreen = ({ eventId, userId, socket }) => {

    const [messages, setMessages] = useState([])

    const doApiMessages = async () => {
        let url
        try {
            if (eventId)
                url = API_URL + `/messages/byEventId/${eventId}`;

            let resp = await doApiGet(url);
            setMessages(resp.data.messages)
        }

        catch (err) {
            console.log(err);
        }
    }


    const onSendMessage = async (text) => {
        const message = {
            user_id: userId,
            event_id: eventId,
            text: text,
            time_stamp: Date()
        }
        socket.emit("new-message", message)
    }

    // 1 get all the mesagges to the event , connect to socket 
    useEffect(() => {
        socket.emit("join-room", eventId)
        doApiMessages()
    }, []);


    return (
        <div
            className='flex-column p-3 m-3'
            style={{
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                width: '905px',
                height: '650px',
                display: 'flex',
                flexDirection: 'column',
                backgroundImage: `url('https://raw.githubusercontent.com/telegramdesktop/tdesktop/dev/Telegram/Resources/art/bg_initial.jpg')`,
                backgroundSize: 'cover', // Adjust to your needs
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
        >
            <div
                className='d-flex flex-column-reverse'
                style={{ flex: 1, overflowY: 'auto' }}
            >

                {/* {messages.map((message, index) => (
                    message.user_id._id === userId ?
                        <MyMessage message={message} last={true} alignLeft={false} key={index} /> : <Message message={message} last={true} alignLeft={true} key={index} />
                ))} */}
                {/* {messages.length > 0 && messages.map((message, index) => {
                    // message.user_id === userId ?
                    <Message message={message} last={true} alignLeft={true} key={index} />
                    //     <MyMessage message={message} last={true} alignLeft={false} key={index} /> :
                    //     <Message message={message} last={true} alignLeft={true} key={index} />

                })} */}

            </div>
            <div>
                <ChatBody socket={socket} userId={userId} oldMessages={messages} eventId={eventId} />
            </div>

            <div className='mt-auto d-flex justify-content-center border flex-row align-items-center'>
                <ChatInput onSendMessage={onSendMessage} />
            </div>
        </div>
    );
};

export default ChatScreen;
