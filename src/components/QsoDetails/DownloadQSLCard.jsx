import React, { useEffect, useRef, useState } from "react";
import classes from "./QsoDetails.module.css";
import { QSLInfo } from "./qlsInfo";
import img from '../../assets/images/QSL_CARD_BI3AQ_BACK_CURRENT.png'
import watermark from '../../assets/images/wartermark.png'
import QSL_1 from '../../assets/images/QSL-CARD-BI3AQ-FRONT-VER2.0.png'
import QSL_2 from '../../assets/images/QSL-CARD-BI3AQ-FRONT-VER2.0-2.png'
/**
 * export QSL CARD
*/

const fontInfo = {
  color: 'black',
  font: "34px bold serif"
}

export default function DownloadQSLCard(props) {
  const info = props.qsoDetail;
  console.log(info);

  const [modalShow, setModalShow] = useState(false);
  const [qslInfo, setQslInfo] = useState(null);
  const boxRef = useRef()

  function canvasPrepare() {
    let qslInfo = new QSLInfo({ canvasId: "#myCanvas", imgSrc: img, fontInfo })
    return qslInfo
  }
  useEffect(() => {
    setQslInfo(canvasPrepare())
  }, [])

  useEffect(() => {
    if (qslInfo) {
      window.onresize = onResize
      qslInfo.image.onload = () => {
        //等待动画
        setTimeout(() => {
          onResize()
        }, 500);
      }
    }
  }, [qslInfo, boxRef])

  useEffect(() => {
    setModalShow(true);
  }, [props.qsoDetail]);

  const onResize = () => {
    if (boxRef.current) {
      let width = boxRef.current.getBoundingClientRect().width
      if (qslInfo) {
        qslInfo.drawImage({ width: width ? (width - 40 + 'px') : '800px' })
        qslInfo.drawWatermark({ pos: { x: 750, y: 250 }, height: 1000, width: 1000, imgSrc: watermark })
        setValue()
      }
    }
  }
  const setValue = () => {
    if (qslInfo) {
      qslInfo.date.value = info.datetime.split(' ')[0]
      qslInfo.time.value = info.datetime.split(' ')[1]
      qslInfo.freq.value = info.satellite || info.freq.substr(0, 7)
      qslInfo.mode.value = info.mode
      qslInfo.rst.value = info.satellite ? ' 59' : '59/+0'
      qslInfo.trx.value = !info.satellite ? 'FT-891' : '   K5'
      qslInfo.power.value = 'FULL'
      qslInfo.ant.value = !info.satellite ? 'DP天线' : "UVYAGI"
      qslInfo.pseCard.value = ''
      qslInfo.tnxCard.value = ''
      qslInfo.comment.value = '感谢通联，期待空中常见!'
      qslInfo.addr.value = info.mygrid
      qslInfo.grid.value = info.mygrid + (info.grid ? '  ->  ' + info.grid : '')
      qslInfo.op.value = 'minikano'
      qslInfo.callsign.value = info.worked
      qslInfo.CQ.value = info.mycqzone
      qslInfo.ITU.value = info.myituzone
      qslInfo.QSO.value = '√'
      qslInfo.SWL.value = ''
    }
  }

  const download = () => {
    if (qslInfo) {
      const el = document.createElement('a');
      let arr = [qslInfo.canvas.toDataURL(), QSL_1, QSL_2]
      for (let i = 0; i < arr.length; i++) {
        el.href = arr[i];
        el.download = 'QSL_CARD';
        if (i !== 0) {
          el.download = arr[i];
        }
        const event = new MouseEvent('click');
        el.dispatchEvent(event);
      }
    }
  }

  return (
    <div
      className={`${classes.modal}${modalShow ? " " + classes.show : ""}`}
      onClick={props.onClick}
      ref={boxRef}
    >
      <div className="title">
        <h3>EXPORT QSL CARD</h3>
        <span><i>(LoTW does not spport RST report, default 59/+0)</i></span>
      </div>
      <div className={classes.flexbox} style={{ padding: '10px 0', position: 'relative' }}>
        <canvas id="myCanvas" width="auto" height="auto" >浏览器不支持canvas</canvas>
        <img src={QSL_2} alt="" />
        <img src={QSL_1} alt="" />
      </div>
      <div className={classes.options}>
        <button className={"btn"} onClick={download}>
          Download
        </button>
        <button onClick={props.onClose} className={"btn"}>
          Close
        </button>
      </div>

    </div >
  );
}
