import React from "react";
import { Message } from "semantic-ui-react";
import ProfileBodyButtons from "./ProfileBodyButtons";

const PATH_TO_PICTURES = "media/profile_pictures";

const ProfileHeader = ({ profileData, currentUser, user, errorMessages }) => {
  const {
    getProfileInfo: {
      image,
      user: { username, email },
    },
  } = profileData;

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
          {user === currentUser ? (
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
        <ProfileBodyButtons
          profileData={profileData}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
};

export default ProfileHeader;
