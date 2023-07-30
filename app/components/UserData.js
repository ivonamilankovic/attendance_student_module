import { View, Text, Image, StyleSheet } from "react-native";
import Loading from "./Loading";

export default function UserData({ userData }) {
  if (!userData.errors) {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Image source={require("../assets/info.png")} style={styles.img} />
          <Text style={styles.text}>
            {userData.user.firstName} {userData.user.lastName}
          </Text>
        </View>
        <View style={styles.row}>
          <Image source={require("../assets/mail.png")} style={styles.img} />
          <Text style={styles.text}>{userData.user.email}</Text>
        </View>
        <View style={styles.edu}>
          <Image
            source={require("../assets/education.png")}
            style={styles.img}
          />
          <View>
            <View style={styles.rowWlabel}>
              <Text style={styles.label}>Index number: </Text>
              <Text style={styles.textIndex}>{userData.index}</Text>
            </View>
            <View style={styles.rowWlabel}>
              <Text style={styles.label}>Study profile: </Text>
              <Text style={styles.text}>{userData.studyProfile.name}</Text>
            </View>
            <View style={styles.rowWlabel}>
              <Text style={styles.label}>Language: </Text>
              <Text style={styles.text}>{userData.studyLanguage.name}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  } else {
    return <Loading />;
  }
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    paddingVertical: 3,
  },
  label: {
    fontStyle: "italic",
    alignSelf: "center",
    marginRight: 10,
    color: "gray"
  },
  textIndex: {
    textAlign: "center",
    fontSize: 18,
    paddingVertical: 3,
    fontStyle: "italic",
  },
  img: {
    width: 35,
    height: 35,
    alignSelf: "center",
  },
  row: {
    justifyContent: "center",
    paddingVertical: 20,
  },
  rowWlabel:{
    justifyContent:"center",
    alignContent:"center",
    flexDirection: "row",
    paddingTop: 12
  },
  edu: {
    flexDirection: "column",
    justifyContent: "center",
    paddingBottom: 45
  },
});
