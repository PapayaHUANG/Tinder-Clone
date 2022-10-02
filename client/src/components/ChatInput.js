import { useState } from 'react';
import { addMessage, getMessages } from '../utils/crud';

export default function ChatInput({
  user,
  clickedUser,
  setUsersMessages,
  setClickedUsersMessages,
}) {
  const [textArea, setTextArea] = useState('');

  const userId = user?.user_id;
  const clickedUserId = clickedUser?.user_id;

  const fetchMessage = async () => {
    const message = {
      timestamp: new Date().toISOString(),
      from_userId: userId,
      to_userId: clickedUserId,
      message: textArea,
    };
    try {
      await addMessage(message);
      const userMessage = await getMessages(userId, clickedUserId);
      setUsersMessages(userMessage.data);
      const clickedUserMessage = await getMessages(clickedUserId, userId);
      setClickedUsersMessages(clickedUserMessage.data);
      setTextArea('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chat-input">
      <textarea
        value={textArea}
        onChange={(e) => setTextArea(e.target.value)}
      />
      <button className="secondary-button" onClick={fetchMessage}>
        Submit
      </button>
    </div>
  );
}
