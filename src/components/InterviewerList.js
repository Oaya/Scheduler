import React from "react";
import PropTypes from 'prop-types'

import InterviewerListItem from "./InterviewerListItem";

import "components/InterviewerList.scss";

export default function InterviewerList({ interviewer, interviewers, onChange }) {

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


InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};


