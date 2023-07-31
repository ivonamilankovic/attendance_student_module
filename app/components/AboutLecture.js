import { View, Pressable, Image, Text, StyleSheet } from "react-native";

export default function AboutLecture({ lecture, setOpenAbout }) {
  if (lecture) {
    return (
      <View style={styles.container}>
        <Pressable onPress={() => setOpenAbout(false)} style={styles.backBtn}>
          <Image source={require("../assets/back.png")} style={styles.back} />
        </Pressable>
        <View style={styles.form}>
          <Text style={styles.title}>{lecture.name}</Text>
          <Text style={styles.date}>
            {new Date(lecture.date).toDateString()}
          </Text>
          <Text style={styles.courseInfo}>
            Course : '{lecture.course.name}' by {lecture.lecturer.firstName}{" "}
            {lecture.lecturer.lastName}
          </Text>
          <Text style={styles.titleAbout}>About lecture:</Text>
          <Text style={styles.text}>{lecture.description}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
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
    marginTop: 50,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: "#0b3954",
    marginBottom: 30,
  },
  titleAbout: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 8,
  },
  text: {
    fontSize: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
  },
  date: {
    fontStyle: "italic",
    textAlign: "center",
  },
  courseInfo: {
    marginVertical: 30,
    marginHorizontal: 40,
    fontStyle: "italic",
    textAlign: "center",
  },
});
