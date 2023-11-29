import axios from 'axios';
import React, { useContext, useEffect, useState, lazy } from 'react'
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, SafeAreaView, StatusBar, Modal, Pressable } from 'react-native';


const ingestas = [
  {
    "_id": "654bc79646925f91ba81b3c3",
    "userId": "654bb0ef95d78da1489112cc",
    "foodId": 2,
    "grams": 100,
    "time": 1699465110411,
    "__v": 0
  },
  {
    "_id": "654bc7a746925f91ba81b3c6",
    "userId": "654bb0ef95d78da1489112cc",
    "foodId": 5,
    "grams": 100,
    "time": 1699465127159,
    "__v": 0
  },
  {
    "_id": "654bc7cc46925f91ba81b3c9",
    "userId": "654bb0ef95d78da1489112cc",
    "foodId": 1,
    "grams": 100,
    "time": 1699465164535,
    "__v": 0
  },
  {
    "_id": "654d153ce6ebfeadea56e4d8",
    "userId": "654bb0ef95d78da1489112cc",
    "foodId": 5,
    "grams": 200,
    "time": 1699550524503,
    "__v": 0
  },
  {
    "_id": "654d6884889d4480e1b2e1a6",
    "userId": "654bb0ef95d78da1489112cc",
    "foodId": 8,
    "grams": 200,
    "time": 1699571844964,
    "__v": 0
  },
  {
    "_id": "654d6889889d4480e1b2e1a9",
    "userId": "654bb0ef95d78da1489112cc",
    "foodId": 9,
    "grams": 200,
    "time": 1699571849553,
    "__v": 0
  },
  {
    "_id": "654d6891889d4480e1b2e1ac",
    "userId": "654bb0ef95d78da1489112cc",
    "foodId": 10,
    "grams": 150,
    "time": 1699571857088,
    "__v": 0
  },
  {
    "_id": "654d6899889d4480e1b2e1af",
    "userId": "654bb0ef95d78da1489112cc",
    "foodId": 12,
    "grams": 400,
    "time": 1699571865907,
    "__v": 0
  },
  {
    "_id": "654d68b0889d4480e1b2e1b4",
    "userId": "654bb0ef95d78da1489112cc",
    "foodId": 11,
    "grams": 400,
    "time": 1699571888010,
    "__v": 0
  },
  {
    "_id": "654d68ba889d4480e1b2e1b9",
    "userId": "654bb0ef95d78da1489112cc",
    "foodId": 10,
    "grams": 400,
    "time": 1699571898698,
    "__v": 0
  },
  {
    "_id": "654d68c5889d4480e1b2e1be",
    "userId": "654bb0ef95d78da1489112cc",
    "foodId": 9,
    "grams": 400,
    "time": 1699571909369,
    "__v": 0
  },
  {
    "_id": "654d691d889d4480e1b2e1c3",
    "userId": "654bb0ef95d78da1489112cc",
    "foodId": 2,
    "grams": 400,
    "time": 1699571997836,
    "__v": 0
  }
];

const comidas = [
  {
    "_id": "654bb3e67ac21bb2f45074a8",
    "userId": "654bb0ef95d78da1489112cc",
    "name": "pollo",
    "foodId": 1,
    "carbs": 2,
    "prots": 20,
    "fats": 2,
    "calorias": 300,
    "__v": 0
  },
  {
    "_id": "654bb5150b54c53ce2137ba7",
    "userId": "654bb0ef95d78da1489112cc",
    "name": "papa",
    "foodId": 3,
    "carbs": 20,
    "prots": 1,
    "fats": 1,
    "calorias": 300,
    "__v": 0
  },
  {
    "_id": "654bb52b0b54c53ce2137ba9",
    "userId": "654bb0ef95d78da1489112cc",
    "name": "salamin",
    "foodId": 4,
    "carbs": 3,
    "prots": 12,
    "fats": 18,
    "calorias": 500,
    "__v": 0
  },
  {
    "_id": "654bb68a7fb86dc8c1449e9d",
    "userId": "654bb0ef95d78da1489112cc",
    "name": "lechuga",
    "foodId": 5,
    "carbs": 14,
    "prots": 0,
    "fats": 0,
    "calorias": 300,
    "__v": 0
  },
  {
    "_id": "654bb80078057a167f29e998",
    "userId": "654bb0ef95d78da1489112cc",
    "name": "sandia",
    "foodId": 6,
    "carbs": 14,
    "prots": 0,
    "fats": 0,
    "calorias": 300,
    "__v": 0
  },
  {
    "_id": "654bb80778057a167f29e99b",
    "userId": "654bb0ef95d78da1489112cc",
    "name": "melon",
    "foodId": 7,
    "carbs": 14,
    "prots": 0,
    "fats": 0,
    "calorias": 300,
    "__v": 0
  },
  {
    "_id": "654d6840889d4480e1b2e19b",
    "userId": "654bb0ef95d78da1489112cc",
    "name": "Algas",
    "foodId": 8,
    "carbs": 2,
    "prots": 2,
    "fats": 0,
    "calorias": 50,
    "__v": 0
  },
  {
    "_id": "655fe50240dee0af304c5b8b",
    "userId": "654bb0ef95d78da1489112cc",
    "name": "klasdlaksd",
    "foodId": 11,
    "carbs": 3,
    "prots": 3,
    "fats": 3,
    "calorias": 51,
    "__v": 0
  }
]

const Food = ({ item }) => (
  <View key={item.time} style={styles.item}>
    <Text style={styles.options}>{item.name}</Text>
    <Text style={styles.options}>{item.time}</Text>
    <Text style={styles.options}>{item.grams} gr</Text>
    <Text style={styles.options}>{item.prots} cal</Text>
    <Text style={styles.options}>{item.carbs} cal</Text>
    <Text style={styles.options}>{item.fats} cal</Text>
    <Text style={styles.options}>{item.calorias} cals</Text>
  </View>
);

export const Dashboard = () => {
  const [foods, setFoodsArray] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {

    let totalTemp = 0;

    let tempSendArray = [];

    ingestas.forEach(
      (item) => {
        comidas.forEach(
          (userFood) => {
            if (item.foodId === userFood.foodId) {
              const index = item.grams / 100;

              const now = new Date(item.time);
              // Obtener el momento del día en HH:MM
              const horas = now.getHours();
              const minutos = now.getMinutes();
              const momentoDia = `${horas < 10 ? '0' + horas : horas}:${minutos < 10 ? '0' + minutos : minutos
                }`;

              const newItem = {
                foodId: item.foodId,
                name: userFood.name,
                grams: item.grams,
                dia: now.getDay(),
                time: momentoDia,
                prots: userFood.prots * index,
                carbs: userFood.carbs * index,
                fats: userFood.fats * index,
                calorias: userFood.calorias * index,
              };
              console.log(newItem)
              tempSendArray.push(newItem);

              totalTemp = totalTemp + newItem.calorias
            }
          }
        );
        setFoodsArray(tempSendArray);

      }
    );
    setTotal(totalTemp)

  }, [])





  const renderItem = ({ item }) => {
    return (
      <Food key={item.time}
        item={item}
      />
    );
  };

  return (<SafeAreaView style={styles.container}>
    <View style={styles.titleHeader}>
      <Text style={styles.title}>Comidas</Text>
    </View>
    <View >

      <View style={styles.content} >


        <FlatList
          rowWrapperStyle={{ justifyContent: "center" }}
          horizontal={false}
          data={foods}
          renderItem={renderItem}
          keyExtractor={item => item.time}
          ListFooterComponent={(
            <TouchableOpacity style={styles.item}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ color: 'white', fontSize: 30, fontWeight: '200' }}>Total</Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ color: "white" }}>{total} cals</Text>
              </View>
            </TouchableOpacity>
          )}></FlatList>
      </View>
    </View>
  </SafeAreaView>)
}



const styles = StyleSheet.create({
  content: {
    marginTop: 100
  },
  title: {
    fontSize: 45,
    color: "white",
    fontWeight: "600",
    marginBottom: 10,
  },
  titleHeader: {
    backgroundColor: "#009ad1",
    width: "100%",
    position: "absolute",
    top: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  flexRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  container: {
    flex: 1,
    backgroundColor: '#45ceff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    justifyContent: "space-between",
    padding: 20,
    flexDirection: "row",
    backgroundColor: "transparent",
    gap: 14
  },
  options: {
    fontSize: 12,
    color: "white",
    fontWeight: "600"
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#53d84b',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "93%"
  },
  button: {
    borderRadius: 30,
    padding: 13,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#ee8383',
  },
  buttonClose: {
    backgroundColor: '#1d1c63',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 55,
    fontWeight: "300"
  },
  textarea: {
    marginBottom: 40,
    marginTop: 20,
    padding: 18,
    borderRadius: 10,
    borderColor: "#00372d",
    borderWidth: 2,
    width: "90%"
  }
});
