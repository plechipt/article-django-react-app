import axios from "axios";
import Cookies from "js-cookie";

const apiKey = process.env.REACT_APP_API_KEY;
//const BASE_URL = "http://127.0.0.1:8000";
const BASE_URL = "https://article-django-react-app.herokuapp.com";

export const checkIfUserIsLoggedIn = async () => {
  const csrftoken = Cookies.get("csrftoken");

  const { data } = await axios({
    url: `${BASE_URL}/graphql/`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
      Authorization: apiKey,
    },
    data: {
      query: `
        query {
          me {
            username
          }
        }
      `,
    },
  });

  const {
    data: { me },
  } = data;
  const userIsNotAuthenticated = me === null;

  return userIsNotAuthenticated;
};

export const refreshTokenSilently = async () => {
  const csrftoken = Cookies.get("csrftoken");

  await axios({
    url: `${BASE_URL}/graphql/`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
      Authorization: apiKey,
    },
    data: {
      query: `
        mutation refreshTokenSilently {
          refreshToken {
            payload
          }
        }
      `,
    },
  });
};

export const verifyAccessToken = async () => {
  const csrftoken = Cookies.get("csrftoken");

  const { data } = await axios({
    url: `${BASE_URL}/graphql/`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
      Authorization: apiKey,
    },
    data: {
      query: `
        mutation {
          verifyAccessToken {
            isExpired
          }
        }
      `,
    },
  });
  const {
    data: {
      verifyAccessToken: { isExpired },
    },
  } = data;

  return isExpired;
};
