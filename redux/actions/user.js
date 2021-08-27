import {
  USER_LOGOUT,
  USER_LOGIN,
  NOTIFICATIONS_NOREAD_GET,
} from "../constants";
import api from "../../config/api";
export const logoutUser = () => (dispatch) => {
  dispatch({
    type: USER_LOGOUT,
  });
};
export const loginUser = (apiToken) => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetch(`${api.urlApi}/api/user`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
    })
      .then((response) => response.json())
      .then(
        async ({
          user,
          myCountsArticles,
          takeCountsArticles,
          onlyNoRead,
          notificationCounts,
          dialogsCount,
        }) => {
          user.apiToken = apiToken;
          dispatch({
            type: USER_LOGIN,
            payload: user,
          });

          dispatch({
            type: NOTIFICATIONS_NOREAD_GET,
            payload: onlyNoRead,
          });

          // dispatch({
          //   type: DIALOGS_SET_NOREAD,
          //   payload: { dialogsCount },
          // });
          resolve();
        }
      )
      .catch((e) => {
        console.log(e);
        resolve();
      });
  });
};
