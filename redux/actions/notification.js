import { NOTIFICATIONS_READ_ALL } from "../constants";

import api from "../../config/api";
// import SocketController from "../../controllers/SocketController";
export const notificationsReadAll = (apiToken) => (dispatch) => {
  // return new Promise((resolve, reject) => {
  //   fetch(`${api.urlApi}/api/notification/read-all`, {
  //     method: "post",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${apiToken}`,
  //     },
  //     body: JSON.stringify({
  //       socketId: SocketController.getSocketId(),
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then(({ error }) => {
  //       if (!error)
  //         dispatch({
  //           type: NOTIFICATIONS_READ_ALL,
  //         });
  //       resolve();
  //     });
  // });
};
