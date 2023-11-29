import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Dashboard } from './src/pages/Dashboard';
import { NavigationContainer } from '@react-navigation/native';
import { useState, useRef, useEffect } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import { Alarmas } from "./src/pages/Alarmas"
import { Config } from "./src/pages/Config"

import { Entypo, Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import axios from 'axios';


const Tab = createBottomTabNavigator();




Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});




export default function Layout() {
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => console.log(token));
  }, []);


  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      try {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = "";
        finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }

        token = await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig.extra.eas.projectId,
        });

      } catch (error) {
        
        console.log(error)
        return;
      }

      

      if (finalStatus === 'granted') {
        console.log("saving token")
        /*

        const toSend = {
          mobileData: {
            token: token.data,
            os: "Android"
          }
        }

        const axiosHeaders = {
          headers: {
            token: authToken,
            "Content-Type": "application/json"
          }
        };
        
        await axios.put("https://localhost:3001/api/addnotificationtoken", toSend, axiosHeaders)
          .then((response) => {
            
            if(response.data.active==true){
              //activa
            }else{
              //no activa
            }
            
           console.log(response)
           return;

          }).catch((error) => {
            console.log(error);
            return;
          })

          */
      }
      
      console.log(token.data)
    }
    if (token){
      return token.data;
    }else{
      return "";
    }
  }

  

  return (
    <NavigationContainer>
      {/*rutas*/}
      
            <Tab.Navigator options={{ headerShown: false }}>
              <Tab.Screen name="Panel" component={Dashboard} options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <Entypo name="leaf" size={size} color={color} />
                )

              }} ></Tab.Screen>
              <Tab.Screen name="Alarmas" component={Alarmas} options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="timer-cog" size={size} color={color} />
                )
              }}></Tab.Screen>

              <Tab.Screen name="Configuración" component={Config} options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="settings-sharp" size={size} color={color} />
                )
              }}>
              </Tab.Screen>
            </Tab.Navigator>
        

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00cf20',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
