import { useState, useCallback } from "react";
//自定义钩子函数
const useFetch = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [qslCount, setQSLCount] = useState(0)
    const [vuccData, setVuccData] = useState({})
    const [qlsedData, setQlsedData] = useState(data);
    const [errMsg, setErrMsg] = useState(null);
    // 接口：https://api.kanokano.cn/lotw-get
    // 组件初始化时候需要加载数据：
    const fetchVuccData = useCallback(async (reqObj) => {
        try {
            setErrMsg(null);
            let res = await fetch(reqObj.url, {
                method: reqObj.method || 'get',
                headers: reqObj.headers,
                body: reqObj.body
            });
            if (res.ok) {
                let resData = await res.json();
                setVuccData(resData.data);
            } else {
                throw new Error("Load failed");
            }
        } catch (err) {
            console.log(err.message);
        } 
    }, [])
    const dataAction = useCallback(async (reqObj) => {
        try {
            setIsLoading(true);
            setErrMsg(null);
            let res = await fetch(reqObj.url, {
                method: reqObj.method || 'get',
                headers: reqObj.headers,
                body: reqObj.body
            });
            if (res.ok) {
                let resData = await res.json();
                setData(resData.data);
                let count = 0
                let qslData = [];
                resData.data.forEach((item) => {
                    if (item.QSL !== "NO") {
                        count++
                        qslData.push(item)
                    }
                });
                setQlsedData(qslData)
                setQSLCount(count);
            } else {
                throw new Error("Load failed");
            }
        } catch (err) {
            setErrMsg(err.message);
            console.log(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    //把要用到的变量返回回去就好了
    return {
        data,
        vuccData,
        dataAction,
        qlsedData,
        isLoading,
        errMsg,
        qslCount,
        fetchVuccData
    }
}

export default useFetch