export function getAppointmentsForDay(state, day) {
  //find the object match with provided day
  const appointmentDayId = state.days.filter(
    (stateDay) => stateDay.name === day
  );
  const appointmentsIds = appointmentDayId[0];
  const appointment = [];

  //check the case that only have  appointment//

  if (appointmentsIds === undefined) {
    return appointment;
  } else {
    appointmentsIds.appointments.forEach((element) => {
      console.log(element);
      appointment.push(state.appointments[element]);
    });
    console.log("appointment", appointment);
    return appointment;
  }
}
