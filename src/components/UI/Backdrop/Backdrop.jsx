import React from "react";
import { createPortal } from "react-dom";
import classes from "./Backdrop.module.css";
const BackdropRoot = document.body;
function Backdrop(props) {
  return createPortal(
    <div
      id={props.id}
      className={`${classes.Backdrop}${
        props.className ? " " + props.className : ""
      }`}
      onClick={props.onClick}
    >
      {props.children}
    </div>,
    BackdropRoot
  );
}

//使用memo包装UI组件，当组件props没有发生变化时候无需进行重复渲染
export default React.memo(Backdrop);
