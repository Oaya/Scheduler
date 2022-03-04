import React, { useState } from "react";

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const [student, setStudent] = useState(
    props.student || ""
  );
  const [interviewer, setInterviewer] = useState(
    props.interviewer || null
  );
  const [error, setError] = useState("");

  //Reset student and interviewer's state //
  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };

  const cancelAppointment = () => {
    reset();
    props.onCancel();
  };

  //Check student name and interviewer filed is filled or not//
  const validate = () => {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    } else if (interviewer === null) {
      setError("Pick a interviewer");
      return;
    }
    setError("");

    props.onSave(student, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form
          autoComplete="off"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            data-testid="student-name-input"
            value={student}
            onChange={(e) => setStudent(e.target.value)}
          />
        </form>
        <section className="appointment__validation">
          {error}
        </section>
        <InterviewerList
          interviewers={props.interviewers}
          onChange={setInterviewer}
          interviewer={interviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancelAppointment}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
