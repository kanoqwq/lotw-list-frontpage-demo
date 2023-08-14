import "./App.css";
import { useEffect, useState } from "react";
import List from "./components/List/List";
import ListContext from "./store/studentContext";
import useFetch from "./components/hooks/useFetch";
import { throttleAsync } from "./tools/throttleAsync";
import configs from "./configs/config";
import loadingGif from "./assets/images/loading.gif";
function App() {
  //使用自定义钩子
  const {
    data,
    isLoading,
    errMsg,
    filteredData,
    qslCount,
    dataAction: getData,
  } = useFetch();
  const [isFilter, setIsFilter] = useState(false);
  useEffect(() => {
    getData({
      // modify there
      url: configs.apiBaseURL + "/lotw",
    });
  }, [getData]);
  const getDataHandler = throttleAsync((e) => {
    // modify there
    let url = configs.apiBaseURL + "/lotw";
    //no cache
    if (e.shiftKey && e.altKey) {
      url += "?cache=no-cache";
    }
    return getData({
      url,
    });
  });

  const getQSLHandler = () => {
    setIsFilter(!isFilter);
  };
  const saveQSLHandler = async () => {
    // modify there
    window.open(configs.apiBaseURL + "/lotw/downloadfile", "_blank");
  };
  return (
    <div className="App">
      <ListContext.Provider
        value={{
          getData: getDataHandler,
        }}
      >
        <h2>{data.length ? data[0].callsign : ""}'s LotW QSO Logs</h2>
        <p>
          Total QSO: {data.length}, Total QSL: {qslCount}
        </p>
        <div className="options">
          <button className="btn" onClick={getDataHandler}>
            Refresh
          </button>
          <button className="btn" onClick={getQSLHandler}>
            {isFilter ? "Show all" : "Only QSL"}
          </button>
          <button className="btn" onClick={saveQSLHandler}>
            Save to .xlsx File
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
    </div>
  );
}

export default App;
