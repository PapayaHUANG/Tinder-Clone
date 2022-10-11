import { useState, useEffect, useCallback } from 'react';
import { addMessage, getMessages } from '../utils/crud';

export default function ChatInput({ fetchMessage, setTextArea, textArea }) {
  return (
    <div className="chat-input">
      <textarea
        value={textArea}
        onChange={(e) => setTextArea(e.target.value)}
      />
      <button
        className="secondary-button"
        onClick={() => fetchMessage(textArea)}
      >
        Submit
      </button>
    </div>
  );
}
