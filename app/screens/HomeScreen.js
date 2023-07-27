import { useState } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KEY_USER_TOKEN } from "../constants";

export default function HomeScreen() {
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

  return (
    <View>
      <Text>{token ? token : "no token"}</Text>
    </View>
  );
}
