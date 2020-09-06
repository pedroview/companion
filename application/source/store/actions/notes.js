import { GET_NOTES } from "../actionTypes";
import { addError, removeError } from "./error";

const DataStore = require("react-native-local-mongodb"),
  db = new DataStore({ filename: "notes", autoload: true });

export const getNotes = () => {
  return async (dispatch) => {
    await db.findAsync({}, async (err, notes) => {
      if (err) {
        await dispatch(addError(err));
      } else {
        await dispatch({ type: GET_NOTES, payload: notes });
        await dispatch(removeError());
      }
    });
  };
};

export const addNote = ({ title, body }) => {
  return async (dispatch) => {
    const date = new Date().toDateString();
    const note = { title, body, priority: "moderate", dateCreated: date, lastUpdate: date };
    await db.insertAsync(note, async (err) => {
      if (err) {
        await dispatch(addError(err));
      } else {
        await dispatch(removeError());
      }
    });
  };
};

export const editNote = ({ newTitle, newBody, _id, dateCreated }) => {
  return async (dispatch) => {
    const lastUpdate = new Date().toDateString();
    await db.updateAsync(
      { dateCreated, _id },
      { $set: { title: newTitle, body: newBody, lastUpdate } },
      { multi: false },
      async (err, numUpd) => {
        if (err) {
          await dispatch(addError(err));
        } else {
          await dispatch(removeError());
        }
      }
    );
  };
};
export const editPriority = ({ _id, dateCreated, priority }) => {
  return async (dispatch) => {
    const lastUpdate = new Date().toDateString();
    await db.updateAsync({ dateCreated, _id }, { $set: { priority, lastUpdate } }, { multi: false }, async (err, numUpd) => {
      if (err) {
        await dispatch(addError(err));
      } else {
        await dispatch(removeError());
      }
    });
  };
};

export const deleteNote = ({ _id, dateCreated }) => {
  return async (dispatch) => {
    await db.removeAsync({ _id, dateCreated }, async (err, numUpd) => {
      if (err) {
        await dispatch(addError(err));
      } else {
        await dispatch(removeError());
      }
    });
  };
};
