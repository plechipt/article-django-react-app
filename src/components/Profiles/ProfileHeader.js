import React, { useContext } from "react";
import { Message } from "semantic-ui-react";
import { UserContext } from "../UserContext";
import ProfileBodyButtons from "./ProfileBodyButtons";

const PATH_TO_PICTURES = "media/profile_pictures";

const ProfileHeader = ({ profileData: { getProfileInfo }, errorMessages }) => {
  const { user: currentUser } = useContext(UserContext);
  const {
    image,
    user: { username, email },
  } = getProfileInfo;

  return (
    <div className="profile-header">
      {errorMessages ? (
        <Message
          className="error-message-container"
          error
          header="There was some errors with your submission"
          list={[errorMessages]}
        />
      ) : null}
      <div className="media profile-media">
        <img
          className="rounded-circle profile-picture"
          src={require(`./${PATH_TO_PICTURES}/large/${image}`)}
          alt=""
        />
        <div className="profile-body">
          {username === currentUser ? (
            <>
              <h2 className="account-heading">{username}</h2>
              <p className="text-secondary">{email}</p>
            </>
          ) : (
            <>
              <h2 className="account-heading">{username}</h2>
            </>
          )}
        </div>
        <ProfileBodyButtons getProfileInfo={getProfileInfo} />
      </div>
    </div>
  );
};

export default ProfileHeader;
