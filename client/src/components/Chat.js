import { useState, useEffect } from 'react';

export default function Chat({
  user,
  clickedUser,
  usersMessages,
  clickedUsersMessages,
}) {
  const [messages, setMessages] = useState([]);
  const [descendingOrderMessages, setDescendingOrderMessages] = useState(null);

  useEffect(() => {
    usersMessages?.forEach((message) => {
      const formattedMessage = {};
      formattedMessage['name'] = user?.first_name;
      formattedMessage['img'] = user?.url;
      formattedMessage['message'] = message.message;
      formattedMessage['timestamp'] = message.timestamp;
      setMessages([...messages, formattedMessage]);
    });

    clickedUsersMessages?.forEach((message) => {
      const formattedMessage = {};
      formattedMessage['name'] = clickedUser?.first_name;
      formattedMessage['img'] = clickedUser?.url;
      formattedMessage['message'] = message.message;
      formattedMessage['timestamp'] = message.timestamp;
      setMessages([...messages, formattedMessage]);
    });
  }, [usersMessages, clickedUsersMessages]);

  useEffect(() => {
    const orderedMessages = messages?.sort((a, b) =>
      a.timestamp.localeCompare(b.timestamp)
    );

    setDescendingOrderMessages(orderedMessages);
  }, [messages]);

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
