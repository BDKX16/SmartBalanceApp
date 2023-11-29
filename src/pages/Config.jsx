import React, { useState } from 'react'
import { Text, View, StyleSheet, Modal, Pressable, TextInput } from 'react-native'


const rippleEffect = {
  color: "lightgrey"
}


export const Config = ({navigation}) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [serial, setSerial] = useState("")
  const [name, setName] = useState("")



  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Agrega tu AutoKit</Text>
            <TextInput style={styles.textarea}
              placeholder="Serial..."
              onChangeText={setSerial}
              value={serial}
            ></TextInput>
            <TextInput style={styles.textarea}
              placeholder="Nombre..."
              onChangeText={setName}
              value={name}
            ></TextInput>
            <View style={{ flexDirection: "row" }}>
              <Pressable
                style={[styles.button, styles.buttonClose, { backgroundColor: "#fa5c5d", marginRight: 50 }]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textStyle}>Conectar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={errorVisible}
        onRequestClose={() => setErrorVisible(!errorVisible)}>

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>Funcionalidad no disponible todavia</Text>
            <Text style={styles.p}>Intentar desde la web: www.confiplant.cloud</Text>

            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <Pressable
                style={[styles.button, styles.buttonClose, { backgroundColor: "#fa5c5d", }]}
                onPress={() => setErrorVisible(!errorVisible)}>
                <Text style={styles.textStyle}>Cerrar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable android_ripple={rippleEffect} onPress={() => setModalVisible(true)}><Text style={styles.option}> Ingresar dispositivo</Text></Pressable>
      <Pressable android_ripple={rippleEffect} onPress={() => navigation.navigate("CambiarPass")}><Text style={styles.option}> Cambiar Password</Text></Pressable>
      <Pressable android_ripple={rippleEffect} onPress={() => { logout() }}><Text style={styles.option}> Logout </Text></Pressable>

    </View>
  )
}


const styles = StyleSheet.create({
  option: {
    padding: 20,
    fontSize: 20,
  },
  title: {
    fontSize: 18,
    padding: 5
  }, p: {
    fontSize: 14,
    padding: 5
  },
  flexRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'left',
    justifyContent: "start",
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
    padding: 15,
    borderRadius: 10,
    borderColor: "#00372d",
    borderWidth: 2,
    width: "90%"
  }
});
