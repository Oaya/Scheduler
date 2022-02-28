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

//MODE FOR APPOINTMENT//
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment({
  id,
  time,
  interview,
  interviewers,
  bookInterview,
}) {
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  function cancelAppointment() {
    back();
  }

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    bookInterview(id, interview);
    transition(SHOW);
  }

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show student={interview.student} interviewer={interview.interviewer} />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={cancelAppointment}
          onSave={save}
        />
      )}
    </article>
  );
}
