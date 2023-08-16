import React, { useState } from "react";
import Item from "../Item/Item";
import Backdrop from "../UI/Backdrop/Backdrop";
import QsoDetails from "../QsoDetails";
export default function List({ data }) {
  const [isShow, setIsSHow] = useState(false);
  const [currentItem, setCurrentItem] = useState(false);
  const showDetailHandler = (item) => {
    setIsSHow(!isShow);
    setCurrentItem(item);
  };
  const hideDetailsHandler = (e) => {
    setIsSHow(false);
  };
  return (
    <>
      {data.length !== 0 ? (
        data.map((item, index) => (
          <Item
            item={item}
            key={index}
            onClick={() => {
              showDetailHandler(item);
            }}
          ></Item>
        ))
      ) : (
        <h4 style={{ textAlign: "center" }}>No data, Please refresh again</h4>
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
    </>
  );
}
