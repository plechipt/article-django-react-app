import React, { lazy, Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Item } from "semantic-ui-react";
import CommentsMap from "../../Comments/Comments/CommentsMap";
import LikeButton from "./LikeButton";

const EditDeleteButtons = lazy(() => import("./EditDeleteButtons"));
const CommentCreateForm = lazy(() =>
  import("../../Comments/CommentCreateForm")
);

const DEFAULT_IMAGE =
  "https://miro.medium.com/max/550/1*TxgjUE2uJuiRUVVmE_kU6g.png";

const SubPostDetail = ({ id, detailData }) => {
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
          <Item.Image
            size="small"
            src={DEFAULT_IMAGE}
            height="550px"
            width="340px"
          />
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
              <LikeButton id={id} likes={likes} usersLikes={usersLikes} />
              <Suspense fallback={<div>Loading...</div>}>
                <EditDeleteButtons id={id} username={username} />
              </Suspense>
            </div>

            <div className="comments-container">
              {/*Map all comments from post*/}
              <CommentsMap comments={comments} />

              {/*Reply form for comments*/}
              <Suspense fallback={<div>Loading...</div>}>
                <CommentCreateForm id={id} />
              </Suspense>
            </div>
          </Item.Content>
        </Item>
      </Item.Group>
    </>
  );
};

export default SubPostDetail;
