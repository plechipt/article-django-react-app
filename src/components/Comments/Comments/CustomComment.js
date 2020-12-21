import { useMutation } from "@apollo/react-hooks";
import React, { lazy, Suspense, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Comment } from "semantic-ui-react";
import { COMMENT_DELETE_MUTATION } from "../../Api/comment";
import ReplysMap from "../../Replys/ReplysMap";
import { UserContext } from "../../UserContext";

const PATH_TO_PICTURES = "Profiles/media/profile_pictures";
const ReplyForm = lazy(() => import("../../Replys/ReplyForm"));

const CustomComment = ({ id, replys, content, posted, username, image }) => {
  const { user } = useContext(UserContext);
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
          height="50px"
          width="50px"
          alt="user profile picture"
        />
        <Comment.Content>
          <Comment.Author>
            <Link to={`profile/${username}`}>{username}</Link>
          </Comment.Author>
          <Comment.Metadata>
            <div>{posted}</div>
          </Comment.Metadata>
          <Comment.Text>{content}</Comment.Text>
          <Comment.Actions>
            <Comment.Action onClick={handleOnReply}>Reply</Comment.Action>
            {user === username ? (
              <Comment.Action onClick={handleOnDelete}>Delete</Comment.Action>
            ) : null}
          </Comment.Actions>
        </Comment.Content>

        {/*Reply form when reply button is clicked*/}
        <Suspense fallback={<div>Loading...</div>}>
          <ReplyForm id={id} showReplyForm={showReplyForm} />
        </Suspense>

        {/*Mapping all replys of comment*/}
        {replys ? <ReplysMap replys={replys} /> : null}
      </Comment>
    </div>
  );
};

export default CustomComment;
