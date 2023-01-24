import React from 'react';
import { View, Text, Image, Pressable ,StyleSheet} from "react-native";
function PlaceItem({place,onSelect}) {
  return (
    <Pressable style={ ({pressed})=>[styles.item,pressed&&styles.pressed]} onPress={onSelect.bind(this,place.id)}>
          <Image   style={styles.image} source={{uri:place.imageUri}} />
          <View style={styles.info}>
        <Text style={styles.title} onPress={onSelect}>{ place.title}</Text>
        <Text style={styles.address}> {place.address }</Text>
          </View>     
    </Pressable>
  )
}

export default PlaceItem;
const styles = StyleSheet.create({

  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: "#61048b",
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    borderRadius: 6,
    color:"white"
  },
  pressed: {
    opacity:0.8,
    
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height:100
  },
  info: {
    flex: 2,
    padding: 12,
    color:"white",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color:"white"
  },
  address: {
    fontSize: 12,
    color:"gray"
  }

})