import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) =>
    setState({
      ...state,
      day,
    });

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

  function updateSpots(state, appointments, id) {
    const currentDay = state.days.find(
      (dayItem) => dayItem.name === state.day
    );
    let spots = 0;
    for (const id of currentDay) {
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

  function countSpots(increment) {
    let days = state.days;

    const currentDay = days.find(
      (dayItem) => dayItem.name === state.day
    );
    const newCurrentDay = {
      ...currentDay,
      spots: currentDay.spots + increment,
    };

    // console.log(currentDay);
    // console.log(newCurrentDay);
    return days.map((dayItem) =>
      dayItem.name === currentDay.name
        ? newCurrentDay
        : dayItem
    );
  }

  //Create new interview with given id and interview that user put in the input field//
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {
        ...interview,
      },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const editing = appointment.interview !== null;
    let days = [...state.days];

    //wait until put the data to database and then

    return axios
      .put(`/api/appointments/${id}`, {
        interview,
      })
      .then((res) => {
        if (!editing) {
          days = countSpots(-1);
        }
        countSpots(state, id);
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
        const days = countSpots(1);
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
