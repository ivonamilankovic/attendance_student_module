import { Pressable, Text, View, StyleSheet } from "react-native";

export default function ScanQrCodeScreen() {
  return (
    <View style={styles.container}>
      <Pressable style={styles.btn}>
        <Text style={styles.btnTitle}>OPEN CAMERA</Text>
      </Pressable>
    </View>
  );
  //TODO onpress open camera
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingBottom: 0,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#0b3954",
    width: "80%",
    padding: 15,
    borderRadius: 10,
  },
  btnTitle: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
  },
});
