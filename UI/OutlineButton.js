import React from 'react';
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
function OutlineButton({icon,onPress,children}) {
  return (
      <Pressable style={({pressed})=> [styles.button,pressed&&styles.pressed]} onPress={onPress}>
          <Ionicons style={ styles.icon} name={icon} size={23} color="#89bd8d" />
          <Text style={styles.text}>
              {children}
          </Text>
          
       </Pressable>
  )
}

export default OutlineButton;
const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        margin: 4,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: "#591861",
        color:"#ed66"

    },
    pressed: {
        opacity:0.7,
    },
    icon: {
        marginRight:6,
    }, text: {
        color:"#ed66",
    }


})