import { useMutation } from "@apollo/react-hooks";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, Message } from "semantic-ui-react";
import { POST_CREATE_MUTATION } from "../../Api/post/post";
import "./PostCreate.css";

const PostCreate = () => {
  const history = useHistory();

  const [errorMessage, setErrorMessage] = useState();
  const [allowButton, setAllowButton] = useState(false);

  const [titleInput, setTitleInput] = useState("");
  const [textareaInput, setTextareaInput] = useState("");

  const [createPost, { data: postData, loading }] = useMutation(
    POST_CREATE_MUTATION
  );

  const handleOnSubmit = async (e) => {
    const user_submited_button = e.target.tagName === "BUTTON";

    if (user_submited_button) {
      await createPost({
        variables: {
          title: titleInput,
          content: textareaInput,
        },
      });
    }
  };

  // Check if post was successfully created
  useEffect(() => {
    if (postData) {
      const {
        createPost: { message },
      } = postData;

      if (message === "Success") {
        history.push("/posts");
      } else {
        setErrorMessage(message);
      }
    }
  }, [postData, history]);

  // If title and content are filled -> undisable button
  useEffect(() => {
    const fields_are_filled = titleInput !== "" && textareaInput !== "";

    if (fields_are_filled) {
      setAllowButton(true);
    } else {
      setAllowButton(false);
    }
  }, [titleInput, textareaInput]);

  return (
    <div className="post-create-container">
      {errorMessage ? (
        <Message
          className="error-message-container"
          error
          header={errorMessage}
        />
      ) : null}
      <Form>
        <Form.Field>
          <label>Title</label>
          <input
            onChange={(e) => setTitleInput(e.target.value)}
            value={titleInput}
            placeholder="Title"
            autoFocus
            maxLength="100"
          />
        </Form.Field>
        <Form.Field>
          <label>Content</label>
          <textarea
            onChange={(e) => setTextareaInput(e.target.value)}
            value={textareaInput}
            placeholder="Enter something..."
            maxLength="10000"
          />
        </Form.Field>
        <Button
          disabled={!allowButton || loading}
          onClick={handleOnSubmit}
          className="submit-button"
          type="submit"
          primary
        >
          Create
        </Button>
      </Form>
    </div>
  );
};

export default PostCreate;
