import { useCallback, useEffect, useState } from "react";
import { BACKEND_URL } from "../constants";

export const useUser = (token) => {
  const [student, setUser] = useState();
  const [load, setLoad] = useState(true);
  const [success, setSuccess] = useState();

  const getUser = useCallback(() => {
    fetch(BACKEND_URL + "Login/Validate?token=" + token, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((u) => {
        if (u) {
          setUser(u);
          setLoad(false);
          setSuccess(true);
        }
      })
      .catch((e) => {
        console.log(e);
        setSuccess(false);
      });
  }, [token]);

  useEffect(() => {
    getUser();
  }, [token, getUser]);

  return { student, load, success };
};

export default useUser;
