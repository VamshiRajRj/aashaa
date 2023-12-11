import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import DropShadow from 'react-native-drop-shadow';

const LoginScreen = ({onChange}) => {
  const [id, setId] = useState({id: null, subject: null});
  const [show, setShow] = useState(false);

  const getData = () => {
    Promise.all([
      axios.get(`https://thara.onrender.com/getUser/${id?.id}`),
      axios.get(`https://thara.onrender.com/get-levels/${id?.subject}`),
    ])
      .then(res => {
        if (
          res[0]?.status === 200 ||
          res[0]?.status === 201 ||
          res[1]?.status === 200 ||
          res[1]?.status === 201
        ) {
          setShow(false);
          onChange({user: res[0].data, levels: res[1].data});
        } else {
          setShow(false);
          console.error(res);
        }
      })
      .catch(err => {
        setShow(false);
        console.error(JSON.stringify(err));
      });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#FF000060',
      }}>
      {show && (
        <View
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 10,
            backgroundColor: '#00000099',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={'large'} color={'rgb(137,89,242)'} />
        </View>
      )}
      {/* <Text
        style={{
          width: '40%',
          color: '#1c1c1e',
          fontSize: 16,
          fontWeight: '400',
          paddingVertical: 12,
          paddingStart: 4,
        }}>
        ENTER YOUR ID :
      </Text> */}
      <Image
        source={{
          uri: 'https://png.pngtree.com/png-vector/20220531/ourmid/pngtree-christmas-kids-united-4-white-santa-red-vector-png-image_916068.png',
        }}
        style={{
          width: '60%',
          aspectRatio: 2.35,
          marginStart: '5%',
        }}
      />

      <DropShadow
        style={{
          shadowColor: '#171717',
          shadowOffset: {width: 0, height: 10},
          shadowOpacity: 0.7,
          shadowRadius: 8,
          width: '30%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFF',
          height: '100%',
        }}>
        <Text
          style={{
            color: '#1c1c1e',
            fontSize: 18,
            fontWeight: '600',
            width: '90%',
            marginBottom: 6,
          }}>
          Welcome to Thara Foundation!
        </Text>
        <Text
          style={{
            color: '#1c1c1e60',
            fontSize: 14,
            fontWeight: '500',
            width: '90%',
            marginBottom: 22,
          }}>
          Please enter your ID and begin the adventure
        </Text>
        <TextInput
          onChangeText={v => {
            setId({...id, id: v});
          }}
          placeholder="Enter your ID"
          style={{
            borderColor: '#1c1c1e60',
            width: '90%',
            borderWidth: 1,
            fontSize: 16,
            lineHeight: 19,
            paddingStart: 8,
            color: '#1c1c1e',
            paddingVertical: 12,
          }}
        />
        <TextInput
          onChangeText={v => {
            setId({...id, subject: v});
          }}
          placeholder="Enter the subject"
          style={{
            borderColor: '#1c1c1e60',
            width: '90%',
            borderWidth: 1,
            fontSize: 16,
            lineHeight: 19,
            paddingStart: 8,
            color: '#1c1c1e',
            paddingVertical: 12,
            marginTop: 12,
          }}
        />

        <TouchableOpacity
          onPress={() => {
            setShow(true);
            getData();
          }}
          style={{
            width: '90%',
            height: 40,
            backgroundColor: 'rgb(137,89,242)',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 3,
            marginTop: 12,
          }}>
          <Text style={{color: '#FFF', fontSize: 16, fontWeight: '400'}}>
            START
          </Text>
        </TouchableOpacity>
      </DropShadow>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
