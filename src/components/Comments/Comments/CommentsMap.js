import React from "react";
import { Comment, Header } from "semantic-ui-react";
import "../Comments.css";
import CustomComment from "./CustomComment";

// Map all comments
const CommentsMap = ({ comments, currentUser }) => {
  return (
    <div>
      <Comment.Group>
        <Header as="h3" dividing>
          Comments
        </Header>
        {comments.map(
          ({
            id,
            content,
            posted,
            user: { username, profile: image },
            replySet,
          }) => {
            return (
              <CustomComment
                key={id}
                id={id}
                replys={replySet}
                content={content}
                posted={posted}
                username={username}
                currentUser={currentUser}
                image={image}
              />
            );
          }
        )}
      </Comment.Group>
    </div>
  );
};

export default CommentsMap;
