import React from "react";

import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const { value, interviewers, onChange } = props;
  const interviewerList = interviewers.map((item) => (
    <InterviewerListItem
      key={item.id}
      name={item.name}
      avatar={item.avatar}
      selected={value === item.id}
      setInterviewer={() => onChange(item.id)}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerList}</ul>
    </section>
  );
}
