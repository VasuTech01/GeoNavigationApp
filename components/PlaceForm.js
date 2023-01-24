import React, { useState,useCallback} from 'react'
import { View, Text,ScrollView,TextInput ,StyleSheet} from "react-native";
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import { useNavigation,useRoute } from "@react-navigation/native";
import Button from '../UI/Button';
import { Place } from "../models/place";
import { StatusBar } from 'expo-status-bar';

function PlaceForm({onCreatePlace}) {

    const [enteredText, setEnteredText] = useState("");
    const [pickedLocation, setPickedLocation] = useState("");
    const [imageTaken, setTakenImage] = useState("");

    function changeTitleHandle(entext) {
       setEnteredText(entext);
    }
    const PickedLocationHandler = useCallback((pickedL) => {
        setPickedLocation(pickedL);
    }, []);
    function TakenImageHandler(img) {
        setTakenImage(img);
    }
    function submitForm() {
        const place = new Place(enteredText, imageTaken, pickedLocation);
        console.log(place);
        onCreatePlace(place);

    }
    return (
      <ScrollView style={styles.form} >
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} onChangeText={ changeTitleHandle} value={enteredText} />
            </View> 
            <ImagePicker onTakeImage={TakenImageHandler} />
            <LocationPicker onPickLocation={PickedLocationHandler} />
            <Button onPress={submitForm }>Click</Button>
      </ScrollView>
        
  )
}

export default PlaceForm;
const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 20,
        flexDirection: 'column',
    
    },
    label: {
        fontWeight: "bold",
        marginBottom: 4,
        fontSize:16,
        color: "white",  
    },
    input: {
        marginVertical: 4,
        paddingHorizontal: 4,
        paddingVertical: 6,
        fontSize: 16,
        borderBottomColor: "#591861",
        borderBottomWidth: 4,
        backgroundColor: "#ffff",
        borderRadius:8,
        color: "#591861",
        elevation:9,
    }

})