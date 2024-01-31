import React from "react";
import '../Message.css';

const Message = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  const className = type === 'error' ? 'error' : 'message';

  return (
    <div className={className}>
      {message}
    </div>
  );
}

export default Message;
