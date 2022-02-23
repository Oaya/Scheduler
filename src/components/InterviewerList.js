import React from "react";

import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const { interviewer, interviewers, setInterviewer } = props;
  const interviewerList = interviewers.map((item) => (
    <InterviewerListItem
      key={item.id}
      id={item.id}
      name={item.name}
      avatar={item.avatar}
      selected={interviewer === item.id}
      setInterviewer={setInterviewer}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerList}</ul>
    </section>
  );
}
