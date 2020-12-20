import { useMutation } from "@apollo/react-hooks";
import React, { useEffect, useState } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import { COMMENT_POST_MUTATION } from "../Api/comment";

const CommentCreateForm = ({ id }) => {
  const [allowButton, setAllowButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [commentInput, setCommentInput] = useState("");
  const [commentPost, { data: commentData, loading, error }] = useMutation(
    COMMENT_POST_MUTATION
  );

  const handleOnComment = async () => {
    await commentPost({
      variables: { id: id, content: commentInput },
    });
  };

  useEffect(() => {
    if (commentData) {
      const {
        commentPost: { message },
      } = commentData;

      if (message === "Success") {
        window.location.reload(false); // Reset site
      }
    }
  }, [commentData]);

  // If rate limit
  useEffect(() => {
    if (error) {
      setErrorMessage("You are commentng too much!");
    }
  }, [error]);

  // If comment form was filled -> activate button
  useEffect(() => {
    const form_is_filled = commentInput !== "";

    if (form_is_filled) {
      setAllowButton(true);
    } else {
      setAllowButton(false);
    }
  }, [commentInput]);

  return (
    <div className="comment-create-container">
      {errorMessage !== "" ? (
        <Message
          className="error-message-container"
          error
          header={errorMessage}
        />
      ) : null}
      <Form reply>
        <textarea
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="Enter something..."
          maxLength="100"
        />
        <Button
          disabled={!allowButton || loading}
          onClick={handleOnComment}
          className="comment-create-button"
          content="Comment"
          labelPosition="left"
          icon="edit"
          primary
        />
      </Form>
    </div>
  );
};

export default CommentCreateForm;
