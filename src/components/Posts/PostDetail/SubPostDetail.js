import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Item } from "semantic-ui-react";
import CommentCreateForm from "../../Comments/CommentCreateForm";
import CommentsMap from "../../Comments/Comments/CommentsMap";
import EditDeleteButtons from "./EditDeleteButtons";
import LikeButton from "./LikeButton";

const DEFAULT_IMAGE =
  "https://miro.medium.com/max/550/1*TxgjUE2uJuiRUVVmE_kU6g.png";

const SubPostDetail = ({ id, detailData, currentUser }) => {
  const {
    findPost: {
      title,
      posted,
      content,
      likes: usersLikes,
      totalLikes,
      commentSet: comments,
      user: { username },
    },
  } = detailData;

  // Set likes temporarily on frontend
  const [likes, setLikes] = useState(0);

  // Fetch to set amount of likes to button
  useEffect(() => {
    setLikes(totalLikes);
  }, [totalLikes]);

  return (
    <>
      <Item.Group>
        <Item>
          <Item.Image size="small" src={DEFAULT_IMAGE} />
          <Item.Content className="post-content">
            <Item.Header className="post-title">{title}</Item.Header>
            <Item.Meta className="post-user">
              <Link to={`profile/${username}`}>{username}</Link>
            </Item.Meta>
            <Item.Meta className="post-date">{posted}</Item.Meta>
            <Item.Description className="post-textfield">
              {content}
            </Item.Description>

            {/*Includes like, edit and delete buttons*/}
            <div className="post-detail-buttons-container">
              <LikeButton
                id={id}
                likes={likes}
                usersLikes={usersLikes}
                currentUser={currentUser}
              />
              <EditDeleteButtons
                id={id}
                username={username}
                currentUser={currentUser}
              />
            </div>

            <div className="comments-container">
              {/*Map all comments from post*/}
              <CommentsMap comments={comments} currentUser={currentUser} />

              {/*Reply form for comments*/}
              <CommentCreateForm id={id} currentUser={currentUser} />
            </div>
          </Item.Content>
        </Item>
      </Item.Group>
    </>
  );
};

export default SubPostDetail;
