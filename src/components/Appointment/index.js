import React from "react";

import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";

import "components/Appointment/styles.scss";

export default function Appointment(props) {
  return (
    <article className="appointment">
      {props.time ? `Appointment at ${props.time}` : `No Appointments`}
    </article>
  );
}
