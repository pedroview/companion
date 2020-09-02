import { GET_NOTE, ADD_NOTE, GET_NOTES } from "../actionTypes";

export default (state = {}, { payload, type }) => {
  switch (type) {
    case GET_NOTE: {
      return { ...state, doc: payload };
    }
    case ADD_NOTE:
    case GET_NOTES: {
      return { ...state, docs: payload };
    }
    default:
      return state;
  }
};
