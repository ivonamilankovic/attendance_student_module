import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { KEY_USER_TOKEN } from "../constants";

const useToken = ()=>{
    const [token, setToken] = useState("");
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem(KEY_USER_TOKEN);
        setToken(value);
      } catch (e) {
        console.log(e);
      }
    };
  getData();

  return token;
}

export default useToken;