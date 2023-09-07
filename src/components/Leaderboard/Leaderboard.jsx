import React, { useEffect, useState } from "react";
import classes from "./Leaderboard.module.css";
export default function Leaderboard(props) {
  let [isShow, setIsShow] = useState(false);
  const [mostQslCallSign, setMostQslCallSign] = useState({});
  const [mostWorkedSatellite, setWorkedSatellite] = useState({});
  console.log(props.data);
  useEffect(() => {
    //process most qsl callsign
    let QSLCount = {};
    let satelliteCount = {};
    props.data.forEach((item) => {
      if (item.QSL !== "NO") {
        if (QSLCount[item.worked] === undefined) {
          QSLCount[item.worked] = 1;
        } else {
          QSLCount[item.worked] += 1;
        }
        if (item.satellite) {
          if (satelliteCount[item.satellite] === undefined) {
            satelliteCount[item.satellite] = 1;
          } else {
            satelliteCount[item.satellite] += 1;
          }
        }
      }
    });
    setIsShow(true);
    setMostQslCallSign(QSLCount);
    setWorkedSatellite(satelliteCount);
  }, [props.data, setIsShow]);

  console.log(mostWorkedSatellite);
  let mostWorkedCallSignNumber = Math.max.apply(
    Math,
    Object.keys(mostQslCallSign).map((item) => mostQslCallSign[item])
  );

  let mostWorkedCallSignName = Object.keys(mostQslCallSign).find(
    (item) => mostQslCallSign[item] === mostWorkedCallSignNumber
  );

  let mostWorkedSatelliteNumber = Math.max.apply(
    Math,
    Object.keys(mostWorkedSatellite).map((item) => mostWorkedSatellite[item])
  );

  let mostWorkedSatelliteName = Object.keys(mostWorkedSatellite).find(
    (item) => mostWorkedSatellite[item] === mostWorkedSatelliteNumber
  );

  return (
    <div onClick={props.onClick} className={`modal${isShow ? " show" : ""}`}>
      <div className={classes.header}>
        <h3>Leaderboard</h3>
        <button className="btn" onClick={props.onClose}>
          Close
        </button>
      </div>
      <hr />
      <div className={classes.content}>
        <h4>❤️ Most Worked</h4>
        <p style={{ marginTop: 0 }}>
          <b>Callsign: {mostWorkedCallSignName} </b>for{" "}
          <span className={classes.number}>{mostWorkedCallSignNumber}</span>{" "}
          times
        </p>
        <p>
          <b>Satellite: {mostWorkedSatelliteName} </b>for{" "}
          <span className={classes.number}>{mostWorkedSatelliteNumber}</span>{" "}
          times
        </p>
        <h4>🍻 Callsign list</h4>
        <div className={classes.leaderboard}>
          {Object.keys(mostQslCallSign).map((key) => {
            return (
              <p className={classes.item} key={key}>
                {key}:{" "}
                <span className={classes.number}>{mostQslCallSign[key]}</span>
              </p>
            );
          })}
        </div>
        <h4>🍻 Satellite list</h4>
        <div className={classes.leaderboard}>
          {Object.keys(mostWorkedSatellite).map((key) => {
            return (
              <p className={classes.item} key={key}>
                {key}:{" "}
                <span className={classes.number}>{mostWorkedSatellite[key]}</span>
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
