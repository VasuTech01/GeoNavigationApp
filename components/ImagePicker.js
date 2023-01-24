import React from 'react';
import { Alert, Button, View,Image,StyleSheet ,Text} from "react-native";
import { launchCameraAsync ,useCameraPermissions,PermissionStatus} from "expo-image-picker";
import { useState } from "react";
import OutlineButton from '../UI/OutlineButton';
function ImagePicker({onTakeImage}) {
    const [pickedImage, setPickedImage] = useState();
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();


    async function VerifyPermission() {
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const PermissionRespo = await requestPermission();
            return PermissionRespo.granted;
        }
        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert("Permission Not Provided", "You have to grant Permission to go ahead");
            return false;
        }   
        return true;
 }



    async function ImageHandler() {
        const ImagePermission = await VerifyPermission();
        if (!ImagePermission) {
            return;
        }
        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality:0.5
        });
       
        setPickedImage(image);
        onTakeImage(image);
        
        
   }

    let Preview = <Text>No Image Taken yet</Text>;
    if (pickedImage) {
        Preview = <Image style={styles.image } source={{ uri: pickedImage.uri }} />         
    }
  return (
      <View>
          <View style={styles.imagePreview}>
                 {Preview}
          </View>
          <OutlineButton icon="camera" onPress={ImageHandler} >
              Take Photo
          </OutlineButton>
  </View>
    )
}

export default ImagePicker;
const styles = StyleSheet.create({
    imagePreview: {
        width: "100%",
        height: 200,
        marginVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "gray",
        color:"#aca",
    },
    image: {
        width: "100%",
        height:"100%",
    }

})