import React from "react";

import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const { interviewer, interviewers, onChange } = props;
  console.log(interviewers);
  const interviewerList = interviewers.map((person) => (
    <InterviewerListItem
      key={person.id}
      name={person.name}
      avatar={person.avatar}
      selected={interviewer === person.id}
      setInterviewer={() => onChange(person.id)}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerList}</ul>
    </section>
  );
}
