import { useLazyQuery } from "@apollo/react-hooks";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Item } from "semantic-ui-react";
import { POST_FIND_QUERY } from "../../Api/post";
import CommentCreateForm from "../../Comments/CommentCreateForm";
import CommentsMap from "../../Comments/Comments/CommentsMap";
import EditDeleteButtons from "./EditDeleteButtons";
import LikeButton from "./LikeButton";

const DEFAULT_IMAGE =
  "https://miro.medium.com/max/550/1*TxgjUE2uJuiRUVVmE_kU6g.png";

const PostDetail = ({ currentUser }) => {
  const { id } = useParams();

  // Set likes temporarily on frontend
  const [likes, setLikes] = useState(0);
  const [findPost, { data: detailData }] = useLazyQuery(POST_FIND_QUERY);

  // Fetch to set amount of likes to button
  useEffect(() => {
    if (detailData && detailData.findPost) {
      setLikes(detailData.findPost.totalLikes);
    }
  }, [detailData]);

  // If id is number -> fetch post
  useEffect(() => {
    const id_is_number = !isNaN(id);

    if (id_is_number === true) {
      findPost({ variables: { id: id } });
    }
  }, [id, findPost]);

  return (
    <div>
      {detailData && detailData.findPost.title ? (
        <Item.Group>
          <Item>
            <Item.Image size="small" src={DEFAULT_IMAGE} />
            <Item.Content className="post-content">
              <Item.Header className="post-title">
                {detailData.findPost.title}
              </Item.Header>
              <Item.Meta className="post-user">
                <Link to={`profile/${detailData.findPost.user.username}`}>
                  {detailData.findPost.user.username}
                </Link>
              </Item.Meta>
              <Item.Meta className="post-date">
                {detailData.findPost.posted}
              </Item.Meta>
              <Item.Description className="post-textfield">
                {detailData.findPost.content}
              </Item.Description>

              {/*Includes like, edit and delete buttons*/}
              <div className="post-detail-buttons-container">
                <LikeButton
                  id={id}
                  likes={likes}
                  detailData={detailData}
                  currentUser={currentUser}
                />
                <EditDeleteButtons
                  id={id}
                  detailData={detailData}
                  currentUser={currentUser}
                />
              </div>

              <div className="comments-container">
                {/*Map all comments from post*/}
                <CommentsMap
                  detailData={detailData}
                  currentUser={currentUser}
                />

                {/*Reply form for comments*/}
                <CommentCreateForm id={id} currentUser={currentUser} />
              </div>
            </Item.Content>
          </Item>
        </Item.Group>
      ) : null}
    </div>
  );
};

export default PostDetail;
