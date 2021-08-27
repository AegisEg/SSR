import {
  GEOARTICLE_SET_LOCATION,
} from "../constants";

const INITIAL_STATE = {
  articles: [],
  isGetted: false,
  isFetching: true,
};

const geoarticle = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GEOARTICLE_SET_LOCATION: {
      return {
        ...state,
        articles: state.articles.map((item) => {
          if (item._id === action.payload.articleId)
            return {
              ...item,
              lastCarrierLocation: action.payload.location,
            };
          else return item;
        }),
      };
    }
    
    default:
      return state;
  }
};

export default geoarticle;
