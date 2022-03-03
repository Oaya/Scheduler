import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;
  let dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0,
  });

  //Changing text depends on the spots//
  const formatSpots = (spots) => {
    if (spots === 0) {
      return `no spots `;
    } else if (spots === 1) {
      return `1 spot `;
    } else {
      return `${spots} spots `;
    }
  };

  const onSetDay = () => {
    setDay(name);
  };

  return (
    <li
      className={dayClass}
      onClick={onSetDay}
      data-testid="day"
    >
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">
        {formatSpots(spots)} remaining
      </h3>
    </li>
  );
}
