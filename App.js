import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import LIST from './src/Constants/Words';
import LevelComplete from './src/Components/LevelComplete';
import LoginScreen from './src/Components/LoginScreen';
import axios from 'axios';
import DropShadow from 'react-native-drop-shadow';

const data = [
  {id: 1, title: 'Level 1'},
  {id: 2, title: 'Level 2'},
  {id: 3, title: 'Level 3'},
  {id: 4, title: 'Level 4'},
  {id: 5, title: 'Level 5'},
  {id: 6, title: 'Level 6'},
  {id: 7, title: 'Level 7'},
  {id: 8, title: 'Level 8'},
  {id: 9, title: 'Level 9'},
  // Add more data as needed
];

const App = () => {
  const [word, setWord] = useState('START');
  const [user, setUser] = useState(null);
  const [hurray, setHurray] = useState({visible: false, data: []});
  const [score, setScore] = useState(0);
  const [inpValue, setInpValue] = useState({current: 0, value: ''});
  const [level, setLevel] = useState(null);

  const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(-1);
  let resendOtpTimerInterval = null;

  const start = () => {
    setResendButtonDisabledTime(10);
    setWord(LIST[level][0]);
  };

  const Card = ({item}) => {
    return (
      <DropShadow
        style={{
          ...styles.card,
          shadowColor: '#171717',
          shadowOffset: {width: 0, height: 3},
          shadowOpacity: 0.4,
          shadowRadius: 2,
          borderBottomColor: user.currentLevel >= item?.id ? 'green' : 'red',
          borderBottomWidth: 5,
        }}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            flex: 1,
          }}
          activeOpacity={user.currentLevel >= item?.id ? 0.5 : 1}
          onPress={() => {
            user.currentLevel >= item?.id ? setLevel(item?.id) : null;
          }}>
          <Text
            style={{
              color: '#1c1c1e',
              fontSize: 18,
              fontWeight: '600',
              width: '100%',
            }}>
            {item?.title}
          </Text>
          {user.currentLevel < item?.id && (
            <Image
              style={{width: 24, height: 24, position: 'absolute', right: 12}}
              source={{
                uri: 'https://e7.pngegg.com/pngimages/1024/909/png-clipart-computer-icons-lock-padlock-technic-computer-icons.png',
              }}
            />
          )}
          {/* Add other card contents here */}
          {user.currentLevel > item?.id ? (
            <Text
              style={{
                color: '#1C1C1E99',
                fontSize: 14,
                fontWeight: '400',
                marginTop: 4,
                width: '100%',
              }}>
              Your Score : {user.scores[item.id + '']}
            </Text>
          ) : user.currentLevel == item?.id ? (
            <Text
              style={{
                color: '#1C1C1E99',
                fontSize: 14,
                fontWeight: '400',
                marginTop: 4,
                width: '100%',
              }}>
              Start Playing
            </Text>
          ) : (
            <Text
              style={{
                color: '#1C1C1E99',
                fontSize: 14,
                fontWeight: '400',
                marginTop: 4,
                width: '100%',
              }}>
              Locked
            </Text>
          )}
        </TouchableOpacity>
      </DropShadow>
    );
  };

  const startResendOtpTimer = () => {
    if (resendOtpTimerInterval) {
      clearInterval(resendOtpTimerInterval);
    }
    resendOtpTimerInterval = setInterval(() => {
      if (resendButtonDisabledTime == 0) {
        clearInterval(resendOtpTimerInterval);
        stop();
      } else if (resendButtonDisabledTime == -1) {
        clearInterval(resendOtpTimerInterval);
      } else {
        setResendButtonDisabledTime(resendButtonDisabledTime - 1);
      }
    }, 1000);
  };

  useEffect(() => {
    startResendOtpTimer();

    return () => {
      if (resendOtpTimerInterval) {
        clearInterval(resendOtpTimerInterval);
      }
    };
  }, [resendButtonDisabledTime]);

  const handleText = t => {
    if (word !== null && word !== undefined) {
      if (
        t.charAt(t?.length - 1)?.toLowerCase() ===
        word?.charAt(inpValue.current)?.toLowerCase()
      ) {
        if (word?.length - 1 === inpValue.current) {
          setInpValue({current: 0, value: ''});
          setScore(score + 1);
          setWord(LIST[level][score + 1]);
        } else {
          setInpValue({current: inpValue.current + 1, value: t});
        }
      }
    }
  };
  const stop = () => {
    let sco = user?.scores;
    if (sco === undefined) {
      sco = {1: score};
    } else {
      if (sco[level] < score) {
        sco[level] = score;
      }
    }

    axios
      .post('http://aashaa.ap-1.evennode.com/store-score', {
        userId: user.userId,
        levelId: level,
        score: score,
        scores: sco,
      })
      .then(res => {
        setUser({...user, scores: sco, currentLevel: level + 1});
        setHurray({visible: true, data: res?.data});
      })
      .catch(e => console.error(JSON.stringify(e)));
    setResendButtonDisabledTime(-1);

    setWord('END');
  };

  if (user) {
    if (hurray.visible) {
      return (
        <ImageBackground
          style={{alignItems: 'center', flex: 1}}
          source={require('./src/assets/bg2.jpg')}>
          <DropShadow
            style={{
              shadowColor: '#171717',
              shadowOffset: {width: 0, height: 3},
              shadowOpacity: 0.4,
              shadowRadius: 2,
              width: '100%',
            }}>
            <View
              style={{
                height: 60,
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                marginBottom: 12,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setLevel(null);
                  setWord('START');
                  setScore(0);
                  setHurray({visible: false, data: []});
                  setInpValue({current: 0, value: ''});
                  setResendButtonDisabledTime(-1);
                }}
                style={{
                  marginHorizontal: 12,
                  padding: 4,
                  borderRadius: 4,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('./src/assets/close.png')}
                  style={{width: 45, height: 45, tintColor: '#FFF'}}
                />
              </TouchableOpacity>
            </View>
          </DropShadow>
          <LevelComplete values={hurray} />
        </ImageBackground>
      );
    } else {
      if (!level) {
        return (
          <FlatList
            data={data}
            ListHeaderComponent={() => (
              <DropShadow
                style={{
                  shadowColor: '#171717',
                  shadowOffset: {width: 0, height: 3},
                  shadowOpacity: 0.4,
                  shadowRadius: 2,
                }}>
                <View
                  style={{
                    width: '100%',
                    height: 60,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    backgroundColor: '#FFF',
                    borderBottomColor: '#DFDFDF',
                    borderBottomWidth: 1,
                    marginBottom: 12,
                  }}>
                  <View />
                  <TouchableOpacity
                    onPress={() => {
                      setUser(null);
                      setWord('START');
                      setScore(0);
                      setHurray({visible: false, data: []});
                      setInpValue({current: 0, value: ''});
                      setResendButtonDisabledTime(-1);
                    }}
                    style={{
                      marginHorizontal: 12,
                      backgroundColor: 'rgb(204,86,102)',
                      padding: 8,
                      borderRadius: 4,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#FFF',
                        fontSize: 14,
                        fontWeight: '500',
                        letterSpacing: 0.8,
                      }}>
                      LOGOUT
                    </Text>
                  </TouchableOpacity>
                </View>
              </DropShadow>
            )}
            renderItem={Card}
            keyExtractor={item => item.id}
            numColumns={4} // Set the number of columns
            contentContainerStyle={styles.container}
          />
        );
      } else {
        return (
          <ImageBackground
            style={{alignItems: 'center', flex: 1}}
            source={require('./src/assets/bg1.jpg')}>
            <DropShadow
              style={{
                shadowColor: '#171717',
                shadowOffset: {width: 0, height: 3},
                shadowOpacity: 0.4,
                shadowRadius: 2,
                width: '100%',
              }}>
              <View
                style={{
                  height: 60,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  backgroundColor: '#FFF',
                  borderBottomColor: '#DFDFDF',
                  borderBottomWidth: 1,
                  marginBottom: 12,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setLevel(null);
                    setWord('START');
                    setScore(0);
                    setHurray({visible: false, data: []});
                    setInpValue({current: 0, value: ''});
                    setResendButtonDisabledTime(-1);
                  }}
                  style={{
                    marginHorizontal: 12,
                    backgroundColor: 'white',
                    padding: 8,
                    borderRadius: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('./src/assets/close.png')}
                    style={{width: 45, height: 45, tintColor: '#1c1c1e'}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setUser(null);
                    setLevel(null);
                    setWord('START');
                    setScore(0);
                    setHurray({visible: false, data: []});
                    setInpValue({current: 0, value: ''});
                    setResendButtonDisabledTime(-1);
                  }}
                  style={{
                    marginHorizontal: 12,
                    backgroundColor: 'rgb(204,86,102)',
                    padding: 8,
                    borderRadius: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: 14,
                      fontWeight: '500',
                      letterSpacing: 0.8,
                    }}>
                    LOGOUT
                  </Text>
                </TouchableOpacity>
              </View>
            </DropShadow>
            <View
              style={{
                width: '100%',
                height: 90,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: '#FFF', fontSize: 22, fontWeight: '600'}}>
                Type as many words as you can until time runs out!
              </Text>
            </View>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              {resendButtonDisabledTime >= 0 && (
                <Text style={{fontSize: 45, color: '#FFF', marginBottom: 12}}>
                  {resendButtonDisabledTime}
                </Text>
              )}
              <TextInput
                onChangeText={handleText}
                autoFocus
                focusable={true}
                value={inpValue.value}
                style={{height: 0, width: 0, fontSize: 0, opacity: 0}}
              />
              {word === 'START' ? (
                <DropShadow
                  style={{
                    shadowColor: '#171717',
                    shadowOffset: {width: 0, height: 3},
                    shadowOpacity: 0.4,
                    shadowRadius: 2,
                    width: 180,
                    height: 45,
                  }}>
                  <TouchableOpacity
                    style={{
                      width: 180,
                      height: 45,
                      backgroundColor: 'rgb(90,164,248)',
                      borderRadius: 12,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={start}>
                    <Text
                      style={{
                        color: '#FFF',
                        fontSize: 16,
                        fontWeight: '900',
                        letterSpacing: 10,
                      }}>
                      START
                    </Text>
                  </TouchableOpacity>
                </DropShadow>
              ) : (
                <Text
                  style={{
                    fontSize: 45,
                    fontWeight: 'bold',
                    color: '#FFF',
                    letterSpacing: 10,
                  }}>
                  <Text style={{color: 'blue'}}>
                    {word?.substring(0, inpValue?.current)}
                  </Text>
                  {word?.substring(inpValue?.current, word?.length)}
                </Text>
              )}
            </View>
          </ImageBackground>
        );
      }
    }
  } else {
    return (
      <LoginScreen
        onChange={result => {
          setUser(result);
        }}
      />
    );
  }
};

export default App;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 8,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});
