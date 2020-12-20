import { useMutation } from "@apollo/react-hooks";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { MESSAGE_CREATE_MUTATION } from "../Api/message";

const CreateMessage = () => {
  const { chatUser } = useParams();

  const [messageInput, setMessageInput] = useState("");
  const [createMessage] = useMutation(MESSAGE_CREATE_MUTATION);

  const handleOnSubmit = async (e) => {
    const form_is_filled = messageInput !== "";
    const user_submited_button = e.target.tagName === "I";

    if (form_is_filled && user_submited_button) {
      await createMessage({
        variables: {
          chatUser: chatUser,
          content: messageInput,
        },
      });
      setMessageInput("");
      window.location.reload(false); // Reset site
    }
  };

  return (
    <div className="message-create-container">
      <div className="message-create-form-container">
        <div className="form-group message-create-form-container">
          <textarea
            onChange={(e) => setMessageInput(e.target.value)}
            value={messageInput}
            className="form-control form-control-lg"
            rows="1"
            placeholder="Enter a message..."
            maxLength="565"
            autoFocus
          />
        </div>
      </div>
      <div onClick={handleOnSubmit} className="ml-3 message-button-container">
        <Icon name="send" size="big" />
      </div>
    </div>
  );
};

export default CreateMessage;
