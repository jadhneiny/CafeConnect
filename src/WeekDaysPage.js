import React from "react";
import "./App.css";
import { WeekDaysData } from "./WeekDaysData";
import { useNavigate } from "react-router-dom";

function WeekDaysPage() {
  const navigate = useNavigate();

  return (
    <div className="WeekDaysPage">
      <ul className="WeekDaysList">
        {WeekDaysData.map((val, key) => {
          return (
            <li
              key={key}
              className="row"
              id={window.location.pathname === val.link ? "active" : ""}
              onClick={() => navigate(val.link)}
            >
              <div id="icon">{val.icon}</div>
              <div id="title">{val.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default WeekDaysPage;
