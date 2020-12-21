import React from "react";
import { useHistory } from "react-router-dom";
import { Item } from "semantic-ui-react";

//import styles from '../Posts.module.css'
const DEFAULT_IMAGE =
  "https://miro.medium.com/max/550/1*TxgjUE2uJuiRUVVmE_kU6g.png";

const Post = ({ username, title, posted, id }) => {
  const urlOfPost = `/${id}`;
  const history = useHistory();

  // Redirect to detail post
  const handleOnClick = () => {
    history.push(urlOfPost);
  };

  return (
    <div className="post">
      <Item.Group>
        <Item onClick={handleOnClick} className="post">
          <Item.Image
            size="small"
            src={DEFAULT_IMAGE}
            height="550px"
            width="340px"
            alt="post default image"
          />
          <Item.Content className="post-content">
            <Item.Header className="post-title">{title}</Item.Header>
            <Item.Meta className="post-user">{username}</Item.Meta>
            <Item.Meta className="post-date">{posted}</Item.Meta>
          </Item.Content>
        </Item>
      </Item.Group>
    </div>
  );
};

export default Post;
