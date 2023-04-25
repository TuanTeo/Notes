import React, {useEffect} from 'react';
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

export default HomeScreen = observer(({navigation}) => {
  const userStore = useUserStore();
  const taskStore = useTaskStore()

  useEffect(() => {
    logUtils('user', userStore.user.user_id);
    getAllTaskByUser()
  }, []);

  const getAllTaskByUser = async () => {
    const res = await getTaskByUser(userStore.user.user_id)
    if (res.data) {
      taskStore.setTask(res.data)
    }
  }

  const noteItemOnClick = () => {
    logUtils('Pressed container1');
    navigation.navigate(NAVIGATION_COMPONENT.DETAIL_NOTE_SCREEN);
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <ListNote
          listNote={fakeListNote}
          itemOnClick={() => noteItemOnClick()}
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
    />
  );
};

const NoteItem = props => {
  return (
    <TouchableOpacity onPress={props.itemOnClick}>
      <View style={styles.container1}>
        <Text style={styles.noteTitle}>{props.item.title}</Text>
        <View>
          {props.item.description.map(item => (
            <Text>{item}</Text>
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

const fakeListNote = [
  {id: 1, title: 'Egov beta hop review', description: ['abc', 'hihi', 'kaka']},
  {id: 2, title: 'Note1', description: ['abc', 'hihi', 'kaka']},
  {id: 3, title: 'Note1', description: ['abc', 'hihi', 'kaka']},
  {id: 4, title: 'Note1', description: ['abc', 'hihi', 'kaka']},
  {id: 5, title: 'Note1', description: ['abc', 'hihi', 'kaka']},
  {id: 6, title: 'Note1', description: ['abc', 'hihi', 'kaka']},
];
