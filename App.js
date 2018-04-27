import React, { Component } from 'react';
import {
  TextInput, View, Platform, Picker,
  Image, Text, Button, DatePickerAndroid,
  StyleSheet, TouchableOpacity
} from 'react-native';
import { Section } from './src/components';
import { Icon, Form, Item, Input, Label } from 'native-base';
import { getToday, formatDate } from './src/utility/helpers';

export default class App extends Component {

  state = {
    date: getToday(),
    trip: "One way",
    adultNo: 1,
    kidsNo: 0
  };

  pickDateAndroid = async() => {
    try {
      // console.log(new Date(this.state.date));
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: new Date(this.state.date),
        mode: 'default'
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        console.log(day, month, year);
        this.setState((prevState) => {
          return {
            ...prevState,
            date: formatDate(day, month, year)
          }
        });
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  };

  pickDateIos = () => {

  };

  addAdultPassenger = () => {
    this.setState((prevState) =>{
      return {
        ...prevState,
        adultNo: prevState.adultNo + 1
      }

    });
  };

  removeAdultPassenger = () => {
    if(this.state.adultNo > 1) {
      this.setState((prevState) => {
        return {
          ...prevState,
          adultNo: prevState.adultNo - 1
        }
      });
    }
  };

  addKidPassenger = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        kidsNo: prevState.kidsNo + 1
      }

    });
  };

  removeKidPassenger = () => {
    if(this.state.kidsNo > 0) {
      this.setState((prevState) => {
        return {
          ...prevState,
          kidsNo: prevState.kidsNo - 1
        }
      });
    }
  };

  render() {
    const resizeMode = 'stretch';
    return (
      <View style={styles.container} >
        <View style={styles.imageContainer}>
          <Image style={{
              flex: 1,
              resizeMode,
            }}
            source={require('./src/assets/mountain.jpg')}
          />
        </View>
        <View style={styles.textContainer}>
          <Icon name="bus" type="Ionicons" android="md-bus" ios="ios-bus" 
            style={styles.iconStyle} />
          <Text style={styles.textStyle} >
            Where would you like to go?
          </Text>
        </View>
        <View style={styles.formContainer} >
          <View style={styles.inputContainer} >
            <Form>
               <Item floatingLabel>
                 <Label>From</Label>
                 <Input />
               </Item>
               <Item floatingLabel>
                 <Label>To</Label>
                 <Input />
               </Item>
            </Form>
          </View>
          <View style={styles.trip} >
            <TouchableOpacity onPress={Platform.select({
              ios: this.pickDateIos,
              android: this.pickDateAndroid
            })}
              style={{
                borderWidth:1, 
                borderColor: "#aaa", 
                borderRadius: 5,

                marginLeft: 15
              }} >
              <Text>
                {this.state.date}
                <Icon name="arrow-dropdown" type="Ionicons" 
                  android="md-arrow-dropdown" ios="md-arrow-dropdown" />
              </Text>
            </TouchableOpacity>
            <Picker
              selectedValue={this.state.trip}
              onValueChange={(itemValue, itemIndex) => this.setState((prevState) => {
                return {
                  ...prevState,
                  trip: itemValue
                }
              })} 
              style={{
                borderWidth:1, 
                borderColor: "#aaa", 
                borderRadius: 5,
                marginRight: 25
              }}>
              <Picker.Item label="One way" value="One way" />
              <Picker.Item label="Two way" value="Two way" />
              <Icon name="arrow-dropdown" type="Ionicons" 
                android="md-arrow-dropdown" ios="md-arrow-dropdown" />
            </Picker>
          </View>
          <View style={styles.people} >
            <View style={styles.person} >
                <View style={{flexDirection: "row"}} >
                  <Text style={{fontSize: 15, color: "#8cdd15"}} >{this.state.adultNo}</Text>
                  <Text> Adult</Text>
                </View>
                <View style={{flexDirection: "row"}}>
                  <TouchableOpacity onPress={this.addAdultPassenger} >
                    <Icon name="add" type="Ionicons" 
                      android="md-add" ios="md-add" />
                  </TouchableOpacity>
                  <Text>   </Text>
                  <TouchableOpacity onPress={this.removeAdultPassenger}>
                    <Icon name="remove" type="Ionicons" 
                      android="md-remove" ios="md-remove" />
                  </TouchableOpacity>
                </View>
            </View>

            <View style={styles.person} >
              <View style={{flexDirection: "row"}} >
                <Text style={{fontSize: 15, color: "#8cdd15"}} >{this.state.kidsNo}</Text>
                <Text> Kids</Text>
              </View>

              <View style={{flexDirection: "row"}}>
                <TouchableOpacity onPress={this.addKidPassenger}>
                  <Icon name="add" type="Ionicons" 
                    android="md-add" ios="md-add" />
                </TouchableOpacity>
                <Text>   </Text>
                <TouchableOpacity onPress={this.removeKidPassenger}>
                  <Icon name="remove" type="Ionicons" 
                    android="md-remove" ios="md-remove" />
                </TouchableOpacity>
              </View>

            </View>

          </View>
          <View style={styles.buttonContainer} >
            <Button title="Search" color="#44a4f6" onPress={()=> console.log("hello")}/>
          </View>
        </View>
      </View>
    );
  }
}

const resizeMode = 'center';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    borderWidth: 2
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '25%',
  },
  textContainer: {
    backgroundColor: 'transparent',
    justifyContent: 'space-evenly',
    alignItems: "center",
    height: "25%",
  },
  textStyle: {
    fontSize: 20,
    color: "#e7e3c7"
  },
  iconStyle: {
    fontSize: 24,
    width: 40,
    color:"#44a4f6", 
    backgroundColor: "white", 
    height: 40,
    padding: 9,
    borderRadius: 30,
  },
  formContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    margin: "5%"
  },
  inputContainer: {
    // flex: 1,
    width: "100%",
    // borderWidth: 1
  },
  buttonContainer: {
    // flex: 1,
    // justifyContent: "flex-end",
    width: "100%",
    // borderWidth: 1
  },
  trip: {
    // flex: 1,
    flexDirection: "row",
    width: "100%",
    height: "10%",
    // marginRight: 20,
    justifyContent: "space-between",
    // borderWidth: 1
  },
  person: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  }
  
});
