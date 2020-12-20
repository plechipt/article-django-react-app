import { useMutation } from "@apollo/react-hooks";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import { PROFILE_UPDATE_MUTATION } from "../Api/profile/profile";
import { USER_DELETE_TOKENS_MUTATION } from "../Api/user";
import ProfileImage from "./ProfileImages";

const ProfileForm = ({
  profileData,
  allowButton,
  usernameInput,
  emailInput,
  setUsernameInputFunction,
  setEmailInputFunction,
  setErrorMessagesFunction,
}) => {
  const {
    getProfileInfo: { image },
  } = profileData;

  const history = useHistory();
  const [profileImage, setProfileImage] = useState("none");

  const [deleteTokens] = useMutation(USER_DELETE_TOKENS_MUTATION);
  const [updateProfile, { data: updateData, loading }] = useMutation(
    PROFILE_UPDATE_MUTATION
  );

  // Set message to user (including error and success messages)
  useEffect(() => {
    if (updateData && updateData.updateProfile.message !== "Success") {
      setErrorMessagesFunction(updateData.updateProfile.message);
    }
  }, [updateData, setErrorMessagesFunction]);

  useEffect(() => {
    const updateProfile = async () => {
      if (
        updateData !== undefined &&
        updateData.updateProfile.message === "Success"
      ) {
        // Delete JWT tokens
        await deleteTokens();
        Cookies.remove("tokenExpiration");

        history.push("/login");
        window.location.reload(false); // Reset site
      }
    };
    updateProfile();
  }, [updateData, history, deleteTokens]);

  const setUsernameInput = (name) => {
    setUsernameInputFunction(name);
  };

  const setEmailInput = (email) => {
    setEmailInputFunction(email);
  };

  const handleOnSubmit = async (e) => {
    const user_submited_button = e.target.tagName === "BUTTON";

    if (user_submited_button) {
      await updateProfile({
        variables: {
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
    <div className="profile-form">
      <div className="form-group">
        <p className="profile-info-text">Profile Info</p>
        <hr className="mb-4" />
        <Form>
          <Form.Field>
            <label>Username</label>
            <input
              onChange={(e) => setUsernameInput(e.target.value)}
              value={usernameInput}
              placeholder="Username"
              maxLength="39"
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input
              onChange={(e) => setEmailInput(e.target.value)}
              value={emailInput}
              placeholder="Email"
              maxLength="49"
            />
          </Form.Field>
          <Form.Field>
            <label>Image</label>
            {/*User can choose between images*/}
            <ProfileImage userImage={image} onImageChange={onImageChange} />
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
    </div>
  );
};

export default ProfileForm;
