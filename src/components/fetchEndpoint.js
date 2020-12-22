import axios from "axios";
import Cookies from "js-cookie";

const ONE_DAY = 1;
const MINUTES_IN_DAY = 1440;
const EXPIRATION_IN_MINUTES = 16;
const COOKIE_EXPIRATION_DATE =
  (ONE_DAY / MINUTES_IN_DAY) * EXPIRATION_IN_MINUTES;

const apiKey = process.env.REACT_APP_API_KEY;
const BASE_URL = "http://127.0.0.1:8000";
//const BASE_URL = 'https://article-django-react-app.herokuapp.com'

export const checkIfUserIsLoggedIn = async () => {
  const csrftoken = Cookies.get("csrftoken");

  const { data } = await axios({
    url: `${BASE_URL}/graphql/`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: apiKey,
      "X-CSRFToken": csrftoken,
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

  const data = await axios({
    url: `${BASE_URL}/graphql/`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: apiKey,
      "X-CSRFToken": csrftoken,
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

  const {
    data: {
      refreshToken: {
        payload: { exp },
      },
    },
  } = data;
  const expirationDate = exp * 1000;

  return Cookies.set("tokenExpiration", expirationDate, {
    expires: COOKIE_EXPIRATION_DATE,
  });
};
