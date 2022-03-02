import { useState, useEffect } from 'react'
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });
  // const setDays = (days) => setState((prev) => ({ ...prev, days }));

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

  function countSpots(increment) {
    let days = state.days

    const currentDay = days.find((dayItem) => dayItem.name === state.day)
    const newDay = { ...currentDay, spots: currentDay.spots + increment }

    console.log(currentDay);
    console.log(newDay);
    return days.map((dayItem) => (dayItem.name === currentDay.name ? newDay : dayItem))
  }

  //Create new interview with given id and interview that user put in the input field//
  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };


    const editing = appointment.interview !== null
    let days = [...state.days];


    //wait until put the data to database and then

    return axios.put(`/api/appointments/${id}`, { interview })
      .then((res) => {
        if (!editing) {
          days = countSpots(-1)
        }
        setState((prev) => ({
          ...prev,
          appointments,
          days
        }));
      });
  }



  //Delete appointment with given id//

  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        const days = countSpots(1)
        setState((prev) => ({
          ...prev,
          appointments,
          days
        }))

      })
  }
  return { state, setDay, bookInterview, cancelInterview }

}
