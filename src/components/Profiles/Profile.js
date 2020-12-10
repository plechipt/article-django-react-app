import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import {
  PROFILE_GET_INFO_QUERY,
  PROFILE_UPDATE_MUTATION,
} from "../Api/profile";
import { USER_DELETE_JWT_TOKENS_MUTATION } from "../Api/user";
import "./Profile.css";
import ProfileHeader from "./ProfileHeader";
import ProfileImage from "./ProfileImages";

const Profile = ({ currentUser }) => {
  const { user } = useParams();
  const history = useHistory();

  const [getProfileInfo, { data: profileData }] = useLazyQuery(
    PROFILE_GET_INFO_QUERY
  );
  const [updateProfile, { data: updateData, loading }] = useMutation(
    PROFILE_UPDATE_MUTATION
  );
  const [deleteTokens] = useMutation(USER_DELETE_JWT_TOKENS_MUTATION);

  const [imageName, setImageName] = useState();
  const [errorMessages, setErrorMessages] = useState();
  const [allowButton, setAllowButton] = useState(false);

  const [usernameInput, setUsernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [profileImage, setProfileImage] = useState("none");

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

  // Set message to user (including error and success messages)
  useEffect(() => {
    if (updateData && updateData.updateProfile.message !== "Success") {
      setErrorMessages(updateData.updateProfile.message);
    }
  }, [updateData]);

  useEffect(() => {
    const updateProfile = async () => {
      if (
        updateData !== undefined &&
        updateData.updateProfile.message === "Success"
      ) {
        // Delete JWT tokens
        await deleteTokens();

        history.push("/login");
        window.location.reload(false); // Reset site
      }
    };
    updateProfile();
  }, [updateData, history, deleteTokens]);

  // If fields are filled -> undisable button
  useEffect(() => {
    const fields_are_filled = usernameInput !== "" && emailInput !== "";

    if (fields_are_filled) {
      setAllowButton(true);
    } else {
      setAllowButton(false);
    }
  }, [usernameInput, emailInput]);

  const handleOnSubmit = async (event) => {
    const user_submited_button = event.target.tagName === "BUTTON";

    if (user_submited_button) {
      await updateProfile({
        variables: {
          user: user,
          newUser: usernameInput,
          newEmail: emailInput,
          image: profileImage,
        },
      });
    }
  };

  const onImageChange = (image) => {
    const user_has_picked_image = image !== "";

    if (user_has_picked_image) {
      setProfileImage(image);
    }
  };

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
            <div className="form-group">
              <p className="profile-info-text">Profile Info</p>
              <hr className="mb-4" />
              <Form>
                <Form.Field>
                  <label>Username</label>
                  <input
                    onChange={(event) => setUsernameInput(event.target.value)}
                    value={usernameInput}
                    placeholder="Username"
                    maxLength="39"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Email</label>
                  <input
                    onChange={(event) => setEmailInput(event.target.value)}
                    value={emailInput}
                    placeholder="Email"
                    maxLength="49"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Image</label>
                  {/*User can choose between images*/}
                  <ProfileImage
                    userImage={profileData.getProfileInfo.image}
                    onImageChange={onImageChange}
                  />
                </Form.Field>
                <Button
                  disabled={!allowButton || loading}
                  onClick={handleOnSubmit}
                  className="submit-button"
                  type="submit"
                  primary
                >
                  Update
                </Button>
              </Form>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default Profile;
