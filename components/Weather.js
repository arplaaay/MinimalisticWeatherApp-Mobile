import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { weatherConditions } from "../utils/WeatherConditions";

export default function Weather({ weatherStatsApi, weatherStatsEsp }) {
  const { humidity, pressure, temperature, totalgasppm, dustDensity, uvindex } = weatherStatsEsp;

  let weather = null;

  if (weatherStatsApi && weatherStatsApi.weather && weatherStatsApi.weather.length > 0) {
    weather = weatherStatsApi.weather[0].main;
  }

  return (
    <View style={[styles.weatherContainer, { backgroundColor: weatherConditions[weather].color }]}>
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons size={72} name={weatherConditions[weather].icon} color={"#fff"} />
        <Text style={styles.tempText}>{temperature}˚</Text>
      </View>
      <View style={styles.dataCardContainer}>
        <View style={styles.dataCard}>
          <Text style={styles.dataTitle}>Humidity</Text>
          <Text style={styles.dataValue}>{humidity} %</Text>
        </View>
        <View style={styles.dataCard}>
          <Text style={styles.dataTitle}>Pressure</Text>
          <Text style={styles.dataValue}>{pressure} hPa</Text>
        </View>
        <View style={styles.dataCard}>
          <Text style={styles.dataTitle}>Total GAS</Text>
          <Text style={styles.dataValue}>{totalgasppm} ppm</Text>
        </View>
        <View style={styles.dataCard}>
          <Text style={styles.dataTitle}>Dust density</Text>
          <Text style={styles.dataValue}>{dustDensity} ug/m3</Text>
        </View>
        <View style={styles.dataCard}>
          <Text style={styles.dataTitle}>UV index</Text>
          <Text style={styles.dataValue}>{uvindex}</Text>
        </View>
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.title}>{weatherConditions[weather].title}</Text>
        <Text style={styles.subtitle}>{weatherStatsApi.weather[0].description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
  },
  headerContainer: {
    flex: 0.9, // Reduced from 1 to 0.6
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  tempText: {
    fontSize: 72,
    color: "#fff",
  },
  dataCardContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginTop: -50, // Pushing the data cards upwards
  },
  dataCard: {
    backgroundColor: "#0288D1",
    margin: 10,
    padding: 20,
    borderRadius: 20,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  dataTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  dataValue: {
    fontSize: 16,
    color: "#fff",
  },
  footerContainer: {
    flex: 2,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingLeft: 25,
    marginBottom: 40,
  },
  title: {
    fontSize: 60,
    color: "#fff",
  },
  subtitle: {
    fontSize: 24,
    color: "#fff",
  },
});
