import classes from "./Item.module.css";
import QSLIcon from "../../assets/images/徽章.png";
export default function Item({ item, onClick }) {
  return (
    <>
      {item && (
        <div className={classes.itemBox} onClick={onClick}>
          <div className={classes.header}>
            <div
              className={`${classes.icon} ${
                item.QSL === "YES" ? classes.qsled : ""
              }`}
            >
              <span>{item.worked.substr(3, 3)}</span>
            </div>
            <div className={classes.right}>
              <h2 className={classes.callsign}>{item.worked}</h2>
              <span className={classes.time}>{item.datetime}</span>
              <span className={classes.location}>{item.contry}</span>
            </div>
          </div>
          <div className={classes.footer}>
            <span>{`${item.satellite?'SAT:':'BAND:'}`} {item.satellite || item.band}</span>
            <span>MODE: {item.mode}</span>
            <span>FREQ: {parseFloat(item.freq)}MHz</span>
          </div>
          {item.QSL === "YES" ? (
            <div className={classes.qsl}>
              <img src={QSLIcon} alt="" />
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
}
