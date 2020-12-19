import axios from "axios";
import Cookies from "js-cookie";

const apiKey = process.env.REACT_APP_API_KEY;
const MINUTES_IN_DAY = 1440;
const COOKIE_EXPIRATION_DATE = (1 / MINUTES_IN_DAY) * 10;
const BASE_URL = "http://127.0.0.1:8000";
//const BASE_URL = 'https://article-django-react-app.herokuapp.com'

export const checkIfUserIsLoggedIn = async () => {
  const csrftoken = Cookies.get("csrftoken");

  const res = await axios({
    url: `${BASE_URL}/graphql/`,
    method: "post",
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
    data: {
      data: { me },
    },
  } = res;
  const userIsLoggedIn = me !== null;

  return userIsLoggedIn;
};

export const refreshTokenSilently = async () => {
  const csrftoken = Cookies.get("csrftoken");

  const res = await axios({
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
            success
            errors
          }
        }
      `,
    },
  });

  const {
    data: {
      data: {
        refreshToken: {
          payload: { exp },
        },
      },
    },
  } = res;
  const expirationDate = exp * 1000;

  Cookies.set("tokenExpiration", expirationDate, {
    expires: COOKIE_EXPIRATION_DATE,
  });
};
