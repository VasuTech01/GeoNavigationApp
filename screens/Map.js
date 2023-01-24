import React, { useCallback, useState,useLayoutEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { Alert, StyleSheet } from "react-native";
import IconButton from "../UI/IconButton";

function Map({navigation,route}) {
  
  const initialLocation = route.params && {
    lat: route.params.initialLat,
    lng: route.params.initialLng
  };
  const [selectedLoc, setSelectedLoc] = useState(initialLocation);
  const region = {
    latitude: initialLocation ? initialLocation.lat :37.78,
    longitude: initialLocation ? initialLocation.lng :-122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  function SelectLocHandler(event) {
    console.log(event.nativeEvent);
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLoc({ lat: lat, lng: lng });
  }
  const SavePickedLocHandler = useCallback(() => {
    if (!selectedLoc) {
      Alert.alert("No Location Picked", "Select A Location First By Taping on it");
      return;
    }
    navigation.navigate("AddPlace", {
      pickedLat: selectedLoc.lat,
      pickedLng: selectedLoc.lng
    })
  },[navigation,selectedLoc]);


  useLayoutEffect(() => {
    if (initialLocation) {
      return;
     }
    navigation.setOptions({
      headerRight: ({ tintColor }) =>( <IconButton name="save" size={ 23} color={tintColor} onPress={SavePickedLocHandler} />),
    })
  }, [navigation,SavePickedLocHandler,initialLocation])

  return <MapView style={styles.map} initialRegion={region} onPress={SelectLocHandler}>
    
    {selectedLoc&&(<Marker title="Picked Location" coordinate={{ latitude: selectedLoc.lat, longitude: selectedLoc.lng }} />)}
  </MapView>;
}
const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default Map;
