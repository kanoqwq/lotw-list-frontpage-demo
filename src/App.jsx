import "./App.css";
import { useEffect, useState } from "react";
import List from "./components/List/List";
import ListContext from "./store/studentContext";
import useFetch from "./components/hooks/useFetch";
import { throttleAsync } from "./tools/throttleAsync";
import configs from "./configs/config";
import loadingGif from "./assets/images/loading.gif";
import Backdrop from "./components/UI/Backdrop/Backdrop";
import Leaderboard from "./components/Leaderboard/Leaderboard";
function App() {
  //使用自定义钩子
  const {
    data,
    vuccData,
    fetchVuccData,
    isLoading,
    errMsg,
    filteredData,
    qslCount,
    mostQslCallSign,
    dataAction: getData,
  } = useFetch();
  const [isFilter, setIsFilter] = useState(false);
  const [isShowLeaderboard, setIsShowLeaderboard] = useState(false);
  const [timer, setTimer] = useState(null);
  useEffect(() => {
    getData({
      // modify there
      url: configs.apiBaseURL + "/lotw",
    }).then(() => {
      fetchVuccData({
        // modify there
        url: configs.apiBaseURL + "/lotw/vuccaward",
      });
    });
  }, [getData, fetchVuccData]);

  const getDataHandler = throttleAsync((e) => {
    if (!isLoading) {
      // modify there
      let url = configs.apiBaseURL + "/lotw";
      let url2 = configs.apiBaseURL + "/lotw/vuccaward";
      //no cache
      if (e.shiftKey && e.altKey) {
        url += "?cache=no-cache";
        url2 += "?cache=no-cache";
      }
      return getData({
        url,
      }).then(() => {
        fetchVuccData({
          // modify there
          url: url2,
        });
      });
    } else {
      return new Promise(() => {});
    }
  });

  const getQSLHandler = () => {
    setIsFilter(!isFilter);
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
    // console.log(mostQslCallSign);
    setIsShowLeaderboard(true);
  };
  return (
    <div className="App">
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
            callsignCount={mostQslCallSign}
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
            {isFilter ? "Show all" : "Only QSL"}
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
        </div>
        {errMsg && <p>{errMsg}</p>}
        {isLoading && (
          <p className="loading">
            <img src={loadingGif} alt="" />
          </p>
        )}
        <div className="listContent">
          {!errMsg &&
            (!isLoading ? (
              <List data={isFilter ? filteredData : data}></List>
            ) : (
              <></>
            ))}
        </div>
      </ListContext.Provider>
      <footer className="footer">
        Made widh ❤️ by{" "}
        <a href="https://kanokano.cn" target="blank">
          MiniKano
        </a>
      </footer>
    </div>
  );
}

export default App;
