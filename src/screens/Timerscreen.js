import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Input from '../Components/Input';
import Commonbutton from '../Components/Commonbutton';

export default function Timerscreen() {
  const [timers, setTimers] = useState([]);
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [completedTimer, setCompletedTimer] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    loadTimers();
  }, []);

  const loadTimers = async () => {
    const storedTimers = await AsyncStorage.getItem('timers');
    if (storedTimers) setTimers(JSON.parse(storedTimers));
  };

  const saveTimers = async newTimers => {
    setTimers(newTimers);
    await AsyncStorage.setItem('timers', JSON.stringify(newTimers));
  };

  const addTimer = () => {
    if (!name || !duration || !category) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }
    const newTimer = {
      id: Date.now(),
      name,
      duration: parseInt(duration),
      remaining: parseInt(duration),
      category,
      status: 'Paused',
    };
    saveTimers([...timers, newTimer]);
    setName('');
    setDuration('');
    setCategory('');
  };

  const startTimer = id => {
    setTimers(prev =>
      prev.map(t =>
        t.id === id && t.status !== 'Running'
          ? {
              ...t,
              status: 'Running',
              interval: setInterval(() => updateTimer(id), 1000),
            }
          : t,
      ),
    );
  };

  const pauseTimer = id => {
    setTimers(prev =>
      prev.map(t => {
        if (t.id === id) {
          clearInterval(t.interval);
          return {...t, status: 'Paused'};
        }
        return t;
      }),
    );
  };

  const resetTimer = id => {
    setTimers(prev =>
      prev.map(t => {
        if (t.id === id) {
          clearInterval(t.interval);
          return {...t, remaining: t.duration, status: 'Reset'};
        }
        return t;
      }),
    );
  };

  const updateTimer = async id => {
    setTimers(prev =>
      prev.map(t => {
        if (t.id === id) {
          if (t.remaining > 1) {
            return {...t, remaining: t.remaining - 1};
          } else {
            clearInterval(t.interval);
            setCompletedTimer(t);
            setModalVisible(true);

            // Save completed timer to history
            saveCompletedTimer(t);

            return {...t, remaining: 0, status: 'Completed'};
          }
        }
        return t;
      }),
    );
  };

  const saveCompletedTimer = async timer => {
    try {
      const existingHistory = await AsyncStorage.getItem('history');
      const history = existingHistory ? JSON.parse(existingHistory) : [];
      const newHistory = [
        ...history,
        {...timer, completedAt: new Date().toISOString()},
      ];
      await AsyncStorage.setItem('history', JSON.stringify(newHistory));
    } catch (error) {
      console.error('Error saving completed timer:', error);
    }
  };


  const renderItem = ({item}) => {
    const getColor = status => {
      switch (status) {
        case 'Running':
          return 'green';
        case 'Paused':
          return 'red';
        case 'Reset':
          return 'black';
        default:
          return 'gray';
      }
    };
    return (
      <View
        style={{
          marginTop: 20,
          padding: 10,
          backgroundColor: '#f0f0f0',
          borderRadius: 5,
        }}>
        <Text style={commonStyles.title}>{item.name}</Text>
        <View style={commonStyles.row}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={[commonStyles.time, {fontWeight: '600'}]}>
              Time Left:
            </Text>
            <Text style={commonStyles.time}> {item.remaining}s</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={[commonStyles.status, {fontWeight: '600'}]}>
              Status:
            </Text>
            <Text
              style={[
                commonStyles.status,
                {color: getColor(item.status), fontWeight: '500'},
              ]}>
              {' '}
              {item.status}
            </Text>
          </View>
        </View>
        {/* <Text style={commonStyles.status}>Status: {item.status}</Text> */}
        <View style={commonStyles.row}>
          <Commonbutton
            width="30%"
            height={40}
            backgroundColor="green"
            text="Start"
            onPress={() => {
              startTimer(item.id);
            }}
          />
          <Commonbutton
            width="30%"
            height={40}
            backgroundColor="red"
            text="Pause"
            onPress={() => {
              pauseTimer(item.id);
            }}
          />
          <Commonbutton
            width="30%"
            height={40}
            backgroundColor="black"
            text="Reset"
            onPress={() => {
              resetTimer(item.id);
            }}
          />
        </View>
      </View>
    );
  };
  return (
    <View style={commonStyles.container}>
    
        <FlatList
          data={timers}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          ListHeaderComponent={
            <View style={commonStyles.ScreenWidth}>
              <Input
                placeholder={'Timer Name'}
                onChangeText={setName}
                value={name}
                style={{borderBottomWidth: 1}}
              />
              <View style={commonStyles.row}>
                <Input
                  placeholder="Duration (seconds)"
                  value={duration}
                  onChangeText={setDuration}
                  keyboardType="numeric"
                  screenwidth="48%"
                />
                <Input
                  placeholder="Category"
                  value={category}
                  onChangeText={setCategory}
                  screenwidth="48%"
                />
              </View>
              <Commonbutton
                text="Add Timer"
                onPress={() => {
                  addTimer();
                }}
              />
            </View>
          }
          ListFooterComponent={
            <View style={[commonStyles.ScreenWidth,{marginBottom:20}]}>
              {/* <Button
                title="View History"
                onPress={() => navigation.navigate('Historyscreen')}
              /> */}
               <Commonbutton
            width="100%"
            height={40}
            backgroundColor="blue"
            text="View History"
            onPress={() => navigation.navigate('Historyscreen')}
          />
            </View>
          }
        />

        {/* Completion Modal */}
        {modalVisible && completedTimer && (
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View
            style={commonStyles.modalcontainer}>
            <View
              style={{
                backgroundColor: '#fff',
                padding: 20,
                borderRadius: 10,
              }}>
              <Text style={[commonStyles.title,{marginBottom:10}]}>Congratulations! "{completedTimer.name}" completed!</Text>
              <Button title="Close" onPress={() => setModalVisible(false)} />
           
            </View>
          </View>
        </Modal>
      )}
  
    </View>
  );
}

export const commonStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ScreenWidth: {
    width: '95%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: Platform.OS === 'ios' ? '5%' : '5%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 18,
    marginVertical: 5,
  },
  status: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalcontainer:{
    flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
  }
});
