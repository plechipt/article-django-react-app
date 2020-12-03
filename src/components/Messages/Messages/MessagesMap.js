import React from "react";

import Message from "./Message";
import "../Messages.css";

const MessagesMap = ({ messagesData, currentUser }) => {
  const messages = messagesData.chatRoomMessages[0].chatroomSet[0].messages;

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
                currentUser={currentUser}
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
