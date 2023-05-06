import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {FAB, Text} from 'react-native-paper';
import {colors} from '../../drawers/constant';
import {dimens} from '../../resources/dimens';
import {logUtils} from '../../utils/logUtils';
import NAVIGATION_COMPONENT from '../../utils/navConstants';
import {observer} from 'mobx-react-lite';
import {useUserStore} from '../../stores/userStore';
import {getTaskByUser} from "../../services";
import {useTaskStore} from "../../stores/taskStore";
import {useDetailStore} from "../../stores/detailStore";
import EnableBiometricDialog from "../../components/EnableBiometricDialog/EnableBiometricDialog";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ASYNC_STORE_KEY} from "../../constants/asyncStoreKey";

export default HomeScreen = observer(({navigation}) => {
  const userStore = useUserStore();
  const taskStore = useTaskStore()
  const detailStore = useDetailStore()

  const [task, setTask] = useState()
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    logUtils('user', userStore.user.user_id);
    getAllTaskByUser()
    setModalVisible(true)
  }, []);

  useEffect(() => {
    requestBiometricIfNeed();
  }, []);

  const requestBiometricIfNeed = async () => {
    try {
      const value = await AsyncStorage.getItem(ASYNC_STORE_KEY.PUBLIC_KEY);
      const currentUser = await AsyncStorage.getItem(ASYNC_STORE_KEY.USER_NAME);
      const bioUser = await AsyncStorage.getItem(ASYNC_STORE_KEY.BIO_USER_NAME);
      if (value && currentUser === bioUser) {
        setModalVisible(false);
      } else {
        setModalVisible(true);
      }
    } catch (error) {
      setModalVisible(true);
    }
  };

  const getAllTaskByUser = async () => {
    const res = await getTaskByUser(userStore.user.user_id)
    if (res.data) {
      setTask(taskStore)
      taskStore.setTask(res.data)
    }
  }

  const noteItemOnClick = (taskId) => {
    detailStore.setTaskId(taskId)
    navigation.navigate(NAVIGATION_COMPONENT.DETAIL_NOTE_SCREEN);
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <ListNote
          listNote={task?.task.data}
          itemOnClick={noteItemOnClick}
        />
      </View>
      <FAB
        style={styles.fab}
        small
        icon="plus"
        color="white"
        onPress={() => {
          logUtils('Pressed FAB');
          navigation.navigate(NAVIGATION_COMPONENT.CREATE_NOTE_SCREEN);
        }}
      />
      {modalVisible ? <EnableBiometricDialog modalVisible={modalVisible} setModalVisible={setModalVisible}/> : null}
    </View>
  );
});

const ListNote = props => {
  return (
    <FlatList
      data={props.listNote}
      renderItem={({item}) => (
        <NoteItem item={item} itemOnClick={props.itemOnClick} />
      )}
      contentContainerStyle={{paddingBottom: 8}}
      showsVerticalScrollIndicator={false}
    />
  );
};

const NoteItem = props => {
  return (
    <TouchableOpacity onPress={() => {
      props.itemOnClick(props.item.task_id)
    }}>
      <View style={styles.container1}>
        <Text style={styles.noteTitle}>{props.item.title}</Text>
        <View>
          {props.item.detail.length !== 0 && props.item.detail.map((item, index) => (
            (index <= 2) ?
            <Text>{item.content}</Text> : null
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    rowGap: 8,
  },
  container1: {
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingStart: 8,
    paddingEnd: 8,
    marginBottom: 8,
    paddingBottom: 8,
    paddingTop: 8,
  },
  noteTitle: {
    fontWeight: 'bold',
    fontSize: dimens.fontLarge,
  },
  noteDescription: {
    fontSize: dimens.fontSmall,
    lineHeight: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    marginBottom: 32,
    backgroundColor: colors.fab,
  },
});
