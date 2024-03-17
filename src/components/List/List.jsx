import React, { useState, useContext } from "react";
import Item from "../Item/Item";
import Backdrop from "../UI/Backdrop/Backdrop";
import QsoDetails from "../QsoDetails";
import classes from "./List.module.css";
import { useEffect } from "react";
// import GlobalContext from "../GlobalContext";
const modes = [
  "Any Mode",
  "CW",
  "PHONE",
  "IMAGE",
  "DATA",
  "AM",
  "C4FM",
  "DIGITALVOICE",
  "DSTAR",
  "FM",
  "SSB",
  "ATV",
  "FAX",
  "SSTV",
  "AMTOR",
  "ARDOP",
  "CHIP",
  "CLOVER",
  "CONTESTI",
  "DOMINO",
  "FSK31",
  "FSK441",
  "FST4",
  "FT4",
  "FT8",
  "GTOR",
  "HELL",
  "HFSK",
  "ISCAT",
  "JT4",
  "JT65",
  "JT6M",
  "JT9",
  "MFSK16",
  "MFSK8",
  "MINIRTTY",
  "MSK144",
  "MT63",
  "OLIVIA",
  "OPERA",
  "PKT",
  "PACTOR",
  "PAX",
  "PSK10",
  "PSK125",
  "PSK2K",
  "PSK31",
  "PSK63",
  "PSK63F",
  "PSKAM",
  "PSKFEC31",
  "Q15",
  "Q65",
  "QRA64",
  "ROS",
  "RTTY",
  "RTTYM",
  "T10",
  "THOR",
  "THROB",
  "VOI",
  "WINMOR",
  "WSPR",
];
let endIndex = 100;
export default function List({ data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [searchDataTemp, setSearchDataTemp] = useState(data);
  const [isShow, setIsSHow] = useState(false);
  const [currentItem, setCurrentItem] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchCallSign, setSearchCallSign] = useState("");
  const [searchDateStart, setSearchDateStart] = useState("");
  const [searchDateEnd, setSearchDateEnd] = useState("");
  const [searchMode, setSearchMode] = useState("");
  // const { isScrollToBottom, toggleIsScrollToBottom } =
  //   useContext(GlobalContext);

  const pageDown = () => {
    if (endIndex >= data.length || endIndex >= searchDataTemp.length) {
      return;
    }
    if (isFiltered) {
      endIndex =
        endIndex + 100 >= searchDataTemp.length
          ? searchDataTemp.length
          : endIndex + 100;
      setFilteredData(searchDataTemp.slice(0, endIndex));
    } else {
      endIndex = endIndex + 100 >= data.length ? data.length : endIndex + 100;
      setFilteredData(data.slice(0, endIndex));
    }
  };

  useEffect(() => {
    setFilteredData(data.slice(0, 100));
  }, [data]);

  const showDetailHandler = (item) => {
    setIsSHow(!isShow);
    setCurrentItem(item);
  };

  const hideDetailsHandler = (e) => {
    setIsSHow(false);
  };

  const filterByCallsign = (data) => {
    return data.filter(
      (item) => item.worked.indexOf(searchCallSign.toUpperCase()) !== -1
    );
  };

  const filterByDate = (data) => {
    return data.filter((item) => {
      let date = item.datetime.split(" ")[0];
      if (date >= searchDateStart && date <= searchDateEnd) {
        return item;
      } else {
        return false;
      }
    });
  };

  const filterByMode = (data) => {
    return data.filter((item) => {
      let mode = item.mode;
      if (mode == searchMode) {
        return item;
      } else {
        return false;
      }
    });
  };

  const searchHandler = (startIndex = 0) => {
    endIndex = 100;
    console.log(searchMode);
    let tempData = [...data];
    if (searchCallSign) {
      setIsFiltered(true);
      tempData = filterByCallsign(tempData);
    }
    if (searchDateStart && searchDateEnd) {
      setIsFiltered(true);
      tempData = filterByDate(tempData);
    }
    if (searchMode) {
      setIsFiltered(true);
      tempData = filterByMode(tempData);
    }
    console.log(
      startIndex,
      startIndex + endIndex,
      tempData.slice(startIndex, startIndex + endIndex)
    );
    setSearchDataTemp(tempData);
    setFilteredData(tempData.slice(startIndex, startIndex + endIndex));
  };

  return (
    <>
      <div className={classes.searchTools}>
        <div>
          <input
            className="input"
            type="text"
            value={searchCallSign}
            onChange={(e) => setSearchCallSign(e.target.value.trim())}
            placeholder="input call sign"
          />
          <select
            className="input"
            type="text"
            value={searchMode}
            onChange={(e) => setSearchMode(e.target.value.trim())}
            placeholder="input call sign"
            style={{ width: "100px" }}
          >
            {modes.map((el) => (
              <option value={el === "Any Mode" ? "" : el} key={el}>
                {el}
              </option>
            ))}
          </select>
        </div>

        <div>
          <input
            type="date"
            className="datePicker"
            value={searchDateStart}
            onChange={(e) => setSearchDateStart(e.target.value)}
          />{" "}
          -{" "}
          <input
            type="date"
            className="datePicker"
            value={searchDateEnd}
            onChange={(e) => setSearchDateEnd(e.target.value)}
          />
        </div>
        <div>
          <button className="btn" onClick={() => searchHandler()}>
            Search
          </button>
        </div>
      </div>
      <div className="listContent">
        {filteredData.length !== 0 ? (
          filteredData.map((item, index) => {
            return (
              <Item
                item={item}
                key={index}
                onClick={() => {
                  showDetailHandler(item);
                }}
              ></Item>
            );
          })
        ) : (
          <h4 style={{ textAlign: "center" }}>No data</h4>
        )}
        {isShow ? (
          <Backdrop className="flex-center" onClick={hideDetailsHandler}>
            <QsoDetails
              qsoDetail={currentItem}
              onClick={(e) => e.stopPropagation()}
              onClose={() => setIsSHow(false)}
            ></QsoDetails>
          </Backdrop>
        ) : (
          <></>
        )}
      </div>
      {endIndex >= data.length || endIndex >= searchDataTemp.length ? (
        <></>
      ) : (
        <div style={{ textAlign: "center" }}>
          <button
            onClick={pageDown}
            className="btn"
            style={{ width: "80%", opacity: ".7" }}
          >
            More...
          </button>
        </div>
      )}
    </>
  );
}
