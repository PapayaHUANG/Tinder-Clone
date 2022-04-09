export default function Chat({ descendingOrderMessages }) {
  return (
    <div className="chat-display">
      {descendingOrderMessages.map((message, _index) => {
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
