import React from "react";
import Item from "../Item/Item";
export default function List({ data }) {
  return (
    <>
      {data.length !== 0 ? (
        data.map((item, index) => <Item item={item} key={index}></Item>)
      ) : (
        <h4>NO DATA</h4>
      )}
    </>
  );
}
