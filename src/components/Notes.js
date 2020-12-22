import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export const Notes = ({ notes, onRemove, alert }) => {
  return (
    <TransitionGroup component="ul" className="list-group">
      {notes.map((note) => (
        <CSSTransition key={note.id} classNames="noteItem" timeout={800}>
          <li className="list-group-item note">
            <div>
              <b>{note.title}</b>
              <small>{note.date}</small>
            </div>
            <button
              onClick={() => {
                onRemove(note.id);
                alert.show("Note was deleted", "danger");
              }}
              type="button"
              className="btn btn-outline-danger btn-sm"
            >
              &times;
            </button>
          </li>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};
