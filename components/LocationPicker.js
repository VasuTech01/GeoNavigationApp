import React,{ useEffect, useState} from 'react';
import { View, Text,StyleSheet, Alert,Image } from "react-native";
import OutlineButton from '../UI/OutlineButton';
import { getCurrentPositionAsync,useForegroundPermissions,PermissionStatus } from "expo-location";
import { getAddress, getMapPreview } from '../Util/location';
import { useNavigation,useRoute,useIsFocused } from '@react-navigation/native';
function LocationPicker({onPickLocation}) {
    const [locationPermission, requestPermission] = useForegroundPermissions();
    const [pickedLocation, setLocation] = useState();
    const [LocAddress, SetLocAddress] = useState();
    const navigate = useNavigation();
    const route = useRoute();
    const isFocused = useIsFocused();
    
    useEffect(() => {
        if(isFocused && route.params){
            const mapPickedLocation ={ lat: route.params.pickedLat, lng: route.params.pickedLng };
            if (mapPickedLocation) {
                setLocation(mapPickedLocation);
            }
        };
    }, [route, isFocused]);
    

    useEffect(() => {
        async function handleLocation() {
            if(pickedLocation){
                const address = await getAddress(pickedLocation.lat, pickedLocation.lng);
                onPickLocation({ ...pickedLocation,address:address }); 
            }
        }
        handleLocation();      
    }, [pickedLocation, onPickLocation]);
    
    async function verifyPermissions(){
        
        if (locationPermission.status=== PermissionStatus.UNDETERMINED) {
            const permission = await requestPermission();
            return permission.granted;
        }

        if (locationPermission.status === PermissionStatus.DENIED) {
            Alert.alert("Permission Not Provided", "You have to grant Permission to go ahead");
            return false;

         }
        return true;
    }
     
   async  function userLocationHandler() { 
 
       const hasLaocation = await verifyPermissions();
       if (!hasLaocation) {
           return;
       }
       const Location = await getCurrentPositionAsync();
       console.log(Location);
       setLocation({
           lat: Location.coords.latitude,
           lng: Location.coords.longitude,
         
       })
       
       
    };
    function MapHandler() {
        navigate.navigate("Map");
     };

    let PreviewLocation = <Text>No Location Selected Yet</Text>
    if (pickedLocation) {
        console.log(pickedLocation,LocAddress);
        PreviewLocation = <Image style={styles.image} source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }} />
        
    }
  return (
      <View>
          <View style={styles.mapPreview}>
              {PreviewLocation}
          </View>
          <View style={styles.actions}>
              <OutlineButton icon="location" onPress={userLocationHandler}>
                  Locate User
              </OutlineButton>
              <OutlineButton icon="map" onPress={MapHandler}>
                  Pick On Map
              </OutlineButton>
          </View>
   </View>
  )
}

export default LocationPicker;
const styles = StyleSheet.create({

    mapPreview: {
        width: "100%",
        height: 200,
        marginVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "gray",
        color:"#aca",
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems:"center",
    },
    image: {
        height: 200,
        width:300,
    }
    

})