import React from "react";

import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
// import Confirm from "./Confirm";
// import Status from "./Status";
// import Error from "./Error";

import "components/Appointment/styles.scss";

export default function Appointment(props) {
  const { time, interview } = props;
  return (
    <article className="appointment">
      <Header time={time} />
      {interview ? (
        <Show student={interview.student} interviewer={interview.interviewer} />
      ) : (
        <Empty />
      )}
    </article>
  );
}
