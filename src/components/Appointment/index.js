import React from "react";

import useVisualMode from "hooks/useVisualMode";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";

// import Confirm from "./Confirm";
// import Status from "./Status";
// import Error from "./Error";

import "components/Appointment/styles.scss";
import Status from "./Status";

//MODE FOR APPOINTMENT//
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING"
const DELETING = 'DELETING'

export default function Appointment({
  id,
  time,
  interview,
  interviewers,
  bookInterview,
  cancelInterview
}) {
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  function cancel() {

    back();
  }

  function save(name, interviewer) {
    transition(SAVING)
    const interview = {
      student: name,
      interviewer,
    };
    bookInterview(id, interview)
      .then(() => {
        transition(SHOW);
      });
  }

  function onDelete() {
    transition(DELETING)
    cancelInterview(id)
      .then(() => {
        transition(EMPTY)
      })

  }

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show student={interview.student} interviewer={interview.interviewer} onDelete={onDelete} />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={cancel}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
    </article>
  );
}
