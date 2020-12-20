import { useLazyQuery } from "@apollo/react-hooks";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { PROFILE_GET_INFO_QUERY } from "../Api/profile/profile";
import { UserContext } from "../UserContext";
import "./Profile.css";
import ProfileForm from "./ProfileForm";
import ProfileHeader from "./ProfileHeader";

export const UserInputContext = createContext("");
export const EmailInputContext = createContext("");
export const ErrorMessagesContext = createContext("");

const Profile = () => {
  const { user } = useParams();
  const { user: currentUser } = useContext(UserContext);

  const [getProfileInfo, { data: profileData }] = useLazyQuery(
    PROFILE_GET_INFO_QUERY
  );
  const [imageName, setImageName] = useState();
  const [allowButton, setAllowButton] = useState(false);

  const [usernameInput, setUsernameInput] = useState("");
  const usernameValue = useMemo(() => ({ usernameInput, setUsernameInput }), [
    usernameInput,
    setUsernameInput,
  ]);

  const [emailInput, setEmailInput] = useState("");
  const emailValue = useMemo(() => ({ emailInput, setEmailInput }), [
    emailInput,
    setEmailInput,
  ]);

  const [errorMessages, setErrorMessages] = useState("");
  const errorMessagesValue = useMemo(
    () => ({ errorMessages, setErrorMessages }),
    [errorMessages, setErrorMessages]
  );

  useEffect(() => {
    if (user) {
      getProfileInfo({ variables: { user: user } });
    }
  }, [user, getProfileInfo]);

  useEffect(() => {
    if (profileData) {
      let {
        getProfileInfo: {
          image,
          user: { username, email },
        },
      } = profileData;

      setUsernameInput(username);
      setEmailInput(email);
      setImageName(image);
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
          <ErrorMessagesContext.Provider value={errorMessagesValue}>
            <ProfileHeader profileData={profileData} />
          </ErrorMessagesContext.Provider>
          {user === currentUser ? (
            <UserInputContext.Provider value={usernameValue}>
              <EmailInputContext.Provider value={emailValue}>
                <ErrorMessagesContext.Provider value={errorMessagesValue}>
                  <ProfileForm
                    profileData={profileData}
                    allowButton={allowButton}
                  />
                </ErrorMessagesContext.Provider>
              </EmailInputContext.Provider>
            </UserInputContext.Provider>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default Profile;
