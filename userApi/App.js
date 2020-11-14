import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Axios from 'axios'
import {Button} from 'native-base'
import Users from './components/Users'

const key = 1
const URL = 'https://randomuser.me/api/'

export default function App() {

  const [details,setDetails] = useState(null)

  const fetchDetails = async () =>{
    try {
       const {data} = await Axios.get(URL)
       setDetails(data.results[0])
      } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchDetails()
  },[])

  if(!details){
    return(
    <View style={styles.container}>
      <Text style={{color:"#fff",alignItems:"center",justifyContent:"center"}}>Loding....</Text>
    </View>
    )
  }else{
        return (
        <View style={styles.container}>
          <View>
            <Users details={details} />

            <Button rounded 
              onPress={() => fetchDetails()}
              style={styles.button}>
            <Text>New user</Text>
          </Button>
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#222831"
  },
  button:{
    marginTop:30,
    paddingHorizontal:30,
  }
})
