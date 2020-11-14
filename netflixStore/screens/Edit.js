import React,{useState,useEffect} from 'react'
import { StyleSheet, Text,ScrollView } from 'react-native'
import { Container,
        Button,
        Form,
        Item,
        Input,
        H1
    } from 'native-base';

    import shortid from 'shortid'
    import AsyncStorage from '@react-native-community/async-storage';
    import Snackbar from 'react-native-snackbar';

export default function Edit({navigation, route}) {

  const [name,setName] = useState('')
  const [totalNoOfSession,setTotalNoOfSession] = useState('')
  const [id,setId] = useState(null)

  useEffect(()=>{
    const {data} = route.params

    const {name,id,totalNoOfSession} = data

    setName(name)
    setTotalNoOfSession(totalNoOfSession)
    setId(id)

  },[])

  const editAddToList = async() =>{
      try {

         if(!name || !totalNoOfSession){
             return Snackbar.show({
                 text: 'Please enter all value',
                 backgroundColor: '#ea7773',
                 textColor:"#fff"
               });
         }else{
             const sessionToAdd = {
                 id:id,
                 name:name,
                 totalNoOfSession:totalNoOfSession,
                 isWatched:false
             }

             const storedValue = await AsyncStorage.getItem('@season_list')
             const List = await JSON.parse(storedValue)

             List.map((season) =>{
               if(season.id == id){
                season.name = name;
                season.totalNoOfSession = totalNoOfSession;
               }
               return season
             })

             await AsyncStorage.setItem('@season_list',JSON.stringify(List))

             setName('')
             setTotalNoOfSession('')
             navigation.navigate('Home')
         }
          
      } catch (error) {
          console.log(error)
      }
  }

    return (
      <Container style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow:1}}>
         <H1 style={styles.heading}>Edit Season</H1>

         <Form>
          <Item rounded style={styles.formItem}>
               <Input
               value={name}
               onChangeText={(text) => setName(text)}
               placeholder="Season Name"
               style={{color:"#eee"}}
               />
          </Item>
          <Item rounded style={styles.formItem}>
               <Input
               value={totalNoOfSession}
               onChangeText={(text) => setTotalNoOfSession(text)}
               placeholder="Total no of seseason"
               style={{color:"#eee"}}
               />
          </Item>
          <Button rounded block onPress={editAddToList}>
              <Text style={{color:"#eee"}}>Edit</Text>
          </Button>
      </Form>

      </ScrollView>
  </Container>

    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#1b262c',
      flex: 1,
      justifyContent: 'flex-start',
    },
    heading: {
      textAlign: 'center',
      color: '#00b7c2',
      marginHorizontal: 5,
      marginTop: 50,
      marginBottom: 20,
    },
    formItem: {
      marginBottom: 20,
    },
  });
