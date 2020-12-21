import React from "react";
import { useHistory } from "react-router-dom";
import { Item } from "semantic-ui-react";

const PATH_TO_PICTURES = "Profiles/media/profile_pictures";

const User = ({ username, image }) => {
  const history = useHistory();

  const handleOnClick = () => {
    history.push(`/profile/${username}`);
  };

  return (
    <Item onClick={handleOnClick} className="user-container">
      <Item.Image
        size="tiny"
        src={require(`../../${PATH_TO_PICTURES}/large/${image}`)}
        height="325px"
        width="325px"
      />
      <Item.Content className="user-content-container">
        <Item.Header>{username}</Item.Header>
      </Item.Content>
    </Item>
  );
};

export default User;
