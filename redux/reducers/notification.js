import { NOTIFICATIONS_NOREAD_GET } from "../constants";
import settings from "../../config/settings";
const INITIAL_STATE = {
  all: {
    isFetching: true,
    isGetted: false,
    notifications: [],
    noRead: 0,
    onlyNoread: [],
    canLoad: true,
  },
  offer: {
    isFetching: true,
    isGetted: false,
    notifications: [],
    noRead: 0,
    canLoad: true,
  },
  order: {
    isFetching: true,
    isGetted: false,
    notifications: [],
    noRead: 0,
    canLoad: true,
  },
  system: {
    isFetching: true,
    isGetted: false,
    notifications: [],
    noRead: 0,
    canLoad: true,
  },
  tariff: {
    isFetching: true,
    isGetted: false,
    notifications: [],
    noRead: 0,
    canLoad: true,
  },
};

const notifications = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NOTIFICATIONS_NOREAD_GET: {
      return {
        ...state,
        all: {
          ...state.all,
          onlyNoread: action.payload,
        },
      };
    }

    default:
      return state;
  }
};

export default notifications;
