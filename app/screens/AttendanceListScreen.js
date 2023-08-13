import { View, Text, StyleSheet } from "react-native";
import useToken from "../hooks/useToken";
import useUser from "../hooks/useUser";
import AttendanceList from "../components/AttendanceList";
import Loading from "../components/Loading";

export default function AttendanceListScreen() {
  const token = useToken();
  const { student, load } = useUser(token);

  if (load) {
    return <Loading />;
  }
  if (student && token) {
    const i = student.index;
    return (
      <View style={styles.container}>
        <AttendanceList index={i} token={token} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingBottom: 0,
    paddingHorizontal: 20,
  },
});
