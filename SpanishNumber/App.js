import React from 'react'
import { StyleSheet,
   Text,
    View,
  ScrollView,
  TouchableOpacity,
  Image } from 'react-native'
import Sound from 'react-native-sound'
const SoundList = [
  require('./assets/one.wav'),
  require('./assets/two.wav'),
  require('./assets/three.wav'),
  require('./assets/four.wav'),
  require('./assets/five.wav'),
  require('./assets/six.wav'),
  require('./assets/seven.wav'),
  require('./assets/eight.wav'),
  require('./assets/nine.wav'),
  require('./assets/ten.wav'),
]

const App = () => {

  const playSound = (sound) =>{
    const soundVar = new Sound(sound, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
      }
    });

    setTimeout(() => {
      soundVar.play()
    }, 1000);

    soundVar.release()

  }

  return (
    <ScrollView style={styles.container}>
      <Image style={styles.logo} source={require('./assets/logo.png')}/>
     <View style={styles.gridContainer}>
      {
        SoundList.map((sound,i)=>(
          <TouchableOpacity key={i} 
          style={styles.box}
          onPress={() => playSound(sound)}
          >
            <Text style={styles.text}>{i+1}</Text>
          </TouchableOpacity>
        ))
      }
     </View>
    </ScrollView>
  )
}

export default App

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#1b262c"
  },
  logo:{
    marginTop:20,
    alignSelf:"center"
  },
  gridContainer:{
    flex:1,
    margin:10,
    flexDirection:"row",
    flexWrap:"wrap",
    alignItems:"flex-start",
    justifyContent:"space-between"
  },
  box:{
    height:110,
    alignItems:"center",
    justifyContent:"center",
    width:"45%",
    marginVertical:6,
    backgroundColor:"#0f4c75",
    borderRadius:10,

    shadowColor:"#393e46",
    elevation:20,
    shadowRadius:10
  },
  text:{
    fontSize:50,
    color:"#ff4301"
  }
})
