import { useCallback, useEffect, useState } from "react";
import { BACKEND_URL } from "../constants";
import useToken from "./useToken";

const useApi = (method, apiSection, urlParam = "", body = {}) => {
  const [data, setData] = useState();
  const [load, setLoad] = useState(true);

  const getData = useCallback(async () => {
   const token = useToken();

    let fetchParams = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    if (method === "POST" || method === "PUT") {
      fetchParams.body = JSON.stringify(body);
    }

    fetch(BACKEND_URL + apiSection + urlParam, fetchParams)
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setLoad(false);
      })
      .catch((e) => {
        console.log(e);
        setLoad(false);
      });
  }, [method, apiSection, urlParam, body]);

  useEffect(() => {
    getData();
  }, []);

  return { data, load };
};

export default useApi;