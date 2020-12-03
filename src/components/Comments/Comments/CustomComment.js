import React, { useState } from "react";
import { Comment } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";

import { COMMENT_DELETE_MUTATION } from "../../Api/comment";
import ReplyForm from "../../Replys/ReplyForm";
import ReplysMap from "../../Replys/ReplysMap";

const PATH_TO_PICTURES = "Profiles/media/profile_pictures";

const CustomComment = ({
  id,
  replys,
  content,
  posted,
  username,
  currentUser,
  image,
}) => {
  const [deleteComment] = useMutation(COMMENT_DELETE_MUTATION);
  const [showReplyForm, setShowReplyForm] = useState(false);

  // If user click on reply -> show the reply form and reverse
  const handleOnReply = async () => {
    setShowReplyForm(!showReplyForm);
  };

  const handleOnDelete = async () => {
    await deleteComment({ variables: { id: id } });
    window.location.reload(false); // Reset site
  };

  return (
    <div className="comment-container">
      <Comment>
        <Comment.Avatar
          src={require(`../../${PATH_TO_PICTURES}/small/${image.image}`)}
        />
        <Comment.Content>
          <Comment.Author as="a">
            <Link to={`profile/${username}`}>{username}</Link>
          </Comment.Author>
          <Comment.Metadata>
            <div>{posted}</div>
          </Comment.Metadata>
          <Comment.Text>{content}</Comment.Text>
          <Comment.Actions>
            <Comment.Action onClick={handleOnReply}>Reply</Comment.Action>
            {currentUser === username ? (
              <Comment.Action onClick={handleOnDelete}>Delete</Comment.Action>
            ) : null}
          </Comment.Actions>
        </Comment.Content>

        {/*Reply form when reply button is clicked*/}
        <ReplyForm
          id={id}
          showReplyForm={showReplyForm}
          currentUser={currentUser}
        />

        {/*Mapping all replys of comment*/}
        {replys ? (
          <ReplysMap replys={replys} currentUser={currentUser} />
        ) : null}
      </Comment>
    </div>
  );
};

export default CustomComment;
