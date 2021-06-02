import { StatusBar } from 'expo-status-bar';

import React,{useRef} from 'react';

import { StyleSheet,
   Text, 
   View, 
   ScrollView,
   Image, 
   ImageBackground, 
   useWindowDimensions, 
   Animated } 
   from 'react-native';


import Icon from 'react-native-ionicons';

import sunny from "./assets/sunny-outline.svg";
import rainy from "./assets/rainy-outline.svg";
import moon from "./assets/moon-outline.svg";
import cloudy from "./assets/cloudy-outline.svg";




import { useFonts } from 'expo-font';
import * as font from "expo-font";

import Location from './model/Location';

export default function App() {
              
         const { width: windowWidth , height:windowHeight  } = useWindowDimensions()
         
          const scrollX = useRef(new Animated.Value(0)).current;
          
          const [loaded] = useFonts({
            DancingScriptBold: require('./assets/fonts/DancingScript-Bold.ttf'),
            StintUltraCondensed: require('./assets/fonts/StintUltraCondensed-Regular.ttf'),
            Lato: require('./assets/fonts/Lato-Regular.ttf'),
            });
            
            if (!loaded) {
              return null;
            }

    return (     
                <>
                  <StatusBar barStyle={"light-content"} />
                  <ScrollView 
                     horizontal={true} pagingEnabled
                     showsHorizontalScrollIndicator={false}

                           onScroll={Animated.event(
                        [
                          {
                            nativeEvent: {
                              contentOffset: {
                                x: scrollX,
                              },
                            },
                          },
                        ],
                        {useNativeDriver: false},
                      )}
                      scrollEventThrottle={1}> 

                    {Location.map((Location,index)=> {

                      if(Location.weatherType == 'Night')
                      {
                        bgImg = require('./assets/night2.jpg');
                      }
                     else if(Location.weatherType == 'Rainy')
                      {
                        bgImg = require('./assets/rain2.jpg');
                      }
                      else if(Location.weatherType == 'Sunny')
                      {
                        bgImg = require('./assets/sunny.jpg');
                      }
                      else if(Location.weatherType == 'Cloudy')
                      {
                        bgImg = require('./assets/cloudy.jpg');
                      }

                      return(
                           <View style={{width: windowWidth , height:windowHeight}}  key={index} >
                        <ImageBackground source={bgImg}
                        style={{flex:1}} >

                        <View 
                           style={{
                             flex:1,
                            padding:20,
                           }}> 
                           
                        <View style={styles.top}>
                            <View>
                                <Text style={styles.city}>{Location.city}</Text>
                                <Text style={styles.date}>{Location.dateTime}</Text>
                            </View>
                              <View>
                                <Text style={styles.temp}>{Location.temparature}</Text>
                           
                                <View>
                                       <Text style={styles.weather}>{Location.weatherType}</Text>
                                       <Icon name="camera" size={40} color="red" />
                                </View>
                               
                            </View>
                       
                       

                        </View>
                        <View style={styles.line} />

                        <View style={styles.bottom}></View>


                           
                        </View>
                        </ImageBackground>
                    </View>
                      );
 }) }
                  </ScrollView>


                  
                       <View
                       style={styles.indicatorWrapper}>
                           {Location.map((Location,index) =>{
                             const width = scrollX.interpolate({
                            inputRange: [
                              windowWidth * (index - 1),
                              windowWidth * index,
                              windowWidth * (index + 1),
                            ],
                            outputRange: [5, 12, 5],
                            extrapolate: 'clamp',
                          });

                           return(

                                  <Animated.View
                                   key={index} style={[styles.normalDot, {width}]}
                                />
                              );
                             }
                           )}      
                       </View>
                   </>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

   top:{
    flex: 1,
    marginTop: 160,
    justifyContent: 'space-between',
   backgroundColor:'red',
   },
   city:{
        fontSize:40,
        color:'white',
        fontWeight:'bold',
        fontFamily:'Lato',
   },

   date:{
       fontSize:20,
       color:'white',
       fontWeight:"bold",
       fontFamily:'StintUltraCondensed',
   },

   temp:{
       
        fontSize:40,
        color:'white',
        fontFamily:'DancingScriptBold',
        fontWeight:'bold',
        lineHeight:40,

   },
   weather:{
         fontSize:25,
        color:'white',
        fontFamily:'StintUltraCondensed',
        fontWeight:'bold',
        lineHeight:40,

   },

   indicatorWrapper: {
    position: 'absolute',
    top: 140,
    left: 150,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  normalDot: {
    height: 6,
    width: 5,
    borderRadius: 5,
    marginHorizontal: 4,
    backgroundColor: '#fff',
  },   

})

