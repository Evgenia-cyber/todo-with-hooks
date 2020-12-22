import React, { useContext, useState } from "react";
import { AlertContext } from "../context/alert/alertContext";
import { FirebaseContext } from "../context/firebase/firebaseContext";

export const Form = () => {
  const [value, setValue] = useState("");
  const alert = useContext(AlertContext);
  const firebase = useContext(FirebaseContext);

  const submitHandler = (event) => {
    event.preventDefault();
    if (value.trim()) {
      firebase
        .addNote(value.trim())
        .then(() => {
          alert.show("Note was created", "success");
        })
        .catch((error) => {
          alert.show("Somthing is wrong ...", "danger");
        });
      alert.show("Note was created", "success");
      setValue("");
    } else {
      alert.show("Enter a title for the note!");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Enter a title for the note"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </div>
    </form>
  );
};
