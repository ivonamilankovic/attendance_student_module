import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Vibration, Image } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Location from "expo-location";
import Loading from "../components/Loading";
import useToken from "../hooks/useToken";
import useUser from "../hooks/useUser";
import { BACKEND_URL } from "../constants";
import AboutLecture from "../components/AboutLecture";

export default function ScanQrCodeScreen() {
  const token = useToken();
  const { student, load } = useUser(token);
  const [hasPermissionCamera, setHasPermissionCamera] = useState(null);
  const [hasPermissionLocation, setHasPermissionLocation] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [msg, setMsg] = useState("");
  const [response, setResponse] = useState(null);
  const [lecture, setLecture] = useState();
  const [openAbout, setOpenAbout] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermissionCamera(status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        await Location.requestBackgroundPermissionsAsync();
      }
      setHasPermissionLocation(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setResponse(null);
    setScanned(true);
    const lectureId = data;
    let location = await Location.getCurrentPositionAsync();
    const body = {
      lectureId: lectureId,
      index: student.index,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    fetch(BACKEND_URL + "StudentAttendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((r) => {
        setScanned(false);
        setInvalid(false);
        if (r.lecture !== undefined) {
          setLecture(r.lecture);
          setMsg("You have been registered to new lecture");
          setOpenAbout(true);
        } else {
          console.log(r);
          setResponse(r);
          setInvalid(true);
        }
        Vibration.vibrate();
      })
      .catch((e) => {
        console.log(e);
        setInvalid(true);
        setScanned(false);
      });
  };

  if (load) {
    return <Loading />;
  }

  if (hasPermissionCamera === null || hasPermissionLocation === null) {
    return <Loading />;
  }

  if (hasPermissionCamera === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Camera permission not granted.</Text>
      </View>
    );
  }

  if (hasPermissionLocation === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Location permission not granted.</Text>
      </View>
    );
  }

  if (openAbout) {
    return (
      <AboutLecture lecture={lecture} setOpenAbout={setOpenAbout} msg={msg} />
    );
  }

  if (student && token && hasPermissionCamera && hasPermissionLocation) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Scan QR code</Text>
        <Text style={styles.paragraph}>
          Point your camera to QR code to register your attendance.
        </Text>
        <View style={styles.cameraContainer}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={styles.camera}
          />
        </View>
        {invalid && (
          <View style={styles.msgContainer}>
            <Image source={require("../assets/error.png")} style={styles.img} />
            <Text style={styles.invalid}>
              {response ? response : "Not valid code."}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#0b3954",
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 40,
    textAlign: "center",
    marginHorizontal: 15,
  },
  cameraContainer: {
    width: "100%",
    aspectRatio: 1,
    overflow: "hidden",
  },
  camera: {
    flex: 1,
  },
  button: {
    backgroundColor: "#0b3954",
    width: "60%",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  invalid: {
    color: "#f00",
    textAlign: "center",
    marginTop: 10,
  },
  img: {
    width: 30,
    height: 30,
    alignSelf: "center",
  },
  msgContainer: {
    marginTop: 30,
    marginHorizontal: 55,
  },
});
