import { GET_NOTE, ADD_NOTE, GET_NOTES } from "../actionTypes";
import { addError, removeError } from "./error";

const DataStore = require("react-native-local-mongodb"),
  db = new DataStore({ filename: "notes", autoload: true });

export const getNotes = () => {
  return async (dispatch) => {
    await db.find({}, async (err, notes) => {
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
    await db.insert(note, async (err) => {
      if (err) {
        await dispatch(addError(err));
      } else {
        await dispatch({ type: ADD_NOTE, payload: note });
        await dispatch(removeError());
      }
    });
  };
};

export const getNote = ({ title, id }) => {
  return async (dispatch) => {
    await db.find({ title, id }, async (err, note) => {
      if (err) {
        await dispatch(addError(err));
      } else {
        const firstNote = note.length >= 1 ? note[0] : null;
        await dispatch({ type: GET_NOTE, payload: firstNote });
        await dispatch(removeError());
      }
    });
  };
};

export const editNote = ({ oldTitle, oldId, note }) => {
  return async (dispatch) => {
    const date = new Date().toDateString();
    const { title, priority, body } = note;
    await db.update(
      { title: oldTitle, id: oldId },
      { $set: { title, priority, body, lastUpdate: date } },
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

export const deleteNote = ({ title, id }) => {
  return async (dispatch) => {
    await db.remove({ title, id }, async (err, numUpd) => {
      if (err) {
        await dispatch(addError(err));
      } else {
        await dispatch(removeError());
      }
    });
  };
};
