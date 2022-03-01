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

  //Create new interview with given id and interview that user put in the input field//
  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    //wait until put the data to database and then

    return axios.put(`/api/appointments/${id}`, { interview })
      .then((res) => {
        console.log(res);

        setState((prev) => ({
          ...prev,
          appointments,
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
        console.log(res);
        setState((prev) => ({
          ...prev,
          appointments
        }))

      })
  }
  return { state, setDay, bookInterview, cancelInterview }

}
