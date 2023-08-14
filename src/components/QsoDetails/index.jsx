import React, { useEffect, useState } from "react";
import classes from "./QsoDetails.module.css";
import configs from "../../configs/config";
import loadingImg2 from "../../assets/images/loading2.gif";
import watermark from "../../assets/images/wartermark.png";
export default function QsoDetails(props) {
  const info = props.qsoDetail;
  const [errMsg, setErrMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [detailData, setDetailData] = useState();
  const [modalShow, setModalShow] = useState(false);
  useEffect(() => {
    const fetchData = async (QSRecordId) => {
      try {
        setIsLoading(true);
        setErrMsg(null);
        const res = await fetch(
          `${configs.apiBaseURL}/lotw/qsldetails?qso=${QSRecordId}`
        );
        if (res && res.ok) {
          let data = await res.json();
          setDetailData(data.data);
        } else {
          throw new Error("Failed to Fetch from LotW!");
        }
      } catch (e) {
        setErrMsg("Failed to Fetch from LotW!");
        console.log(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    //获取数据
    if (props.qsoDetail.QSRecordId) {
      fetchData(props.qsoDetail.QSRecordId);
    } else {
      setIsLoading(false);
    }
    setModalShow(true);
  }, [props.qsoDetail]);
  return (
    <div
      style={{
        backgroundImage: `${
          !isLoading && info.QSL && info.QSRecordId
            ? "url(" + watermark + ")"
            : "none"
        }`,
        backgroundSize: "340px",
        backgroundPosition: "right top",
        backgroundRepeat: "no-repeat",
      }}
      className={`${classes.modal}${modalShow ? " " + classes.show : ""}`}
      onClick={props.onClick}
    >
      {!isLoading ? (
        <>
          {errMsg ? (
            <h2>{errMsg}</h2>
          ) : (
            <>
              <h3>Details</h3>
              {detailData ? (
                <div>
                  <p>
                    Call Sign:{" "}
                    <span className={classes.content}>
                      {detailData.callSign}
                    </span>
                  </p>
                  <p>
                    CQ Zone:{" "}
                    <span className={classes.content}>{detailData.cqZone}</span>
                  </p>
                  <p>
                    ITU Zone:{" "}
                    <span className={classes.content}>
                      {detailData.ITUZone}
                    </span>
                  </p>
                  <p>
                    GRID:{" "}
                    <span className={classes.content}>{detailData.grid}</span>
                  </p>
                  <p>
                    Province:{" "}
                    <span className={classes.content}>
                      {detailData.province}
                    </span>
                  </p>
                  <p>
                    Satellite:{" "}
                    <span className={classes.content}>
                      {detailData.satellite}
                    </span>
                  </p>
                  <p>
                    My GRID:{" "}
                    <span className={classes.content}>{detailData.myGrid}</span>
                  </p>
                  <p>
                    My Province:{" "}
                    <span className={classes.content}>
                      {detailData.myProvince}
                    </span>
                  </p>
                </div>
              ) : (
                <div>
                  <p>
                    Call Sign:{" "}
                    <span className={classes.content}>{info.worked}</span>
                  </p>
                </div>
              )}
              <p>
                Frequency: <span className={classes.content}>{info.freq}</span>
              </p>
              <p>
                Mode: <span className={classes.content}>{info.mode}</span>
              </p>
              <p>
                Band: <span className={classes.content}>{info.band}</span>
              </p>
              <p>
                IS QSL:{" "}
                <span className={classes.content}>
                  {info.QSL ? "Yes" : "No"}
                </span>
              </p>
              <p>
                {info.QSRecordId && info.QSL !== "" ? "QSL" : "QSO"} Date:
                <span className={classes.content}> {info.datetime}</span>
              </p>
              <button
                onClick={props.onClose}
                className={"btn " + classes.close}
              >
                Close
              </button>
            </>
          )}
        </>
      ) : (
        <div className={classes.loading}>
          <img src={loadingImg2} alt="" />
          <p>Fetching from LotW...</p>
        </div>
      )}
    </div>
  );
}
