import React,{useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Axios from 'axios'
import {Button} from 'native-base'

const key = 1
const URL = 'https://randomuser.me/api/'

export default function App() {

  const [details,setDetails] = useState(null)

  const fetchDetails = async () =>{
    try {
       const {data} = await axios.get(URL)

       console.log(data.results[0])

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View>
      <Text>Hii</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
