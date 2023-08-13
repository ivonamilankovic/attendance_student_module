import { useState, useEffect } from "react";
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  RefreshControl,
  Pressable,
} from "react-native";
import { BACKEND_URL } from "../constants";
import Loading from "./Loading";
import CourseStatistic from "./CourseStatistic";

export default function AttendanceList({ index, token }) {
  const [refresing, setRefreshing] = useState(false);
  const [attendances, setAttendances] = useState([]);
  const [load, setLoad] = useState(true);
  const [showStatistic, setShowStatistic] = useState(false);
  const [courseToShow, setCourseToShow] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    setRefreshing(true);
    fetch(BACKEND_URL + "StudentAttendance", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((d) => {
        setAttendances(d);
        setLoad(false);
        setRefreshing(false);
      })
      .catch((e) => {
        console.log(e);
        setLoad(false);
        setRefreshing(false);
      });
  }

  function transformData(data) {
    const groupedLectures = data.reduce((acc, curr) => {
      const courseName = curr.lecture.course.name;
      const lectureData = {
        date: curr.date,
        lectureName: curr.lecture.name,
        description: curr.lecture.description,
        lecturer: curr.lecture.lecturer,
      };

      if (!acc[courseName]) {
        acc[courseName] = {
          title: courseName,
          data: [lectureData],
        };
      } else {
        acc[courseName].data.push(lectureData);
      }

      return acc;
    }, {});

    const result = Object.values(groupedLectures);
    result.forEach((course) => {
      course.data.sort((a, b) => new Date(b.date) - new Date(a.date));
    });
    result.sort((a, b) => {
      const latestDateA = new Date(a.data[0].date);
      const latestDateB = new Date(b.data[0].date);
      return latestDateB - latestDateA;
    });

    return result;
  }

  function show(title) {
    setShowStatistic(true);
    setCourseToShow(title);
  }

  if (load) {
    return <Loading />;
  }

  if (attendances) {
    const myAtt = attendances.filter((a) => {
      if (a.student.index === index) {
        return a;
      }
    });
    const data = transformData(myAtt);
    if (!showStatistic) {
      return (
        <>
          <Text style={styles.titleMain}>Attended lectures:</Text>
          <SectionList
            sections={data}
            keyExtractor={(item, index) => index.toString()}
            renderSectionHeader={({ section: { title } }) => (
              <Pressable
                style={styles.sectionHeader}
                onPress={() => show(title)}
              >
                <Text style={styles.sectionHeaderText}>{title}</Text>
              </Pressable>
            )}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refresing} onRefresh={fetchData} />
            }
          />
        </>
      );
    } else {
      return (
        <CourseStatistic
          courseToShow={courseToShow}
          index={index}
          token={token}
          setShowStatistic={setShowStatistic}
        />
      );
    }
  } else {
    return <Text style={styles.noData}>No attendances.</Text>;
  }
}

const renderSectionHeader = ({ section: { title } }) => (
  <Pressable style={styles.sectionHeader} onPress={() => show(title)}>
    <Text style={styles.sectionHeaderText}>{title}</Text>
  </Pressable>
);

const renderItem = ({ item }) => (
  <View style={styles.item}>
    <Text style={styles.itemTextName}>{item.lectureName}</Text>
    <Text style={styles.itemTextDesc}>{item.description}</Text>
    <Text style={styles.itemTextWhen}>
      {item.lecturer.firstName} {item.lecturer.lastName} on{" "}
      {new Date(item.date).toDateString()}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  sectionHeader: {
    padding: 8,
    marginBottom: 8,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0b3954",
    textAlign: "center",
  },
  item: {
    padding: 8,
    marginBottom: 4,
    backgroundColor: "#fff",
    borderRadius: 6,
  },
  itemTextName: {
    fontSize: 15,
    fontWeight: "500",
  },
  itemTextDesc: {
    fontSize: 14,
    margin: 4,
  },
  itemTextWhen: {
    marginTop: 6,
    fontSize: 12,
    fontStyle: "italic",
  },
  noData: {
    color: "#f00",
    textAlign: "center",
  },
  titleMain: {
    marginVertical: 10,
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },
});
