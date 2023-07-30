import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Button,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../components/Loading";
import { KEY_USER_TOKEN } from "../constants";
import useToken from "../hooks/useToken";
import useUser from "../hooks/useUser";

export default function WelcomeScreen({ navigation }) {
  const token = useToken();
  const { student, load } = useUser(token);

  if (load) {
    return <Loading />;
  }

  if (student) {
    if (!student.errors) {
      navigation.navigate("home", { screen: "scan" });
    }
  }

  return (
    <ImageBackground
      style={styles.backgound}
      source={require("../assets/bg.jpg")}
    >
      <View style={styles.infoContainer}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/icon.png")}
          ></Image>
          <Text style={styles.text}>
            Login and scan QR codes to register yourself to lectures.
          </Text>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <Button
          title="Login"
          color="#000"
          onPress={() => navigation.navigate("login")}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgound: {
    flex: 1,
    padding: 50,
  },
  btnContainer: {
    flex: 1,
  },
  infoContainer: {
    flex: 2,
  },
  logoContainer: {
    padding: 10,
    marginTop: "80%",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 6,
  },
  logo: {
    width: 100,
    height: 100,
  },
  text: {
    textAlign: "center",
    color: "#fefefe",
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 10,
  },
});
