import React from "react";
import "../Messages.css";
import Message from "./Message";

const MessagesMap = ({ messagesData }) => {
  const { chatRoomMessages: messages } = messagesData;

  return (
    <div className="messages-container">
      {messages ? (
        <>
          {messages.map(({ id, content, messaged, user: { username } }) => {
            return (
              <Message
                key={id}
                id={id}
                username={username}
                content={content}
                messaged={messaged}
              />
            );
          })}
        </>
      ) : null}
    </div>
  );
};

export default MessagesMap;
