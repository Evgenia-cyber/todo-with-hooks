import axios from "axios";
import React, { useReducer } from "react";
import { FirebaseContext } from "./firebaseContext";
import {
  ADD_NOTE,
  FETCH_NOTES,
  firebaseReducer,
  REMOVE_NOTE,
  SHOW_LOADER,
} from "./firebaseReducer";
const url = process.env.REACT_APP_DB_URL;

export const FirebaseState = ({ children }) => {
  const initialState = {
    notes: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(firebaseReducer, initialState);

  const showLoader = () => dispatch({ type: SHOW_LOADER });
  const fetchNotes = async () => {
    showLoader();
    const response = await axios.get(`${url}/notes.json`);
    const payload=Object.keys(response.data).map((key) => {
      return { ...response.data[key], id: key };
    });
    dispatch({ type: FETCH_NOTES, payload });
  };
  const addNote = async (title) => {
    const note = {
      title,
      date: new Date().toJSON(),
    };
    try {
      const response = await axios.post(`${url}/notes.json`, note);
      // console.log("addNote", response.data);
      const payload = { ...note, id: response.data.name };
      dispatch({ type: ADD_NOTE, payload });
    } catch (e) {
      throw new Error(e.message);
    }
  };
  const removeNote = async (id) => {
    await axios.delete(`${url}/notes/${id}.json`);
    dispatch({ type: REMOVE_NOTE, id });
  };

  return (
    <FirebaseContext.Provider
      value={{
        showLoader,
        fetchNotes,
        addNote,
        removeNote,
        loading: state.loading,
        notes: state.notes,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
