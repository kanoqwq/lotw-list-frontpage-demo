import "./App.css";
import { useEffect, useState } from "react";
import List from "./components/List/List";
import ListContext from "./store/studentContext";
import useFetch from "./components/hooks/useFetch";
import configs from "./configs/config";
import loadingGif from "./assets/images/loading.gif";
import Backdrop from "./components/UI/Backdrop/Backdrop";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import ADIFileDownload from "./components/ADIFileDownload/ADIFileDownload";
function App() {
  //使用自定义钩子
  const {
    data,
    vuccData,
    fetchVuccData,
    isLoading,
    errMsg,
    qlsedData,
    qslCount,
    dataAction: getData,
  } = useFetch();
  const [isOnlyQsl, setisOnlyQsl] = useState(false);
  const [isShowLeaderboard, setIsShowLeaderboard] = useState(false);
  const [timer, setTimer] = useState(null);
  const [isShowAdifDownloadDialog, setIsShowAdifDownloadDialog] =
    useState(false);

  useEffect(() => {
    getData({
      // modify there
      url: configs.apiBaseURL + "/lotw",
    });
    fetchVuccData({
      // modify there
      url: configs.apiBaseURL + "/lotw/vuccaward",
    });
  }, [getData, fetchVuccData]);

  const getDataHandler = async (e) => {
    if (!isLoading) {
      // modify there
      let url = configs.apiBaseURL + "/lotw";
      let url2 = configs.apiBaseURL + "/lotw/vuccaward";
      //no cache
      if (e.shiftKey && e.altKey) {
        url += "?cache=no-cache";
        url2 += "?cache=no-cache";
      }
      getData({
        url,
      });
      fetchVuccData({
        // modify there
        url: url2,
      });
    } else {
      return new Promise(() => {});
    }
  };

  const getQSLHandler = () => {
    setisOnlyQsl(!isOnlyQsl);
  };

  const saveQSLHandler = async () => {
    // modify there
    window.open(configs.apiBaseURL + "/lotw/downloadfile", "_blank");
  };

  const longPressHandler = (e) => {
    let url = configs.apiBaseURL + "/lotw?cache=no-cache";
    e.target.innerHTML = "Forceload";
    return getData({
      url,
    });
  };

  const touchstartHandler = (e) => {
    e.target.style.userSelect = "none";
    timer && clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        longPressHandler(e);
      }, 800)
    );
  };

  const touchCancleHandler = (e) => {
    e.target.innerHTML = "Refresh";
    timer && clearTimeout(timer);
  };

  const toggleLeaderboard = () => {
    setIsShowLeaderboard(true);
  };

  const adifDownloadBtnHandler = () => {
    setIsShowAdifDownloadDialog(true);
  };

  return (
    <div className="App">
      {isShowAdifDownloadDialog && (
        <Backdrop
          className="center"
          onClick={() => {
            setIsShowAdifDownloadDialog(false);
          }}
        >
          <ADIFileDownload
            onClose={() => setIsShowAdifDownloadDialog(false)}
            onClick={(e) => e.stopPropagation()}
          ></ADIFileDownload>
        </Backdrop>
      )}

      {isShowLeaderboard && (
        <Backdrop
          className="center"
          onClick={() => {
            setIsShowLeaderboard(false);
          }}
        >
          <Leaderboard
            onClose={() => setIsShowLeaderboard(false)}
            onClick={(e) => e.stopPropagation()}
            data={data}
          ></Leaderboard>
        </Backdrop>
      )}
      <ListContext.Provider
        value={{
          getData: getDataHandler,
        }}
      >
        <h2>{data.length ? data[0].callsign + "'s " : ""}LotW QSO Logs</h2>
        <p>
          QSO: <b>{data.length}</b> | QSL: <b>{qslCount}</b>
        </p>
        <p>
          VUCC144: <b>{vuccData.vucc144}</b> | VUCC432:{" "}
          <b>{vuccData.vucc432}</b> | VUCC Satelite:{" "}
          <b>{vuccData.vuccSatellite}</b>
        </p>

        <div className="options">
          <button
            className="btn"
            onClick={getDataHandler}
            onTouchStart={touchstartHandler}
            onTouchEnd={touchCancleHandler}
            onTouchMove={touchCancleHandler}
            onTouchCancel={touchCancleHandler}
            onContextMenu={(e) => {
              e.preventDefault();
            }}
            disabled={isLoading}
          >
            Refresh
          </button>
          <button disabled={isLoading} className="btn" onClick={getQSLHandler}>
            {isOnlyQsl ? "Show all" : "Only QSL"}
          </button>
          <button
            disabled={isLoading}
            className="btn"
            onClick={toggleLeaderboard}
          >
            Leaderboard
          </button>
          <button disabled={isLoading} className="btn" onClick={saveQSLHandler}>
            Save as .xlsx File
          </button>
          <button
            disabled={isLoading}
            className="btn"
            onClick={adifDownloadBtnHandler}
          >
            Download ADIF
          </button>
        </div>
        {errMsg && <p>{errMsg}</p>}
        {isLoading && (
          <p className="loading">
            <img src={loadingGif} alt="" />
          </p>
        )}
        <div className="contentBox">
          {!errMsg &&
            (!isLoading ? (
              <List data={isOnlyQsl ? qlsedData : data}></List>
            ) : (
              <></>
            ))}
        </div>
      </ListContext.Provider>
      <footer className="footer">
        Made widh ❤️ by{" "}
        <a href="https://kanokano.cn" target="blank">
          MiniKano
        </a>{" "}
        &lt;
        <a
          href="https://github.com/kanoqwq/lotw-list-frontpage-demo"
          target="blank"
        >
          Source Code
        </a>{" "}
        /&gt;
      </footer>
    </div>
  );
}

export default App;
