import React from "react";
import classes from "./CheckBox.module.css";
export default function CheckBox(props) {
  let isChecked = props.checked;
  const clickHandler = () => {
    props.onChange(!isChecked);
  };
  return (
    <div
      style={props.style}
      className={`${props.className} ${classes.checkbox}${
        isChecked ? " " + classes.checkedColor : ""
      }`}
      onClick={clickHandler}
    >
      <div
        className={`${classes.dot}${isChecked ? " " + classes.checked : ""}`}
      ></div>
    </div>
  );
}
