import { SET_CURRENT_USER } from "../actionTypes";
import { addError, removeError } from "./error";

const DataStore = require("react-native-local-mongodb"),
  db = new DataStore({ filename: "companion", autoload: true });

export const persistUser = () => {
  return async (dispatch) => {
    // db.remove({ handle: "Pedro JR" });
    await db.find({}, async (err, docs) => {
      if (err) {
        await dispatch(addError(err));
      } else {
        const handle = docs.length >= 1 ? docs[0].handle : null;
        await dispatch({ type: SET_CURRENT_USER, payload: handle });
        await dispatch(removeError());
      }
    });
  };
};

export const createUser = ({ handle }) => {
  return async (dispatch) => {
    db.insert({ handle }, async (err) => {
      if (err) {
        await dispatch(addError(err));
      } else {
        await dispatch({ type: SET_CURRENT_USER, payload: handle });
        await dispatch(removeError());
      }
    });
  };
};
