import { useEffect, useReducer } from "react";
import axios from "axios";

export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  function reducer(state, action) {
    const {
      type,
      day,
      days,
      appointments,
      interviewers,
      interview,
      id,
    } = action;

    switch (type) {
      case SET_DAY:
        return { ...state, day };

      case SET_APPLICATION_DATA:
        return {
          ...state,
          days,
          appointments,
          interviewers,
        };

      case SET_INTERVIEW: {
        const appointment = {
          ...state.appointments[id],
          interview: interview && { ...interview },
        };

        const appointments = {
          ...state.appointments,
          [id]: appointment,
        };
        const days = updateSpots(state, appointments);
        return { ...state, appointments, days };
      }

      default:
        throw new Error(
          `No such a type of action: ${type}`
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => dispatch({ type: SET_DAY, day });

  useEffect(() => {
    const webSocket = new WebSocket(
      process.env.REACT_APP_WEBSOCKET_URL
    );
    webSocket.onmessage = (event) => {
      webSocket.send("Message Received");
      const data = JSON.parse(event.data);

      if (
        typeof data === "object" &&
        data.type === "SET_INTERVIEW"
      ) {
        return dispatch(data);
      }
    };
    return () => webSocket.close();
  }, []);

  //Get data from database when render app first time//
  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ]).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      });
    });
  }, []);

  //Create new interview with given id and interview that user put in the input field//
  function bookInterview(id, interview) {
    return axios
      .put(`/api/appointments/${id}`, {
        interview,
      })
      .then(() => {
        dispatch({
          type: SET_INTERVIEW,
          id,
          interview,
        });
      });
  }

  //Delete appointment with given id//
  function cancelInterview(id, interview) {
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
        dispatch({
          type: SET_INTERVIEW,
          id,
          interview,
        });
      });
  }
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}

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
