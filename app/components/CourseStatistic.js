import { useEffect, useState } from "react";
import { Text, View, Pressable, StyleSheet, Image } from "react-native";
import PercentageCircle from "react-native-percentage-circle";
import { BACKEND_URL } from "../constants";
import Loading from "./Loading";

export default function CourseStatistic({
  courseToShow,
  index,
  token,
  setShowStatistic,
}) {
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState(0);
  const [statistic, setStatistic] = useState(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    findCourse();
  }, [courses]);

  useEffect(() => {
    fetchStatistic();
  }, [courseId]);

  function fetchCourses() {
    setLoad(true);
    fetch(BACKEND_URL + "Course", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((d) => {
        setCourses(d);
        setLoad(false);
      })
      .catch((e) => {
        console.log(e);
        setLoad(false);
      });
  }

  function findCourse() {
    if (courses.length > 0) {
      courses.forEach((c) => {
        if (c.name === courseToShow) {
          setCourseId(c.id);
        }
      });
    }
  }

  function fetchStatistic() {
    setLoad(true);
    fetch(
      BACKEND_URL + "StudentAttendance/Presence/" + courseId + "/" + index,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.json())
      .then((d) => {
        setStatistic(d);
        setLoad(false);
      })
      .catch((e) => {
        console.log(e);
        setLoad(false);
      });
  }

  if (load) {
    return <Loading />;
  }
  if (statistic) {
    const {
      totalNeededLectures,
      totalTakenLectures,
      totalPresentLectures,
      attendancePercentage,
    } = statistic;
    return (
      <View style={styles.container}>
        <Pressable
          onPress={() => setShowStatistic(false)}
          style={styles.backBtn}
        >
          <Image source={require("../assets/back.png")} style={styles.back} />
        </Pressable>
        <View>
          <Text style={styles.title}>{courseToShow} statistics</Text>
          <Text style={styles.info}>
            Lectures attended: {totalPresentLectures}
          </Text>
          <Text style={styles.info}>
            Lectures left: {totalNeededLectures - totalTakenLectures}
          </Text>
          <Text style={styles.infoPerc}>Attendance percentage:</Text>
          <View style={styles.percentageContainer}>
            <PercentageCircle
              radius={100}
              percent={attendancePercentage}
              color={"#0B3954"}
              textStyle={{ fontSize: 20 }}
            ></PercentageCircle>
          </View>
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
    marginLeft: 5,
    marginTop: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: "#0b3954",
    marginBottom: 30,
    marginTop: 45,
  },
  info: {
    textAlign: "center",
    fontSize: 16,
    paddingBottom: 6,
  },
  infoPerc: {
    paddingVertical: 45,
    fontSize: 18,
    textAlign: "center",
  },
  percentageContainer: {
    alignSelf: "center",
  },
});
