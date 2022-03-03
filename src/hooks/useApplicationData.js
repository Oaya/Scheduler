import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => setState({ ...state, day });

  //Get data from database when render app first time//
  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  //Update spots number for the state when user create, edit or delete the appointment//
  function updateSpots(state, appointments) {
    const currentDay = state.days.find(
      (dayItem) => dayItem.name === state.day
    );
    let spots = 0;
    for (const id of currentDay.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }
    const newDay = { ...currentDay, spots };
    const newDays = state.days.map((day) =>
      day.name === state.day ? newDay : day
    );

    return newDays;
  }

  //Create new interview with given id and interview that user put in the input field//
  function bookInterview(id, interview) {
    //update the appointment interview //
    const appointment = {
      ...state.appointments[id],
      interview: {
        ...interview,
      },
    };

    //update the appointments//
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    //Wait until put the data to database and change the state//
    return axios
      .put(`/api/appointments/${id}`, {
        interview,
      })
      .then((res) => {
        const days = updateSpots(state, appointments);

        setState((prev) => ({
          ...prev,
          appointments,
          days,
        }));
      });
  }

  //Delete appointment with given id//
  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`/api/appointments/${id}`)
      .then((res) => {
        const days = updateSpots(state, appointments);
        setState((prev) => ({
          ...prev,
          appointments,
          days,
        }));
      });
  }
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
