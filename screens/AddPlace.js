import React from 'react';
import PlaceForm from '../components/PlaceForm';
import { insertPlaces } from '../Util/DataBase';

function AddPlace({navigation}) {
  async function createPlaceHandler(place) {
    console.log("inserting");
    const respo = await insertPlaces(place);

    console.log("inserted",respo);
    navigation.navigate("AllPlaces", {
      place: place
    })   
    console.log(place) ; 
   }
    return (
      <PlaceForm onCreatePlace={createPlaceHandler} />
  )
}

export default AddPlace;