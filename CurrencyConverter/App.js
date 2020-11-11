import React,{useState} from 'react'
import { StyleSheet,
 Text,ScrollView,
 View,SafeAreaView,
 TextInput,
 TouchableOpacity
 } from 'react-native'
 import Snackbar from 'react-native-snackbar';

 const currencyPerRupee = {
   DOLLAR : 0.014,
   EURO : 0.012,
   POUND : 0.011,
   RUBEL : 0.93,
   AUSDOLLAR : 0.2,
   CADOLLAR : 0.019,
   YEN : 1.54,
   DINR : 0.0043,
   BITCOIN : 0.000004
 }

export default function App() {

  const [inputValue,setInputValue] = useState(0)
  const [resultValue,setResultValue] = useState(0)

  const buttonPress = (currency) =>{
    if(!inputValue){
     return Snackbar.show({
        text: 'Please enter a value',
        backgroundColor: '#ea7773',
        textColor:"#fff"
      });
    }

    console.log(currency)

    let results = parseFloat(inputValue)*currencyPerRupee[currency];
    setResultValue(results.toFixed(2))

  }

  return (
    <ScrollView 
    backgroundColor="#1b262c"
    //keyboardDismissMode="true"
    keyboardShouldPersistTaps="handled"
   // contentInsetAdjustmentBehavior="automatic" for ios
    >
      <SafeAreaView style={styles.container} >
         <View style={styles.resultContainer}>
           <Text style={styles.resultValue}>{resultValue}</Text>
         </View>
         <View style={styles.inputContainer}>
           <TextInput 
           style={styles.input}
           keyboardType="numeric"
           placeholder="Enter Value"
           placeholderTextColor="#c1c1c1"
           value={inputValue}
           onChangeText={(inputValue)=>setInputValue(inputValue)}
           ></TextInput>
         </View>
         <View style={styles.convertButtonContainer}>
           {Object.keys(currencyPerRupee).map((currency,i) => (
             <TouchableOpacity 
             key={i}
             style={styles.converterButton}
             onPress={()=>buttonPress(currency)}
             >
               <Text style={styles.btnText}>{currency}</Text>
             </TouchableOpacity>
           ))}
         </View>
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#1b262c"
  },
  resultContainer:{
    height:70,
    marginTop:80,
    justifyContent:"center",
    borderColor:"#bbe1fa",
    borderWidth:2,
    alignItems:"center"
  },
  resultValue:{
    color:"#fff",
    fontWeight:"bold",
    fontSize:30
  },
  inputContainer:{
    height:70,
    marginTop:10,
    justifyContent:"center",
    borderColor:"#bbe1fa",
    borderWidth:2,
    alignItems:"center"
  },
  input:{
    fontSize:30,
    textAlign:"center",
    color:"#fff"
  },
  convertButtonContainer:{
    flexDirection:"row",
    flexWrap:"wrap",
  },
  converterButton:{
    alignItems:"center",
    justifyContent:"center",
    height:100,
    width:"33.3%",
    borderWidth:2,
    borderColor:"#bbe1fa",
    marginTop:10,
    backgroundColor:"#0f4c75",
  },
  btnText:{
    color:"#fff",
    fontSize:15
  }
})
