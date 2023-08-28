import React, { useEffect, useState } from "react";
import classes from "./ADIFileDownload.module.css";
import CheckBox from "../UI/CheckBox/CheckBox";
import configs from "../../configs/config";
export default function ADIFileDownload(props) {
  let [isShow, setIsShow] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  let [date, setDate] = useState("");
  let [errMsg, setErrMsg] = useState("");
  let [isIncludeQsl, setIsIncludeQsl] = useState(false);
  let [isIncludeQsoStationDetails, setIsIncludeQsoStationDetails] =
    useState(false);
  useEffect(() => {
    setIsShow(true);
  }, [setIsShow]);

  const downladHandler = async () => {
    setErrMsg("");
    if (date) {
      //download
      if (!isLoading) {
        try {
          setIsLoading(true);
          let url = `${configs.apiBaseURL}/lotw/adif.adi`;
          let queryString = new URLSearchParams({
            qso_query: 1,
            qso_withown: "yes",
            qso_qslsince: date,
            qso_owncall: "",
            qso_qsldetail: isIncludeQsl ? "yes" : "",
            qso_mydetail: isIncludeQsoStationDetails ? "yes" : "",
          }).toString();

          let res = await fetch(url + "?" + queryString, { method: "get" });

          if (res && res.ok) {
            if (res.headers.get("Content-Type").includes("application/json")) {
              let err = await res.json();
              throw new Error(err.message);
            }

            const fileName = decodeURIComponent(
              res.headers
                .get("Content-Disposition")
                .replace("attachment; filename=", "")
            );
            res.blob().then((blob) => {
              if (window.navigator.msSaveOrOpenBlob) {
                navigator.msSaveBlob(blob, fileName); //IE10
              } else {
                let a = document.createElement("a");
                document.body.appendChild(a); //兼容火狐，将a标签添加到body当中
                let url = window.URL.createObjectURL(blob); // 获取 blob 本地文件连接 (blob 为纯二进制对象，不能够直接保存到磁盘上)
                a.href = url;
                a.download = fileName;
                a.target = "_blank"; // a标签增加target属性
                a.click();
                a.remove(); //移除a标签
                window.URL.revokeObjectURL(url);
              }
            });
          } else {
            throw new Error(res.message);
          }
        } catch (e) {
          setErrMsg(e.message ? e.message : "NetWork Error");
        } finally {
          setIsLoading(false);
        }
      }
    } else {
      setErrMsg("Require date !");
      console.log("Require date");
    }
  };
  return (
    <div
      onClick={props.onClick}
      className={`${classes.modal}${isShow ? " " + classes.show : ""}`}
    >
      <div className={classes.header}>
        <h3>Download AIDF</h3>
        <button className="btn" onClick={props.onClose}>
          Close
        </button>
      </div>
      <hr />
      <div className={classes.content}>
        <div className={classes.item}>
          <label>
            QSLs date start:{" "}
            <input
              className={classes.datePicker}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
        </div>
        <div className={classes.item}>
          <label>
            QSL details{" "}
            <CheckBox
              style={{ verticalAlign: " bottom" }}
              checked={isIncludeQsl}
              onChange={(checked) => setIsIncludeQsl(checked)}
            ></CheckBox>
          </label>
        </div>
        <div className={classes.item}>
          <label>
            QSO station details{" "}
            <CheckBox
              style={{ verticalAlign: " bottom" }}
              checked={isIncludeQsoStationDetails}
              onChange={(checked) => setIsIncludeQsoStationDetails(checked)}
            ></CheckBox>
          </label>
        </div>
        <p className={classes.actions} style={{ margin: "0" }}>
          <button
            className={"btn"}
            onClick={downladHandler}
            style={{ margin: "0" }}
          >
            {isLoading ? "Loading..." : "Download"}
          </button>
          <p className={classes.info}>{errMsg}</p>
        </p>
      </div>
    </div>
  );
}
