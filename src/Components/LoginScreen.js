import {
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
  const [id, setId] = useState(null);

  const getData = () => {
    axios
      .get(`http://aashaa.ap-1.evennode.com/getUser/${id}`)
      .then(res => {
        if (res?.status === 200 || res?.status === 201) {
          onChange(res?.data);
        } else {
          console.error(res);
        }
      })
      .catch(console.error);
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
          Welcome to Aasha Foundation!
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
            setId(v);
          }}
          placeholder="Enter your ID"
          style={{
            height: 45,
            borderColor: '#1c1c1e60',
            width: '90%',
            borderWidth: 1,
            fontSize: 16,
            lineHeight: 19,
            paddingVertical: 13,
            paddingStart: 8,
            color: '#1c1c1e',
          }}
        />

        <TouchableOpacity
          onPress={() => {
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
