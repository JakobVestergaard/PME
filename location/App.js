import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import MapView, {Marker} from 'react-native-maps';


export default function App() {
  const [location, setLocation] = useState({coords:{latitude:0, longitude:0}});
  const [errorMsg, setErrorMsg] = useState(null);

  const latDelt=0.05;
  const aspectratio=Dimensions.get("window").width/Dimensions.get("window").height;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView 
      region = {{
        latitude:location.coords.latitude,
        latitudeDelta:latDelt,
        longitude:location.coords.longitude,
        longitudeDelta:latDelt*aspectratio
      }}
      initialRegion = {{
        latitude:0,
        latitudeDelta:0,
        longitude:0,
        longitudeDelta:0
      }}
      style={styles.mapStyle} >
        <Marker coordinate={{
          latitude:location.coords.latitude,
          longitude:location.coords.longitude
          }}></Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
	textAlign: 'center',
	marginTop: 200,
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});
