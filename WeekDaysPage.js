import React from 'react'
import '../App.css';
import { WeekDaysData } from './WeekDaysData';

function WeekDaysPage() {
  return (
    <div className="WeekDaysPage">
        <ul className="WeekDaysList">
        {WeekDaysData.map((val,key) => {
           return(
            <li key={key}
            className="row"
            id={window.location.pathname === val.link? "active" : ""}
            onClick={() => {
                window.location.pathname = val.link;
                }}
            >   <div id="icon">{val.icon}</div>
                <div id="title">{val.title}</div>
            </li>
          );
        })}
        </ul>
    </div>
  );
}

export default WeekDaysPage;