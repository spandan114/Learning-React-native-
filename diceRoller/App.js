import React,{useState} from 'react'
import { StyleSheet,
   Text, 
   Image,
   View ,
   TouchableOpacity,
   Pressable
  } from 'react-native'

  import  DiceOne from './assets/dice1.png'
  import  DiceTwo from './assets/dice2.png'
  import  DiceThree from './assets/dice3.png'
  import  DiceFour from './assets/dice4.png'
  import  DiceFive from './assets/dice5.png'
  import  DiceSix from './assets/dice6.png'

const App = () => {

  const [uri,setUri] = useState(DiceFive)
  const [uri2,setUri2] = useState(DiceTwo)

  const play = () =>{
    let randomNumber = Math.floor(Math.random() * 6) + 1;

    switch(randomNumber){
      case 1:
        setUri(DiceOne)
        break
      case 2:
        setUri(DiceTwo)
        break
      case 3:
        setUri(DiceThree)
        break
      case 4:
        setUri(DiceFour)
        break
      case 5:
        setUri(DiceFive)
        break
      case 6:
        setUri(DiceSix)
        break
    }

  }
  const play2 = () =>{
    let randomNumber = Math.floor(Math.random() * 6) + 2;

    switch(randomNumber){
      case 1:
        setUri2(DiceOne)
        break
      case 2:
        setUri2(DiceTwo)
        break
      case 3:
        setUri2(DiceThree)
        break
      case 4:
        setUri2(DiceFour)
        break
      case 5:
        setUri2(DiceFive)
        break
      case 6:
        setUri2(DiceSix)
        break
    }

  }

  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={play}>
      <Image source={uri} style={styles.image} />
      </TouchableOpacity>

      <TouchableOpacity onPress={play2}>
      <Image source={uri2} style={styles.image} />
      </TouchableOpacity>
      
      {/* <Pressable onPress={play}>
         <Text style={styles.button}>Play game</Text>
      </Pressable> */}
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#222831"
  },
  button:{
    color:"#F2A365",
    paddingVertical:20,
    paddingHorizontal:40,
    borderRadius:25,
    marginTop:30,
    borderColor:"#30475e",
    borderWidth:3,
    fontWeight:"bold",
    fontSize:20
  },
  image:{
    width:200,
    height:200
  }
})

