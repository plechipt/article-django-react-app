import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  MESSAGE_CREATE_CHATROOM_MUTATION,
  MESSAGE_LIST_QUERY,
} from "../../Api/message";
import CreateMessage from "../CreateMessage";
import MessagesMap from "./MessagesMap";

const MessagesContainer = () => {
  const { chatUser } = useParams();

  const [createChatRoom] = useMutation(MESSAGE_CREATE_CHATROOM_MUTATION);
  const [
    chatRoomMessages,
    { data: messagesData },
  ] = useLazyQuery(MESSAGE_LIST_QUERY, { fetchPolicy: "cache-and-network" });

  // Query all chat room messages
  useEffect(() => {
    const getMessages = async () => {
      await createChatRoom({
        variables: { chatUser: chatUser },
      });
      chatRoomMessages({
        variables: { chatUser: chatUser },
      });
    };
    getMessages();
  }, [chatUser, chatRoomMessages, createChatRoom]);

  return (
    <div className="chat-room-container">
      <div className="messages-and-create-form-container">
        {messagesData && messagesData.chatRoomMessages ? (
          <>
            {messagesData && messagesData.chatRoomMessages.length !== 0 ? (
              <MessagesMap messagesData={messagesData} />
            ) : null}
            <CreateMessage />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default MessagesContainer;
