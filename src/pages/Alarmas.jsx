import React, { useState, useEffect, useContext } from 'react'
import { Text, View, StyleSheet, Modal, Pressable, FlatList, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import Scan from '../components/Scan';


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
    <Text style={styles.options}>{item.foodId}</Text>
    <Text style={styles.options}>{item.name}</Text>
    <Text style={styles.options}>{item.prots} cal</Text>
    <Text style={styles.options}>{item.carbs} cal</Text>
    <Text style={styles.options}>{item.fats} cal</Text>
    <Text style={styles.options}>{item.calorias} cals</Text>
  </View>
);


export const Alarmas = () => {
  const [foods, setFoodsArray] = useState(comidas);

  const [modal, setModal] = useState(false)
  const [modalLector, setModalLector] = useState(false)

  const renderItem = ({ item }) => {
    return (
      <Food key={item.time}
        item={item}
      />
    );
  };

  return (
    <View style={styles.container}>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => setModal(!modal)}>

        <View style={styles.centeredView}>
          
          <View style={styles.modalView}>
          <Text style={{marginBottom: 20, fontSize:19}}>Ingresa tu comida:</Text>
            <TextInput
            style={styles.textinput}
            placeholder="Nombre comida"
            ></TextInput>
            <TextInput style={styles.textinput}
            placeholder="Calorias"
            ></TextInput>
            <TextInput style={styles.textinput}
            placeholder="Carbohidratos"
            ></TextInput>
            <TextInput style={styles.textinput}
            placeholder="Proteinas"
            ></TextInput>
            <TextInput style={styles.textinput}
            placeholder="Grasas"
            ></TextInput>

            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <Pressable
                style={[styles.button, styles.buttonClose, { backgroundColor: "#fa5c5d", }]}
                onPress={() => setModal(!modal)}>
                <Text style={styles.textStyle}>Cerrar</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose, { backgroundColor: "#2cb506", marginLeft: 40 }]}
                onPress={() => {setModal(!modal);
                  setFoodsArray([...foods, {foodId:12,name:"example", carbs: 10, prots: 1, fats: 2, calorias: 300}])
                }}>
                <Text style={styles.textStyle}>Enviar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalLector}
        onRequestClose={() => setModalLector(!modalLector)}>

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Text style={{marginBottom: 30, fontSize: 18, color: "black"}}>Coloca el codigo de barra dentro del cuadrado:</Text>

            <View style={styles.scanner}></View>
            <Scan></Scan>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <Pressable
                style={[styles.button, styles.buttonClose, { backgroundColor: "#fa5c5d", }]}
                onPress={() => setModalLector(!modalLector)}>
                <Text style={styles.textStyle}>Cerrar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
        
      <View style={styles.header}>
        <Text style={styles.title}>Menu de comidas</Text>
        <Text style={styles.text}>Agregá tus comidas con un abrir y cerrar de ojos</Text>
      </View>

      <View style={styles.buttonsContainer}>
      <Pressable
        style={[styles.button, styles.buttonClose, { backgroundColor: "#2cb506", }]} onPress={() => setModalLector(!modalLector)}>
        <Text style={styles.textStyle}>Scanner de barras</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.buttonClose, { backgroundColor: "#fa5c5d", }]}
        onPress={() => setModal(!modal)}>
        <Text style={styles.textStyle}>Agregar manualmente</Text>
      </Pressable>
      </View>
      <Text style={[styles.title,{color: "white", marginTop: 30}]}>Comidas cargadas</Text>
      <View style={styles.flatlist}>
      <FlatList
        rowWrapperStyle={{ justifyContent: "center" }}
        horizontal={false}
        data={foods}
        renderItem={renderItem}
        keyExtractor={item => item.time}
      ></FlatList>
      </View>
    </View>
    
  )

}


const styles = StyleSheet.create({
  buttonsContainer: {
  gap: 10
  },
  flatlist: {
    borderColor: "white",
    borderWidth: 3,
    borderRadius: 6,
    height: 400
  },
  flexRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
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
  title: {
    fontSize: 28,
    color: "white"
  },
  header: {
    backgroundColor: "#009ad1",
    alignItems: "center",
    width: "100%",
    position: "absolute",
    top: 0,
    paddingTop: 20,
    paddingBottom:6
  },
  text: {
    fontSize: 14,
    color: "white"
  },
  flexRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  scanner: {
    width: 300,
    height: 300,
    backgroundColor: "black",
    borderRadius: 3
  },
  container: {
    flex: 1,
    backgroundColor: '#45ceff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingTop: 100
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
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
    padding: 15,
    borderRadius: 10,
    borderColor: "#00372d",
    borderWidth: 2,
    width: "90%"
  },
  textinput:{
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal:15,
    borderWidth: 2,
    borderColor: "grey",
    borderRadius: 6,
    width: "90%"
  }
});
