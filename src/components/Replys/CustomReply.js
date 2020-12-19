import { useMutation } from "@apollo/react-hooks";
import React, { useContext } from "react";
import { Comment } from "semantic-ui-react";
import { REPLY_DELETE_MUTATION } from "../Api/reply";
import { UserContext } from "../UserContext";

const PATH_TO_PICTURES = "Profiles/media/profile_pictures";

const CustomReply = ({ id, content, posted, username, image }) => {
  const { user } = useContext(UserContext);
  const [deleteReply] = useMutation(REPLY_DELETE_MUTATION);

  const handleOnDelete = async () => {
    await deleteReply({ variables: { id: id } });
    window.location.reload(false); // Reset site
  };

  return (
    <>
      <Comment.Group className="reply-container">
        <Comment>
          <Comment.Avatar
            src={require(`../${PATH_TO_PICTURES}/small/${image}`)}
          />
          <Comment.Content>
            <Comment.Author as="a">
              <a href={`profile/${username}`}>{username}</a>
            </Comment.Author>
            <Comment.Metadata>
              <div>{posted}</div>
            </Comment.Metadata>
            <Comment.Text>{content}</Comment.Text>
            <Comment.Actions>
              {user === username ? (
                <Comment.Action onClick={handleOnDelete}>Delete</Comment.Action>
              ) : null}
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    </>
  );
};

export default CustomReply;
