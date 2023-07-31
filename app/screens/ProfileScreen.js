import { useState, useEffect } from "react";
import { Text, StyleSheet, ScrollView, Button } from "react-native";
import ChangePasswordForm from "../components/ChangePasswordForm";
import Loading from "../components/Loading";
import UserData from "../components/UserData";
import useToken from "../hooks/useToken";
import useUser from "../hooks/useUser";

export default function ProfileScreen() {
  const [userData, setUser] = useState();
  const [showForm, setShowForm] = useState(false);
  const token = useToken();
  const { student, load } = useUser(token);

  useEffect(() => {
    if (student) {
      setUser(student);
    }
  }, [student]);

  if (load) {
    return <Loading />;
  }

  if (userData && token) {
    if (!showForm) {
      return (
        <ScrollView style={styles.container}>
          <Text style={styles.title}>My data</Text>
          <UserData userData={userData} />
          <Button
            color="#0b3954"
            title="I want to change my password"
            onPress={() => {
              setShowForm(true);
            }}
          />
        </ScrollView>
      );
    } else {
      return (
        <ChangePasswordForm
          setShowForm={setShowForm}
          userID={userData.userId}
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
    flex: 1,
  },
  title: {
    marginBottom: 16,
    marginTop: 60,
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    color: "#0b3954",
  },
});
