import React, { useState } from "react";
import Item from "../Item/Item";
import Backdrop from "../UI/Backdrop/Backdrop";
import QsoDetails from "../QsoDetails";
import classes from "./List.module.css";
import { useEffect } from "react";
export default function List({ data }) {
  const [filteredData, setFilteredData] = useState([...data]);
  const [isShow, setIsSHow] = useState(false);
  const [currentItem, setCurrentItem] = useState(false);
  const [searchCallSign, setSearchCallSign] = useState("");
  const [searchDateStart, setSearchDateStart] = useState("");
  const [searchDateEnd, setSearchDateEnd] = useState("");

  // console.log(data);
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const showDetailHandler = (item) => {
    setIsSHow(!isShow);
    setCurrentItem(item);
  };

  const hideDetailsHandler = (e) => {
    setIsSHow(false);
  };

  const filterByCallsign = (data) => {
    setFilteredData(
      data.filter(
        (item) => item.worked.indexOf(searchCallSign.toUpperCase()) !== -1
      )
    );
    return;
  };
  const filterByDate = (data) => {
    setFilteredData(
      data.filter((item) => {
        let date = item.datetime.split(" ")[0];
        if (date >= searchDateStart && date <= searchDateEnd) {
          return item;
        } else {
          return false;
        }
      })
    );
  };

  const searchHandler = () => {
    if (!searchCallSign && !searchDateStart && !searchDateEnd) {
      setFilteredData(data);
    } else if (searchCallSign && !searchDateStart && !searchDateEnd) {
      filterByCallsign(data);
    } else if (!searchCallSign && searchDateStart && searchDateEnd) {
      filterByDate(data);
    } else if (searchCallSign && searchDateStart && searchDateEnd) {
      filterByDate(
        data.filter((item) => item.worked === searchCallSign.toUpperCase())
      );
    }
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
          <button className="btn" onClick={searchHandler}>
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
    </>
  );
}
