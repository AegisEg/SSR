import { DIALOGS_SET_NOREAD } from "../constants";

const INITIAL_STATE = {
  dialogsALL: {
    isFetching: true,
    dialogs: [],
    canLoad: false,
    isGetted: false,
    noReadCount: 0,
  },
};

const dialogs = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DIALOGS_SET_NOREAD: {
      return {
        ...state,
        dialogsOrder: {
          ...state.dialogsOrder,
          noReadCount: action.payload.dialogsCount.order
            ? action.payload.dialogsCount.order.count
            : 0,
        },
        dialogsUser: {
          ...state.dialogsUser,
          noReadCount: action.payload.dialogsCount.user
            ? action.payload.dialogsCount.user.count
            : 0,
        },
        dialogsALL: {
          ...state.dialogsALL,
          noReadCount:
            (action.payload.dialogsCount.user
              ? action.payload.dialogsCount.user.count
              : 0) +
            (action.payload.dialogsCount.order
              ? action.payload.dialogsCount.order.count
              : 0),
        },
      };
    }

    default:
      return state;
  }
};

export default dialogs;
