import { SET_CURRENT_USER } from "../actionTypes";
import { Dimensions } from "react-native";

const initialState = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};

export default (state = initialState, { payload, type }) => {
  switch (type) {
    case SET_CURRENT_USER: {
      return { ...state, companion: payload };
    }
    default:
      return state;
  }
};
