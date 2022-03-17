import React, { useEffect } from "react";

import useVisualMode from "hooks/useVisualMode";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";

import "components/Appointment/styles.scss";

//Mode for Appointment//
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment({
  id,
  time,
  interview,
  interviewers,
  bookInterview,
  cancelInterview,
}) {
  //Custom Hook//
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  useEffect(() => {
    if (interview && mode === EMPTY) {
      transition(SHOW);
    }
    if (interview === null && mode === SHOW) {
      transition(EMPTY);
    }
  }, [interview, transition, mode]);

  //Cancel the action and  back to the previous mode//
  function onCancel() {
    back();
  }

  function onTransition() {
    transition(CONFIRM);
  }

  function onEdit() {
    transition(EDIT);
  }

  function onClose() {
    back();
  }

  function onSave(name, interviewer) {
    transition(SAVING, true);

    const interview = {
      student: name,
      interviewer,
    };

    bookInterview(id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch((err) => {
        transition(ERROR_SAVE, true);
      });
  }

  function onDelete() {
    transition(DELETING);

    cancelInterview(id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((err) => {
        transition(ERROR_DELETE, true);
      });
  }

  return (
    <article
      className="appointment"
      data-testid="appointment"
    >
      <Header time={time} />
      {/* {mode === EMPTY && (
        <Empty onAdd={() => transition(CREATE)} />
      )} */}
      {(mode === EMPTY || mode === SHOW) && !interview && (
        <Empty onAdd={() => transition(CREATE)} />
      )}
      {(mode === EMPTY || mode === SHOW) && interview && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={onTransition}
          onEdit={onEdit}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={onCancel}
          onSave={onSave}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onCancel={onCancel}
          onConfirm={onDelete}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={interviewers}
          onCancel={onCancel}
          onSave={onSave}
          student={interview.student}
          interviewer={interview.interviewer.id}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Could not delete appointment"
          onClose={onClose}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="Could not save appointment"
          onClose={onClose}
        />
      )}
    </article>
  );
}
