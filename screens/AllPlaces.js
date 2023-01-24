import { useIsFocused } from '@react-navigation/native';
import React, { useState,useEffect} from 'react'
import PlacesList from '../components/PLacesList';
import { fetchPlaces } from "../Util/DataBase";


function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  const isFocused = useIsFocused();
  useEffect(() => {
    async function loadPlaces() { 
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    }
    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused,fetchPlaces]);

  return (
    <PlacesList places={ loadedPlaces} />
  )
}

export default AllPlaces