import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './UI/IconButton';
import Map from './screens/Map';
import { useEffect,useState } from 'react';
import { init } from "./Util/DataBase";
import AppLoading from 'expo-app-loading';
import PlaceDetails from './screens/PlaceDetails';
const Stack = createNativeStackNavigator();

export default function App() {

  const [dbLoadingStatus, setDbloadingStatus] = useState(false);
  


  useEffect(() => {
    init().then(() => {
      setDbloadingStatus(true);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  // if (!dbLoadingStatus) {
  //   return <AppLoading />;
  // }
  return (
    <>
      
      <StatusBar  style="inverted"/>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: "#61048b",     
          },headerTintColor: "white",
           contentStyle: {
            backgroundColor:"#a5a2a2",
          }
        }}>
          <Stack.Screen name="AllPlaces" component={AllPlaces}
            options={({ navigation }) => ({
              title:"Your Favourite Places",
              headerRight: ({ tintColor }) => <IconButton name="add" color={tintColor} size={24} onPress={() => {
                navigation.navigate("AddPlace");
              }} />
            
            })} />   
          <Stack.Screen name="AddPlace" component={AddPlace} />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="PlaceDetails" component={PlaceDetails}
           
          />
        </Stack.Navigator>

      </NavigationContainer>
    </>
  );
}


