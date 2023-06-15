// import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";

import { API_KEY } from "./utils/WeatherAPIKey";

import Weather from "./components/Weather";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const [espData, setEspData] = useState(null);
  const [weatherCondition, setWeatherCondition] = useState(null);

  useEffect(() => {
    async function recieveLocation() {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          console.error("Permission to access location was denied!");
        }

        let location = await Location.getCurrentPositionAsync({});

        fetchWeatherApi(location.coords.latitude, location.coords.longitude);
      } catch (error) {
        console.error(error);
      }
    }

    recieveLocation();

    const interval = setInterval(() => {
      fetchWeatherEsp();
    }, 1000); // Fetch every second

    return () => clearInterval(interval); // Clear interval on unmount
  }, []);

  const fetchWeatherApi = (lat, lon) => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`)
      .then((res) => res.json())
      .then((json) => {
        // console.log(json);
        setWeatherCondition(json);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  };

  const fetchWeatherEsp = () => {
    fetch("http://192.168.50.228/data")
      .then((res) => res.json())
      .then((data) => setEspData(data))
      .catch((error) => console.error(error));
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        weatherCondition && <Weather weatherStatsApi={weatherCondition} weatherStatsEsp={espData} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFDE4",
  },
  loadingText: {
    fontSize: 30,
  },
});
