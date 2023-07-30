import { useState } from "react";
import {
  View,
  TextInput,
  Image,
  Text,
  Button,
  StyleSheet,
  Pressable,
} from "react-native";

export default function ChangePasswordForm({ setShowForm }) {
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [loading, setLoading] = useState(false);

  function updatePassword() {
    //TODO update pswd
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setShowForm(false)} style={styles.backBtn}>
        <Image source={require("../assets/back.png")} style={styles.back} />
      </Pressable>
      <View style={styles.form}>
        <Text style={styles.title}>Change password</Text>
        <TextInput
          placeholder="New password..."
          value={pass1}
          onChangeText={setPass1}
          secureTextEntry={true}
          style={styles.input}
        />
        <TextInput
          placeholder="Repeat password..."
          value={pass2}
          onChangeText={setPass2}
          secureTextEntry={true}
          style={styles.input}
        />
        <Button
          title={loading ? "loading..." : "Save"}
          color={loading ? "#aa4465" : "#0b3954"}
          onPress={() => updatePassword()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 35,
    padding: 8,
    fontSize: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    color: "#0b3954",
    marginBottom: 40,
  },
  back: {
    width: 30,
    height: 30,
  },
  backBtn: {
    borderRadius: 40,
    borderColor: "#0b3954",
    borderWidth: 1,
    width: 65,
    padding: 15,
    marginLeft: 15,
    marginTop: 45,
  },
  form: {
    paddingHorizontal: 40,
    justifyContent: "center",
    flex: 1,
  },
});
