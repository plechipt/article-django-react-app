import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import { POST_EDIT_MUTATION, POST_FIND_QUERY } from "../Api/post";

const EditPost = ({ currentUser }) => {
  const { id } = useParams();
  const history = useHistory();

  const [allowButton, setAllowButton] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [textAreaInput, setTextAreaInput] = useState("");

  const [editPost, { loading }] = useMutation(POST_EDIT_MUTATION);
  const [findPost, { data: detailData }] = useLazyQuery(POST_FIND_QUERY);

  // Everytime id changes -> find post info of that id
  useEffect(() => {
    const id_is_number = !isNaN(id);

    if (id_is_number === true) {
      findPost({ variables: { id: id } });
    }
  }, [findPost, id]);

  // Fill title and textarea
  useEffect(() => {
    if (detailData && detailData.findPost.title) {
      const {
        findPost: { title, content },
      } = detailData;

      setTitleInput(title);
      setTextAreaInput(content);
    }
  }, [detailData]);

  // If title and textarea are filled -> undisable button
  useEffect(() => {
    const fields_are_filled = titleInput !== "" && textAreaInput !== "";

    if (fields_are_filled) {
      setAllowButton(true);
    } else {
      setAllowButton(false);
    }
  }, [titleInput, textAreaInput]);

  const handleOnSubmit = async (e) => {
    const user_submited_button = e.target.tagName === "BUTTON";

    if (user_submited_button) {
      await editPost({
        variables: { id: id, title: titleInput, content: textAreaInput },
      });
      history.push("/posts");
    }
  };

  return (
    <div className="post-create-container">
      {detailData && detailData.findPost.user.username === currentUser ? (
        <Form>
          <Form.Field>
            <label>Title</label>
            <input
              onChange={(e) => setTitleInput(e.target.value)}
              value={titleInput}
              placeholder="Title"
              maxLength="100"
              autoFocus
            />
          </Form.Field>
          <Form.Field>
            <label>Content</label>
            <textarea
              onChange={(e) => setTextAreaInput(e.target.value)}
              value={textAreaInput}
              maxLength="10000"
              placeholder="Enter something..."
            />
          </Form.Field>
          <Button
            disabled={!allowButton || loading}
            onClick={handleOnSubmit}
            className="submit-button"
            type="submit"
            primary
          >
            Edit
          </Button>
        </Form>
      ) : null}
    </div>
  );
};

export default EditPost;
