import Chat from './Chat';
import ChatInput from './ChatInput';
import { useState, useEffect, useCallback } from 'react';
import { getMessages, addMessage } from '../utils/crud';

export default function MatchesDisplay({ user, clickedUser }) {
  const userId = user?.user_id;
  const clickedUserId = clickedUser?.user_id;
  const [usersMessages, setUsersMessages] = useState(null);
  const [clickedUsersMessages, setClickedUsersMessages] = useState(null);
  const [textArea, setTextArea] = useState('');

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

  const fetchMessage = async (textArea) => {
    const message = {
      timestamp: new Date().toISOString(),
      from_userId: userId,
      to_userId: clickedUserId,
      message: textArea,
    };
    try {
      await addMessage(message);
      setTextArea('');
      getUserMessages(userId, clickedUserId);
      getClickedUserMessages(clickedUserId, userId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserMessages(userId, clickedUserId);
    getClickedUserMessages(clickedUserId, userId);
  }, []);

  return (
    <>
      <Chat
        user={user}
        clickedUser={clickedUser}
        usersMessages={usersMessages}
        clickedUsersMessages={clickedUsersMessages}
      />
      <ChatInput
        user={user}
        clickedUser={clickedUser}
        setUsersMessages={setClickedUsersMessages}
        setClickedUsersMessages={setClickedUsersMessages}
        fetchMessage={fetchMessage}
        setTextArea={setTextArea}
        textArea={textArea}
      />
    </>
  );
}
