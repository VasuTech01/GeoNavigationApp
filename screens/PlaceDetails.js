import React, { useEffect,useState } from 'react';
import { ScrollView, StyleSheet, Image, View, Text } from 'react-native';
import OutlineButton from '../UI/OutlineButton';
import { fetchPlaceDetails } from '../Util/DataBase';

function PlaceDetails({route,navigation}) {
    function showOnMapHandler() {
        navigation.navigate("Map", {
            initialLat: fetchPlace.location.lat,
            initialLng:fetchPlace.location.lng
        });
    }
    const [fetchPlace, setFetchPlace] = useState();
    const selectedPlaceId = route.params.placeId||1;
    useEffect(() => {
        //use selectedPlaceId to fetch data 
        async function loadPlaceData() {
            const place = await fetchPlaceDetails(selectedPlaceId);
            setFetchPlace(place);
            navigation.setOptions({
                title: place.title,
            });
        }

        loadPlaceData();
    }, [selectedPlaceId, navigation]);
    if (!fetchPlace) {
        return <View style={styles.fallback}>
            <Text>Loading Place Data</Text>
        </View>
    }
  return (
      <ScrollView >
          <Image style={styles.image} source={{uri:fetchPlace.imageUri}} />   
          <View style={styles.locationContainer}>
              <View style={styles.addressContainer}>
                  <Text style={styles.address}>{fetchPlace.address}</Text>
              </View>
              <OutlineButton onPress={showOnMapHandler}>View on Map</OutlineButton>
          </View>      
    </ScrollView>
  )
}

export default PlaceDetails;
const styles = StyleSheet.create({
    fallback: {
        flex: 1,
        justifyContent: "center",  
        alignItems: "center",
    },
    image: {
        height: "35%",
        minHeight: 300,
        width:"100%"
    },
    locationContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    addressContainer: {
        padding:20,
    },
    address: {
        color: "#591861",
        textAlign: "center",
        fontWeight: "bold",
        fontSize:16,
    }
})