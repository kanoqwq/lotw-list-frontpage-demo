import "./App.css";
import { useEffect, useState } from "react";
import List from "./components/List/List";
import ListContext from "./store/studentContext";
import useFetch from "./components/hooks/useFetch";
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
      url: "/lotw-get/lotw",
    });
  }, [getData]);
  const getDataHandler = () => {
    getData({
      // modify there
      url: "/lotw-get/lotw",
    });
  };
  const getQSLHandler = () => {
    setIsFilter(!isFilter);
  };
  const saveQSLHandler = async () => {
    // modify there
    window.open("/lotw-get/downloadfile", "_blank");
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
            <img src="/img/loading.gif" alt="" />
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
