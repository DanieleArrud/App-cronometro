import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Picker, ScrollView, TouchableOpacity } from 'react-native';
import { PickerItem } from 'react-native/Libraries/Components/Picker/Picker';
import { LinearGradient } from 'expo-linear-gradient';   
import { Audio } from 'expo-av';  
import Contador from './contador';

export default function App() {

  console.disableYellowBox = true;

  const [estado, setEstado] = useState('selecionar');

  const [segundos, setSegundos] = useState(1);

  const [minutos, setMinutos ] = useState(0);

  const [alarmeSound , setAlarmerSound] = useState([
    {
      id:1,
      selecionado: true,
      som: "alarme 1",
      file: require('./assets/alarme1.mp3')
    },
    {
      id:2,
      selecionado: false,
      som: "alarme 2",
      file: require('./assets/alarme2.mp3')
    },
    {
      id:3,
      selecionado: false,
      som: "alarme 3",
      file: require('./assets/alarme3.mp3')
    }
  ])

  var numeros = [];
  for(var i = 1; i<=60; i++){
    numeros.push(i);
  }

  function setAlarme(id){
    let alarmesTemp = alarmeSound.map(function(val){
      if(id != val.id)
      val.selecionado = false;
      else
      val.selecionado = true;
      return val;
    })
    setAlarmerSound(alarmesTemp);
  }

  if(estado == 'selecionar'){
 
  return (
    
    <View style={styles.container}>
    <StatusBar style='auto'/>
      <LinearGradient 
      colors={['rgba(53, 45, 128,1)', 'rgba(53, 45, 128,0.7)']} 
      style={{position: 'absolute', left: 0, right:0, top:0, height:'130%'}}/>

      <Text style={{color:'white', fontSize: 30}}>Selecione o seu tempo</Text>
      
      <View style={{flexDirection:'row'}}>

      <Text style={{color:'white', paddingTop:15}}>Minutos</Text>
      <Picker style={{height:50, width: 100, color:"white"}}
      onValueChange={(itemValue, itemIndex) => setMinutos(itemValue)}
      selectedValue={minutos}>

        <Picker.Item label="0" value="0"/>
          {
            numeros.map(function(val){
              return(<Picker.Item label={val.toString()} value={val.toString()}/>);
            })
          }
      
      </Picker>
        
      <Text style={{color:'white', paddingTop:15}}>Segundos</Text>
      <Picker style={{height:50, width: 100, color:"white"}}
      onValueChange={(itemValue, itemIndex) => setSegundos(itemValue)}
      selectedValue={segundos}>

        <Picker.Item label= '0' value='0'/>
        {
            numeros.map(function(val){
              return(<Picker.Item label={val.toString()} value={val.toString()}/>);
            })
          }

      </Picker>

      </View>

      <View style={{marginTop:10, borderTopColor: 'black', borderTopWidth:1}}>
        {
        alarmeSound.map(function(val){
          if(val.selecionado){
          return(
            <TouchableOpacity onPress={()=>setAlarme(val.id)} style={styles.btnEscolherSelecionado}>
              <Text style={{color:'white', textAlign: 'center'}}>{val.som}</Text>
            </TouchableOpacity>
          )
          }else{
            return(
            <TouchableOpacity onPress={()=>setAlarme(val.id)} style={styles.btnEscolher}>
              <Text style={{color:'white', textAlign: 'center'}}>{val.som}</Text>
            </TouchableOpacity>
            )
          }
        })
      }
      </View>

      <TouchableOpacity onPress={()=>setEstado('iniciar')} style={styles.btnIniciar}><Text style={{color:'white', fontSize: 22, textAlign: 'center', marginTop:30}}>Iniciar</Text></TouchableOpacity>
    </View>
  ); } 
  else if(estado == 'iniciar'){
    return(

      <Contador alarmes={alarmeSound} setEstado={setEstado} setMinutos={setMinutos} setSegundos={setSegundos} minutos={minutos} segundos={segundos}></Contador>
    
    );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#352d80',
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnEscolher:{
    width: 200,
    
        marginTop: 10,
    padding: 8,
    backgroundColor: '#0c0a21',
    borderRadius:12
  },
  btnEscolherSelecionado:{
    width: 200,
    marginTop: 10,
    padding: 8,
    backgroundColor: '#0c0a21',
    borderRadius:12,
    backgroundColor: "rgba(12, 10, 33,0.3)"
  },
  btnIniciar:{
    backgroundColor: 'rgba(25, 21, 74,0.9)',
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop:30,
    borderColor: 'rgb(25, 21, 74)',
    borderWidth: 4
  }
});
