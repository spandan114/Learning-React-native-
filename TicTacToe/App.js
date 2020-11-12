import React,{useState} from 'react'
import { StyleSheet,
   TouchableOpacity,
   View } from 'react-native'
import {
  Text,
  Container,
  Header,
  Card,
  Body,
  H1,H3,
  Button,
  Title
} from "native-base"
import Snackbar from 'react-native-snackbar';

import {Icons} from "./icon"

const itemArray = new Array(9).fill('empty')

export default function App() {

  const [isCross,setCross] = useState(false)
  const [winMessage,setWinMessage] = useState('')

  const ChangeItem = (itemNumber) => {
    if(itemArray[itemNumber] === 'empty'){
      itemArray[itemNumber] = isCross ? 'cross' : 'circle';
      setCross(!isCross)
    }else{
      return Snackbar.show({
        text: "Position is alredy filled",
        backgroundColor: '#ea7773',
        textColor:"#fff"
      });
    }
    checkIsWinner()
  }

  const relodeGame = () => {
    setCross(false)
    setWinMessage("")
    itemArray.fill("empty",0,9)
  }

  const checkIsWinner = () =>{
    if(
      itemArray[0] === itemArray[1] &&
      itemArray[0] === itemArray[2] &&
      itemArray[0] !== "empty"
    ){
      setWinMessage(`${itemArray[0]} won`)
    }else if(
      itemArray[3] !== "empty" &&
      itemArray[3] === itemArray[4] &&
      itemArray[4] === itemArray[5] 
    ){
      setWinMessage(`${itemArray[3]} won`)
    }else if(
      itemArray[6] !== "empty" &&
      itemArray[6] === itemArray[7] &&
      itemArray[7] === itemArray[8] 
    ){
      setWinMessage(`${itemArray[6]} won`)
    }else if(
      itemArray[0] !== "empty"  &&
      itemArray[0] === itemArray[3] &&
      itemArray[3] === itemArray[6]      
    ){
      setWinMessage(`${itemArray[0]} won`)
    }else if(
      itemArray[1] !== "empty"  &&
      itemArray[1] === itemArray[4] &&
      itemArray[4] === itemArray[7]      
    ){
      setWinMessage(`${itemArray[1]} won`)
    }else if(
      itemArray[2] !== "empty"  &&
      itemArray[2] === itemArray[5] &&
      itemArray[5] === itemArray[8]      
    ){
      setWinMessage(`${itemArray[2]} won`)
    }else if(
      itemArray[0] !== "empty"  &&
      itemArray[0] === itemArray[4] &&
      itemArray[4] === itemArray[8]      
    ){
      setWinMessage(`${itemArray[0]} won`)
    }else if(
      itemArray[2] !== "empty"  &&
      itemArray[2] === itemArray[4] &&
      itemArray[4] === itemArray[6]      
    ){
      setWinMessage(`${itemArray[2]} won`)
    }
  }


  return (
    <Container style={{backgroundColor:"#333945",padding:5}}>
      <Header>
        <Body>
          <Title>
            MY TIC TAC TOE
          </Title>
        </Body>
      </Header>
      <View style={styles.grid}>
        {
          itemArray.map((item,i)=>(
            <TouchableOpacity
             style={styles.box}
             key={i}
             onPress={() => ChangeItem(i)}
            >
              <Card style={styles.card}>
                <Icons name={item} />
              </Card>
            </TouchableOpacity>
          ))
        }
      </View>
      {
        winMessage ? (
          <View>
            <H1 style={styles.message}>{winMessage}</H1>
            <Button
            onPress={relodeGame}
            primary
            block
            rounded
            >
              <Text>Relode Game</Text>
            </Button>
          </View>
        ) :(
          <H3 style={styles.message}>
            {isCross ? "cross" : "circle"} turns
          </H3>
        )
      }
    </Container>
  )
}

const styles = StyleSheet.create({
  grid:{
    flex:1,
    flexDirection:"row",
    flexWrap:"wrap",
    marginTop:20
  },
  box:{
    width:"33%",
    marginBottom:5
  },
  card:{
    height:120,
    justifyContent:"center",
    alignItems:"center"
  },
  message:{
    textAlign:"center",
    textTransform:"uppercase",
    color:"#fff",
    marginTop:20,
    backgroundColor:"#4652b3",
    paddingVertical:10,
    marginVertical:10
  }
})
