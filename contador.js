import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Picker, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';   
import { Audio } from 'expo-av';
import { clear } from 'react-native/Libraries/LogBox/Data/LogBoxData';

export default function Contador(props){

    var done = false;

    useEffect(()=>{

    const timer = setInterval(()=>{

        props.setSegundos(props.segundos-1);

        if(props.segundos <= 0){
            if(props.minutos > 0){
                props.setMinutos(minutos-1);
                props.setSegundos(59);
            }else{
                if(!done){
                    done = true;
                    props.setEstado("selecionar");
                    props.setMinutos(0);
                    props.setSegundos(1);
                    playSound();
                }
            }
        }
     }, 1000)   
     
     return () => clearInterval(timer);

    })

    async function playSound(){
        const soundObject = new Audio.Sound();
        try{
            var alarme;
            props.alarmes.map(function(val){
                if(val.selecionado){
                    alarme = val.file;
                }
            })
            await soundObject.loadAsync(alarme);
            await soundObject.playAsync();

        } catch(error){
            //An error ocurred!
        }
    }

    function resetar(){
        props.setEstado('selecionar');
        props.setMinutos(0);
        props.setSegundos(1);
    }

    function fomartNumber(number){
        var finalNumber = "";
            if(number < 10){
                finalNumber = "0"+number;
            }else{
                finalNumber = number;
            }
            return finalNumber;
    }

    var segundos = fomartNumber(props.segundos);
    var minutos = fomartNumber(props.minutos);

    return(
        <View style={styles.Container}>
            <StatusBar style='auto'/>
            <LinearGradient 
                colors={['rgba(53, 45, 128,1)', 'rgba(53, 45, 128,0.7)']} 
                style={{position: 'absolute', left: 0, right:0, top:0, height:'100%'}}/>
           
            <View style={{flexDirection:'row'}}>
                <Text style={{color:'white', fontSize:40}}>{minutos} : </Text>
                <Text style={{color:'white', fontSize:40}}>{segundos}</Text>
            
            </View>

            <TouchableOpacity onPress={()=>resetar()} style={styles.btnResetar}><Text style={{color:'white', fontSize: 22, textAlign: 'center', marginTop:30}}>Resetar</Text></TouchableOpacity>


        </View>
    );
}

const styles = StyleSheet.create({

   Container: {
   flex: 1,
//    backgroundColor: '#352d80',
   alignItems: 'center',
   justifyContent: 'center',
   },
   btnResetar:{
    backgroundColor: 'rgba(25, 21, 74,0.9)',
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop:200,
    borderColor: 'rgb(25, 21, 74)',
    borderWidth: 4
  }
   


});