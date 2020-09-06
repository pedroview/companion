import { GET_NOTES } from "../actionTypes";

export default (state = {}, { payload, type }) => {
  switch (type) {
    case GET_NOTES: {
      return { ...state, docs: payload };
    }
    default:
      return state;
  }
};
