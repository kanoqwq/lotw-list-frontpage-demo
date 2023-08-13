import React, { useEffect, useState } from "react";
import classes from "./QsoDetails.module.css";

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
        const res = await fetch(`/lotw-get/lotw/qsldetails?qso=${QSRecordId}`);
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
  }, [props.qsoDetail, modalShow, setModalShow]);
  return (
    <div
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
                {info.QSRecordId ? "QSL" : "QSO"} Date:
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
          <img src="/img/loading2.gif" alt="" />
          <p>Fetching from LotW...</p>
        </div>
      )}
    </div>
  );
}
