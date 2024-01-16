// MyMessage.js
import React from 'react';

const MyMessage = ({ message, last, alignLeft }) => {
  return (
    <>
      {!last ? (
        <div
          className={`d-flex text-dark p-1 justify-content-center px-3 mt-1 ${
            alignLeft ? 'align-left' : 'align-right'
          }`}
          style={{
            borderRadius: '20px 20px 20px 20px',
            maxWidth: '400px',
            minWidth: 'min-content',
            whiteSpace: 'pre-wrap', 
            boxShadow: '0 4px 8px rgba(137,137,137,0.75)',
            background:'#BBE4E2'
            // Preserve new lines
         //   overflowWrap: 'break-word', // Wrap at word boundaries
          }}
        >
          {message?.text}
        </div>
      ) : (
        <div
          className={`  d-flex text-dark p-1 justify-content-center px-3 mt-1 ${
            alignLeft ? 'align-left' : 'align-right'
          }`}
          style={{
            boxShadow: '0 4px 8px rgba(137,137,137,0.75)',
            borderRadius: '20px 20px 20px 0px',
            maxWidth: '400px',
            minWidth: 'min-content',
            whiteSpace: 'pre-wrap', // Preserve new lines
            background:'#BBE4E2'
         //   overflowWrap: 'break-word', // Wrap at word boundaries
          }}
        > {message?.text}
                             
        <span className='text-muted' style={{fontSize:'13px'}}> <br/> {new Date( message?.time_stamp).getUTCHours()}:{new Date( message?.time_stamp).getUTCMinutes()}</span>

        </div>
      )}
    </>
  );
};

export default MyMessage;
