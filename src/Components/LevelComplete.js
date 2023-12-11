import {Text, View, StyleSheet, FlatList} from 'react-native';

import React from 'react';
import DropShadow from 'react-native-drop-shadow';

const LevelComplete = ({values}) => {
  const renderItem = ({item, index}) => {
    return (
      <DropShadow
        style={{
          shadowColor: '#171717',
          shadowOffset: {width: 0, height: 3},
          shadowOpacity: 0.4,
          shadowRadius: 2,
        }}>
        <View
          style={styles.item}
          colors={['#00FFFF', '#00FFFF50', '#00FFFF00']}>
          <Text style={styles.itemText}>{index + 1}</Text>
          <Text style={styles.itemText}>{item.userId}</Text>
          <Text style={styles.itemText}>{item.score}</Text>
        </View>
      </DropShadow>
    );
  };
  return (
    <View
      style={{
        zIndex: 1,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
      }}>
      <Text style={{color: '#FFF', fontSize: 32, fontWeight: '600'}}>
        LEADER BOARD
      </Text>
      <FlatList
        data={values.data}
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        ListHeaderComponent={() => (
          <DropShadow
            style={{
              shadowColor: '#171717',
              shadowOffset: {width: 0, height: 3},
              shadowOpacity: 0.4,
              shadowRadius: 2,
            }}>
            <View
              style={[
                styles.item,
                {backgroundColor: '#FF9500', marginTop: 22, height: 40},
              ]}>
              <Text
                style={[
                  styles.itemText,
                  {fontWeight: '500', fontSize: 20, color: '#FFF'},
                ]}>
                Rank
              </Text>
              <Text
                style={[
                  styles.itemText,
                  {fontWeight: '500', fontSize: 20, color: '#FFF'},
                ]}>
                Username
              </Text>
              <Text
                style={[
                  styles.itemText,
                  {fontWeight: '500', fontSize: 20, color: '#FFF'},
                ]}>
                Score
              </Text>
            </View>
          </DropShadow>
        )}
        renderItem={renderItem}
        keyExtractor={item => item.userId}
      />
    </View>
  );
};

export default LevelComplete;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    paddingTop: 22,
    padding: 12,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 30,
    backgroundColor: '#FFF',
    marginVertical: 4,
    borderRadius: 3,
    alignItems: 'center',
  },
  itemText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    width: '30%',
  },
});
