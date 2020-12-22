import React, { Fragment, useContext, useEffect } from "react";
import { Form } from "../components/Form";
import { Loader } from "../components/Loader";
import { Notes } from "../components/Notes";
import { AlertContext } from "../context/alert/alertContext";
import { FirebaseContext } from "../context/firebase/firebaseContext";

export const Home = () => {
  const { notes, loading, fetchNotes, removeNote } = useContext(
    FirebaseContext
  );
  const alert = useContext(AlertContext);
  useEffect(() => {
    fetchNotes();
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Form />
      <hr />
      {loading ? <Loader /> : <Notes notes={notes} onRemove={removeNote} alert={alert}/>}
    </Fragment>
  );
};
