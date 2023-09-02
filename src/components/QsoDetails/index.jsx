import React, { useEffect, useState } from "react";
import classes from "./QsoDetails.module.css";
import watermark from "../../assets/images/wartermark.png";
export default function QsoDetails(props) {
  const info = props.qsoDetail;
  console.log(info);

  const [modalShow, setModalShow] = useState(false);
  useEffect(() => {
    setModalShow(true);
  }, [props.qsoDetail]);
  return (
    <div
      style={{
        backgroundImage: `${
          info.QSL === "YES" ? "url(" + watermark + ")" : "none"
        }`,
        backgroundSize: "340px",
        backgroundPosition: "right top",
        backgroundRepeat: "no-repeat",
      }}
      className={`${classes.modal}${modalShow ? " " + classes.show : ""}`}
      onClick={props.onClick}
    >
      <h3>Details</h3>
      {info.worked && (
        <p>
          Call Sign: <span className={classes.content}>{info.worked}</span>
        </p>
      )}
      {info.cqzone && (
        <p>
          CQ Zone: <span className={classes.content}>{info.cqzone}</span>
        </p>
      )}
      {info.ituzone && (
        <p>
          ITU Zone: <span className={classes.content}>{info.ituzone}</span>
        </p>
      )}
      {info.grid && (
        <p>
          GRID: <span className={classes.content}>{info.grid}</span>
        </p>
      )}
      {info.satellite && (
        <p>
          Satellite: <span className={classes.content}>{info.satellite}</span>
        </p>
      )}
      {info.mygrid && (
        <p>
          My GRID: <span className={classes.content}>{info.mygrid}</span>
        </p>
      )}

      {info.mode && (
        <p>
          Mode: <span className={classes.content}>{info.mode}</span>
        </p>
      )}
      {info.band && (
        <p>
          Band: <span className={classes.content}>{info.band}</span>
        </p>
      )}
      <p>
        IS QSL:{" "}
        <span className={classes.content}>
          {info.QSL === "YES" ? "Yes" : "No"}
        </span>
      </p>
      <p>
        {info.QSRecordId && info.QSL !== "" ? "QSL" : "QSO"} Date:
        <span className={classes.content}> {info.datetime}</span>
      </p>
      <button onClick={props.onClose} className={"btn " + classes.close}>
        Close
      </button>
    </div>
  );
}
