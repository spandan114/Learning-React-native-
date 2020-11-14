import React,{useState,useEffect} from 'react'
import { StyleSheet, View, ScrollView} from 'react-native'
import { 
    List,
    ListItem,
    Left,
    Button,
    Icon,
    Body,
    CheckBox,
    Title,
    Text,
    H1,
    Fab,
    container,
    Subtitle,
    Right,
    Container,
    Spinner
 } from "native-base";
 import AsyncStorage from '@react-native-community/async-storage';
 import {useIsFocused} from '@react-navigation/native'

export default function Home({navigation,route}) {

    const [leastOfSeason, setListOfSeason] = useState([])
    const [loding, setLoding] = useState(false)

    const isFocused = useIsFocused()

    const getList = async () => {
        setLoding(true)
        const storedValue = await AsyncStorage.getItem('@season_list')

       // await AsyncStorage.clear("@season_list")
    
        if(!storedValue[1]){
            setListOfSeason([])
        }
        const list = JSON.parse(storedValue)
        setListOfSeason(list)
        setLoding(false)
    }
    const deleteSeason = async (id) => {
        const newList = await leastOfSeason.filter((list) => list.id !== id)
        await AsyncStorage.setItem('@season_list', JSON.stringify(newList));

        setListOfSeason(newList)
    }

    const markComplete = async (id) => {
        const newArr = leastOfSeason.map((list) => {
            if (list.id == id) {
                list.isWatched = !list.isWatched
            }
            return list
        })

        await AsyncStorage.setItem('@season_list', JSON.stringify(newArr))
        setListOfSeason(newArr)
    }

    
    useEffect(() => {
        getList();
    },[isFocused])

    if(loding){
        return(
            <Container style={styles.container}>
                <Spinner color="#00b7c2" />
            </Container>
        )
    }

    return (

        <ScrollView contentContainerStyle={styles.container} >
            
            {leastOfSeason.length == 0 ?(
                <Container style={styles.container}>
                    <H1 style={styles.heading}>Watchlist is empty. please add a season</H1>
                </Container>
            ):(
                <>
                <H1 style={styles.heading}>Next series to watch</H1>
                <List>
                    {
                        leastOfSeason.map((data,i) =>(
                            <ListItem style={styles.listItem} noBorder key={i}>
                            <Left>
                                <Button style={styles.actionButton} danger onPress={() => deleteSeason(data.id)}>
                                    <Icon
                                    name="trash"
                                    active
                                    />
                                </Button>
                                <Button style={styles.actionButton} warning
                                onPress={() => {
                                    navigation.navigate('Edit', {data})
                                }}
                                >
                                    <Icon
                                    name="edit"
                                    type="Feather"
                                    />
                                </Button>
                            </Left>
                            <Body>
                                <Title style={styles.seasonName}> {data.name} </Title>
                                 <Text note>{data.totalNoOfSession}</Text>
                            </Body>
                            
                            <Right>
                               <CheckBox 
                                 checked={data.isWatched}
                                 onPress={() => markComplete(data.id)}
                               />
                            </Right>
                        </ListItem>
                   
                        ))
                    }
                </List>
                </>
            )}

            <Fab
            styles={{backgroundColor:'#5067FF'}}
            position="bottomRight"
            onPress={() => navigation.navigate('Add')}
            >
              <Icon name="add" />  
            </Fab>
        </ScrollView>
    
    )
}

const styles = StyleSheet.create({
    emptyContainer: {
      backgroundColor: '#1b262c',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      backgroundColor: '#1b262c',
      flex: 1,
    },
    heading: {
      textAlign: 'center',
      color: '#00b7c2',
      marginVertical: 15,
      marginHorizontal: 5,
    },
    actionButton: {
      marginLeft: 5,
    },
    seasonName: {
      color: '#fdcb9e',
      textAlign: 'justify',
    },
    listItem: {
      marginLeft: 0,
      marginBottom: 20,
    },
  });
