export function getAppointmentsForDay(state, day) {

  //find the object match with provided day
  const appointmentDayId = state.days.filter(
    (stateDay) => stateDay.name === day
  );
  const appointmentsIds = appointmentDayId[0];
  const appointment = [];

  //check the cases that have appointments//
  if (appointmentsIds === undefined) {
    return appointment;
  } else {
    appointmentsIds.appointments.forEach((element) => {
      appointment.push(state.appointments[element]);
    });

    return appointment;
  }
}

export function getInterview(state, interview) {
  //return new object that containing the interviewer and student.
  if (!interview) {
    return null;
  } else {
    const student = interview.student;
    const interviewer = state.interviewers[interview.interviewer];
    return { student, interviewer };
  }
}

export function getInterviewersForDay(state, day) {
  //find the object match with provided day
  const interviewersId = state.days.filter((stateDay) => stateDay.name === day);
  const interviewersIds = interviewersId[0];
  const interviewers = [];

  //check the cases that have interviewers//
  if (interviewersIds === undefined) {
    return interviewers;
  } else {
    interviewersIds.interviewers.forEach((element) => {
      interviewers.push(state.interviewers[element]);
    });

    return interviewers;
  }
}
