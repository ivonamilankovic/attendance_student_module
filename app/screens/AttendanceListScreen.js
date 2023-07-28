import { useState } from "react";
import { View, Text } from "react-native";
import useToken from "../hooks/useToken";

export default function AttendanceListScreen({ navigation }) {
  const token = useToken();
  // if(!token){
  //     navigation.navigate("login", {"error": "Your login session has expired."});
  // } //TODO fix redirecting if no token
  

  return (
    <View>
      <Text>{token ? token : "no token"}</Text>
      
    </View>
  );
}
