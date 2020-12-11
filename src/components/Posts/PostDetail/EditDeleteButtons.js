import { useMutation } from "@apollo/react-hooks";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { POST_DELETE_MUTATION } from "../../Api/post/post";
import DeleteModal from "./DeleteModal";

const EditDeleteButtons = ({ id, username, currentUser }) => {
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [deletePost] = useMutation(POST_DELETE_MUTATION);

  const handleOnDelete = async () => {
    await deletePost({ variables: { id: id } });
    history.push("/posts");
  };

  const handleOnEdit = () => {
    history.push(`editPost/${id}`);
  };

  // Handle boolean from child's component
  const handleAction = (boolean) => {
    setOpen(boolean);
  };

  return (
    <>
      {/* If post it is user's post -> show edit and delete button */}
      {currentUser === username ? (
        <>
          <Button
            onClick={handleOnEdit}
            className="post-detail-edit-button"
            color="teal"
          >
            Edit
          </Button>
          <Button
            onClick={() => handleAction(true)}
            className="post-detail-delete-button"
            color="red"
          >
            Delete
          </Button>
          <DeleteModal
            open={open}
            handleAction={handleAction}
            handleOnDelete={handleOnDelete}
          />
        </>
      ) : null}
    </>
  );
};

export default EditDeleteButtons;
