import React, { useState, useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';
import { Gyroscope } from 'expo-sensors';
import { Text, View, StyleSheet, Image, DrawerLayoutAndroid } from 'react-native';
import {  BarChart  } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'

export default function App() {
  const [acceldata, setaccelData] = useState({});
  const [gyrodata, setgyroData] = useState({});

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  useEffect(() => {
    _subscribe();
  }, []);

  const _subscribe = () => {
    this._subscription = Accelerometer.addListener(accelerometerData => {
      setaccelData(accelerometerData);
    });
        this._subscription = Gyroscope.addListener(gyroscopeData => {
      setgyroData(gyroscopeData);
  });
};

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 1,
    useShadowColorFromDataset: false // optional
  };

let { x, y, z } = acceldata;
let { xg, yg, zg } = gyrodata;

const chartdata = {
  labels: ['X-accel', 'Y-accel', 'Z-accel'],
  datasets: [{
    data: [ x, y, z]
  }]
}

const graphStyle = {
  marginVertical: 8,
  ...chartConfig.style
}
  
return (
  <BarChart
    data={{
      labels: ['accel x', 'accel y', 'accel z', 'gyro x', 'gyroc y', 'gyro z' ],
      datasets: [
        {
          data: [
            round(x),
            round(y),
            round(z),
            round(xg),
            round(yg),
            round(zg),
          ],
        },
      ],
    }}
    width={Dimensions.get('window').width - 16} // from react-native
    height={220}
    yAxisLabel={'Rs'}
    chartConfig={{
      backgroundColor: '#1cc910',
      backgroundGradientFrom: '#eff3ff',
      backgroundGradientTo: '#efefef',
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
      style: {
        borderRadius: 16,
      },
    }}
    bezier
    style={{
      marginVertical: 300,
      borderRadius: 16,
    }}
  />
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 2,

    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }  
});

function round(n) {
  if (!n) {
    return 0;
  }
  return Math.floor(n * 100) / 100;
}

