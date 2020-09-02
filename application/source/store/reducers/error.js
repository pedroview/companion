import { ADD_ERROR, REMOVE_ERROR } from "../actionTypes";

export default (state = null, { type, error }) => {
  switch (type) {
    case ADD_ERROR:
      return error;
    case REMOVE_ERROR:
      return null;
    default:
      return null;
  }
};
