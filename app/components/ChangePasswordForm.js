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
import { BACKEND_URL } from "../constants";
import useToken from "../hooks/useToken";

export default function ChangePasswordForm({ setShowForm, userID }) {
  const token = useToken();
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [invalid, setInvalid] = useState("");

  function updatePassword() {
    setLoading(true);
    if (pass1 !== pass2) {
      setInvalid("Passwords do not match.");
      setSuccess(false);
    } else {
      if (userID !== 0 && token) {
        fetch(BACKEND_URL + "User/ChangePassword/" + userID, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({ password: pass1 }),
        })
          .then((r) => {
            setSuccess(true);
            setInvalid("");
          })
          .catch((e) => {
            console.log(e);
            setInvalid("Some error occured. Please try again.");
          });
      }
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setShowForm(false)} style={styles.backBtn}>
        <Image source={require("../assets/back.png")} style={styles.back} />
      </Pressable>
      <View style={styles.form}>
        <Text style={styles.title}>Change password</Text>
        {success && (
          <Text style={styles.successMsg}>
            Your password have been changed.
          </Text>
        )}
        {invalid && <Text style={styles.invalid}>{invalid}</Text>}
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
  successMsg: {
    color: "#7fb501",
    textAlign: "center",
    marginBottom: 10,
  },
  invalid: {
    color: "#f00",
    textAlign: "center",
    marginBottom: 10,
  },
});
