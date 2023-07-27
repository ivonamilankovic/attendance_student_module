import { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KEY_USER_TOKEN, BACKEND_URL } from "../constants";

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidCred, setInvalidCred] = useState(false);
  const [loading, setLoading] = useState(false);

  const saveToken = async (token) => {
    try {
      await AsyncStorage.setItem(KEY_USER_TOKEN, token);
      navigation.navigate("home");
    } catch (e) {
      console.log(e);
    }
  };

  function login() {
    setLoading(true);
    const formData = {
      email: email,
      password: password,
    };
    fetch(BACKEND_URL + "Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((r) => {
        if (r.Token) {
          saveToken(r.Token);
        } else {
          setInvalidCred(true);
        }
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.formContainer}>
        {invalidCred && (
          <Text style={styles.invalidCred}>Invalid Credentials.</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          inputMode="email"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <Button title={loading? "loading..." : "Submit"}
        color={loading? "#aa4465":"#0b3954"}
         onPress={() => login()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 40,
    backgroundColor: "#BFD7EA",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 30,
  },
  invalidCred: {
    color: "#f00",
    marginBottom: 15,
  },
  formContainer: {},
  input: {
    borderBottomWidth: 1,
    marginBottom: 35,
    padding: 8,
    fontSize: 18,
  },
});
