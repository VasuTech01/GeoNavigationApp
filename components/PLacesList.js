import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import PlaceItem from "./PlaceItem";
function PlacesList({ places }) {
  const navigation=  useNavigation();
    function pressHandler(id) {
        console.log(id);
        navigation.navigate("PlaceDetails", {
             placeId:id
         })
     }
    
    if (!places||places.length === 0) {
    return (    <View style={styles.fallbackcont}>
         <Text style={styles.fallbackText}>No Places Added Yet -Start Adding Some!</Text>
     </View>)
    }
    return (<FlatList style={styles.list} data={places} keyExtractor={(item) => item.id} renderItem={({ item }) => <PlaceItem place={item} onSelect={pressHandler} />} />)
}
export default PlacesList;
const styles = StyleSheet.create({
    list: {
        margin: 20,   
    },
    fallbackcont: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    fallbackText: {
        fontSize: 16,
        color:"white",
    }
})