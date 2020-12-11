import { useLazyQuery } from "@apollo/react-hooks";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PROFILE_GET_INFO_QUERY } from "../Api/profile";
import "./Profile.css";
import ProfileForm from "./ProfileForm";
import ProfileHeader from "./ProfileHeader";

const Profile = ({ currentUser }) => {
  const { user } = useParams();

  const [getProfileInfo, { data: profileData }] = useLazyQuery(
    PROFILE_GET_INFO_QUERY
  );

  const [imageName, setImageName] = useState();
  const [allowButton, setAllowButton] = useState(false);
  const [errorMessages, setErrorMessages] = useState();

  const [usernameInput, setUsernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");

  useEffect(() => {
    if (user) {
      getProfileInfo({ variables: { user: user } });
    }
  }, [user, getProfileInfo]);

  useEffect(() => {
    if (profileData) {
      let imagePath = profileData.getProfileInfo.image;

      setUsernameInput(profileData.getProfileInfo.user.username);
      setEmailInput(profileData.getProfileInfo.user.email);
      setImageName(imagePath);
    }
  }, [profileData]);

  // If fields are filled -> undisable button
  useEffect(() => {
    const fields_are_filled = usernameInput !== "" && emailInput !== "";

    if (fields_are_filled) {
      setAllowButton(true);
    } else {
      setAllowButton(false);
    }
  }, [usernameInput, emailInput]);

  return (
    <div className="profile-container">
      {profileData && imageName ? (
        <>
          <ProfileHeader
            profileData={profileData}
            currentUser={currentUser}
            user={user}
            errorMessages={errorMessages}
          />
          {user === currentUser ? (
            <ProfileForm
              user={user}
              profileData={profileData}
              allowButton={allowButton}
              usernameInput={usernameInput}
              emailInput={emailInput}
              setErrorMessagesFunction={(error) => setErrorMessages(error)}
              setUsernameInputFunction={(username) =>
                setUsernameInput(username)
              }
              setEmailInputFunction={(email) => setEmailInput(email)}
            />
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default Profile;
