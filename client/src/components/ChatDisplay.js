import Chat from './Chat';
import ChatInput from './ChatInput';
import { useState, useEffect } from 'react';
import { getMessages } from '../utils/crud';

export default function MatchesDisplay({ user, clickedUser }) {
  const userId = user?.user_id;
  const clickedUserId = clickedUser?.user_id;
  const [usersMessages, setUsersMessages] = useState(null);
  const [clickedUsersMessages, setClickedUsersMessages] = useState(null);
  console.log(userId, clickedUserId);
  const getUserMessages = async (id, correspondingId) => {
    try {
      const response = await getMessages(id, correspondingId);

      setUsersMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getClickedUserMessages = async (id, correspondingId) => {
    try {
      const response = await getMessages(id, correspondingId);

      setClickedUsersMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserMessages(userId, clickedUserId);
    getClickedUserMessages(clickedUserId, userId);
  }, []);

  const messages = [];
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
    <>
      <Chat descendingOrderMessages={descendingOrderMessages} />
      <ChatInput
        user={user}
        clickedUser={clickedUser}
        getUsersMessages={getClickedUserMessages}
        getClickedUserMessages={getClickedUserMessages}
      />
    </>
  );
}
