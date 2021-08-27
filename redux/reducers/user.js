import { USER_LOGIN, USER_LOGOUT } from "../constants";

const initialState = {
  isAuth: false,
  tariff: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "__NEXT_REDUX_WRAPPER_HYDRATE__": {
      return action.payload.user;
    }
    case USER_LOGIN: {
      return {
        ...state,
        ...action.payload,
        isAuth: true,
      };
    }
    case USER_LOGOUT:
      return { isAuth: false };
    default:
      return state;
  }
};
