import React,{useState} from 'react'
import { StyleSheet, 
  Text, View ,
  TouchableOpacity,
  Image,
  Button
} from 'react-native'

import { RNCamera } from 'react-native-camera';

const PendingView = () =>{
  return(
  <View
  style={{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  }}
  >
    <Text style={{fontSize:30,color:"red"}}>Loding...</Text>
  </View>
  )
}

export default function App() {

  const [image,setImage] = useState(null)

  const takePicture = async (camera) =>{
    try {

      const options = { quality: 0.9, base64: false };
      const data = await camera.takePictureAsync(options);
      setImage(data.uri)     
    } catch (err) {
      console.warn(err)
    }
  }

  return (
    <View style={styles.container}>
      {
        image?(
          <>
          <Text style={styles.camText}>Here is your image</Text>
          <Image source={{uri:image,width:'100%',height:'80%'}} />
          <Button
          title="Click a new image"
          onPress={() => setImage()}
          ></Button>
          </>           
        ):(
          <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          captureAudio={false}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Permission to use camere',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          >
            {({camera,status}) => {
               if (status !== 'READY') return <PendingView /> 
 
                return(
                  <View
                  style={{
                    flex:0,
                    flexDirection:"row",
                    justifyContent:"center"
                  }}
                  >
                    <TouchableOpacity
                    style={styles.capture}
                    onPress={() => takePicture(camera)}
                    >
                      <Text>SNAP</Text>
                    </TouchableOpacity>
                  </View>
                )
               }
            }
          </RNCamera>
        )
      }
      
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#0a79df",
    flexDirection:"column"
  },
  preview:{
    flex:1,
    alignItems:"center",
    justifyContent:"space-around"
  },
  capture:{
    flex:0,
    backgroundColor:"orange",
    padding:20,
    alignSelf:"center"
  },
  camText:{
    backgroundColor:"#3498DB",
    color:"#FFF",
    width:"100%",
    textAlign:"center",
    marginTop:10,
    paddingVertical:20,
    fontSize:25
  },
  clicked:{
    width:300,
    height:300,
    borderRadius:25,
    padding:30
  }
})
