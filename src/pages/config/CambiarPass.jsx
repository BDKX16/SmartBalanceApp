import React, { useState } from 'react'
import { Text, View, StyleSheet, Modal, Pressable, TextInput } from 'react-native'

import useAuth from "../../hooks/useAuth";
import { Formik } from 'formik';
import { cambiarPassSchema } from '../../validations/authSchema';
import axios from 'axios';
const CambiarPass = ({ navigation }) => {
  const [errorPass, setErrorPass] = useState("")
  const { logout, auth } = useAuth();


  const cambiarContraseña = () => {

    if (confirmarPass == "" || password == "" || oldPassword == "") {
      setErrorPass("LLenar todos los cambios")
      return;
    }

    var newDevice = {
      newDevice: {
        oldPassword: oldPassword,
        password: password,
        confirmPassword: confirmarPass,
      }
    };

    const axiosHeaders = {
      headers: {
        token: auth.token,
        "Content-Type": "application/json"
      }
    };

    axios.post("https://confiplant.cloud:3001/api/cambiarpassword", newDevice, axiosHeaders)
      .then((response) => {
        console.log("ok")
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.error === "unexistent" || error.response.data.error === "El serial ingresado no es correcto") {
          setErrorPass("El serial ingresado no es correcto");
          console.log("Serial incorrecto")
        } else {
          if (error.response.data.status === "error" && error.response.data.error.errors.dId.kind === "unique") {
            setErrorPass("El serial ya se encuentra registrado en el sistema en otra cuenta. Intenta con otro dispositivo");
            console.log("Serial ya registrado en otra cuenta")
          } else {
            setErrorPass("Error, contacte a un administrador");
            console.log("Fatal error, code: E-9182, contacte a un administrador via app web de confi");
          }
        }
      });
  }


  const handleErroresContraseña = (errors) => {
    if (errors === "Requerido") {
      return <Text style={{ color: "red"}}>Requerido</Text>
    }



    if (errors) {
      try {
        const errores = JSON.parse(errors);

        let posiblesErrores = ["al menos debe tener un número", "al menos debe tener una mayúscula"]



        return (
          <>
            <Text style={{ color: "#444444", fontWeight: 500, fontSize: 13 }}>La contraseña es muy debil, la contraseña debe tener:</Text>
            {posiblesErrores.map((item, index) => (
              errores.includes(item) ?
                <Text style={{ marginLeft: 10, color: "#f73232" }} key={index}>{item}</Text>
                :
                <Text className="mb-0" style={{ marginLeft: 10, color: "#009b43" }} key={index}>{item}</Text>

            ))}
          </>
        );
      } catch (e) {
        console.log("ERROR:" + e)
      }
    }

    return null;
  }


  return (
    <View style={styles.container}>

      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={{ ...styles.modalText, fontSize: 30 }}>Cambia tu contraseña</Text>
          <Text style={{ ...styles.modalText, fontSize: 15 }}>Esto cambiara tu contraseña en la web tambien</Text>

          <Formik
            initialValues={{
              oldPassword: "",
              password: "",
              confirmPassword: ""
            }}
            validationSchema={cambiarPassSchema}
            onSubmit={async (values) => {
              console.log("apgo")
              
              let toSend = {
                oldPassword: values.oldPassword,
                password: values.password,
                confirmPassword: values.confirmPassword
              }
              if(values.password !== values.confirmPassword){
                setErrorPass("Las contraseñas no coinciden")
                return;
              }

              console.log("sending")
              console.log(toSend)

             
          
              const axiosHeaders = {
                headers: {
                  token: auth.token,
                  "Content-Type": "application/json"
                }
              };
          
              axios.put("https://confiplant.cloud:3001/api/cambiopasswordautorizado", toSend, axiosHeaders)
                .then((response) => {
                  console.log("ok")
                  navigation.navigate("ConfigHome")
                })
              .catch(function (error) {
                  console.log(error.response.data);
                  if (error.response.data.code === 1) {
                    setErrorPass("Tu cuenta esta pendiente de confirmacion, se ha enviado un email con los pasos a seguir en tu correo.")

                    //error falta confirmacion
                  } else if (error.response.data.code === 2) {
                    setErrorPass("Las contraseñas no coinciden")

                    //error email existente
                  } else if (error.response.data.code === 3) {
                    setErrorPass("La contraseña actual no es correcta, si olvidaste tu contraseña puedes recuperarla desde el menu login");

                  } else {
                    setErrorPass("Algo salio mal, pero no es culpa tuya.");
                  }
                  
                });
                


            }}
          >
            {(props) => (
              <>
                <View style={styles.inputContainer}>
                  <TextInput style={styles.textarea}
                    placeholder="Contraseña actual"
                    onChangeText={props.handleChange("oldPassword")}
                    onBlur={props.handleBlur("oldPassword")}
                    value={props.values.oldPassword}


                  ></TextInput>
                  {props.errors.oldPassword && props.touched.oldPassword && <Text style={{ position: "absolute", bottom: -1,color: "red", marginLeft: 20 }}>{props.errors.oldPassword}</Text>}

                </View>
                <View style={styles.inputContainer} >
                  <TextInput style={styles.textarea}
                    placeholder="Contraseña nueva"
                    onChangeText={props.handleChange("password")}
                    onBlur={props.handleBlur("password")}
                    value={props.values.password}

                  ></TextInput>

                 
                  {props.errors.password === "Requerido" && <Text style={{ position: "absolute", bottom: -1,color: "red", marginLeft: 20 }}>Requerido</Text>}
                 
                </View>
                <View style={{...styles.inputContainer, marginBottom: 60}}>
                  <TextInput style={styles.textarea}
                    placeholder="Repetir contraseña nueva"
                    onChangeText={props.handleChange("confirmPassword")}
                    onBlur={props.handleBlur("confirmPassword")}
                    value={props.values.confirmPassword}


                  ></TextInput>

                  {props.errors.confirmPassword && props.touched.confirmPassword && <Text style={{ position: "absolute", bottom: -1,color: "red", marginLeft: 20 }}>{props.errors.confirmPassword}</Text>}
                  <View style={{ padding: 10, position: "absolute", bottom: -60 }}>
                    {props.errors.password && props.touched.password ? handleErroresContraseña(props.errors.password) : ""}
                  </View>
                </View>
                <Text style={{color: "red", marginBottom: 5}}>{errorPass}</Text>
                <View style={{ flexDirection: "row" }}>

                  <Pressable
                    style={[styles.button, styles.buttonClose, { backgroundColor: "#fa5c5d", marginRight: 50 }]}
                    onPress={() => navigation.navigate("ConfigHome")}>
                    <Text style={styles.textStyle}>Cancelar</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={props.handleSubmit}>
                    <Text style={styles.textStyle}>Enviar</Text>
                  </Pressable>
                </View></>

            )
            }
          </Formik>

        </View>
      </View>
    </View>
  )
}

export default CambiarPass



const styles = StyleSheet.create({
  inputContainer: {
width: "90%",
alignItems: "center",
  },

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
    borderRadius: 10,
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
    width: "98%"
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
    marginBottom: 22,
    marginTop: 4,
    padding: 15,
    borderRadius: 10,
    borderColor: "#00372d",
    borderWidth: 2,
    width: "90%",
  }
});
