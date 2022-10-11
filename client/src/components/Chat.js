import { useState, useEffect } from 'react';

export default function Chat({
  user,
  clickedUser,
  usersMessages,
  clickedUsersMessages,
}) {
  let messages = [];

  usersMessages?.forEach((message) => {
    const formattedMessage = {};
    formattedMessage['name'] = user?.first_name;
    formattedMessage['img'] = user?.url;
    formattedMessage['message'] = message.message;
    formattedMessage['timestamp'] = message.timestamp;
    messages.push(formattedMessage);
  });

  clickedUsersMessages?.forEach((message) => {
    const formattedMessage = {};
    formattedMessage['name'] = clickedUser?.first_name;
    formattedMessage['img'] = clickedUser?.url;
    formattedMessage['message'] = message.message;
    formattedMessage['timestamp'] = message.timestamp;
    messages.push(formattedMessage);
  });

  const descendingOrderMessages = messages?.sort((a, b) =>
    a.timestamp.localeCompare(b.timestamp)
  );

  return (
    <div className="chat-display">
      {descendingOrderMessages?.map((message, _index) => {
        return (
          <div key={_index}>
            <div className="chat-message-header">
              <div className="img-container">
                <img src={message.img} alt={`${message.name}' profile`} />
              </div>
              <p>{message.name}</p>
            </div>
            <p>{message.message}</p>
          </div>
        );
      })}
    </div>
  );
}
