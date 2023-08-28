import React, { useEffect, useState } from "react";
import classes from "./Leaderboard.module.css";
export default function Leaderboard(props) {
  let { callsignCount } = props;
  let [isShow, setIsShow] = useState(false);
  let mostWorkedNumber = Math.max.apply(
    Math,
    Object.keys(callsignCount).map((item) => callsignCount[item])
  );
  let mostWorked = Object.keys(callsignCount).find(
    (item) => callsignCount[item] === mostWorkedNumber
  );
  useEffect(() => {
    setIsShow(true);
  }, [setIsShow]);
  return (
    <div
      onClick={props.onClick}
      className={`modal${isShow ? " show": ""}`}
    >
      <div className={classes.header}>
        <h3>Leaderboard</h3>
        <button className="btn" onClick={props.onClose}>
          Close
        </button>
      </div>
      <hr />
      <p>
        <b>Most Worked: {mostWorked} </b>for{" "}
        <span className={classes.number}>{mostWorkedNumber}</span> times
      </p>
      <div className={classes.leaderboard}>
        {Object.keys(callsignCount).map((key) => {
          return (
            <p className={classes.item} key={key}>
              {key}:{" "}
              <span className={classes.number}>{callsignCount[key]}</span>
            </p>
          );
        })}
      </div>
    </div>
  );
}
