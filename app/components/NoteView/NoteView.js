import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity, FlatList,
} from 'react-native';
import {Text} from 'react-native-paper';
import {colors} from '../../drawers/constant';
import TaskItem from '../../components/task/TaskItem';
import {observer} from "mobx-react-lite";
import {useDetailStore} from "../../stores/detailStore";
import {getDetailByTaskId} from "../../services";

const NoteView = observer((props) => {
  const detailStore = useDetailStore()

  const [detail, setDetail] = useState({})

  useEffect(() => {
    getDetailTask()
  }, [])

  const getDetailTask = async () => {
    const res = await getDetailByTaskId(detailStore.task.task_id)
    if (res.data) {
      setDetail(detailStore)
      detailStore.setDetails(res.data)
    }
  }

  return (
    <View style={styles.container}>
      {detail?.details?.data.length > 0 ?
        <FlatList
          data={detail?.details?.data}
          renderItem={({item}) => (
            <TaskItem text={item.content} />
          )}
        /> :
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Trống</Text>
        </View>
      }

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}>
        <TextInput
          style={styles.input}
          placeholder={'Write a task'}
          multiline={true}
        />
        <TouchableOpacity>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
});

const styles = StyleSheet.create({
  title_input: {
    backgroundColor: 'white',
    marginBottom: 12,
  },
  content_input: {
    height: 500,
    backgroundColor: 'white',
  },
  container: {
    padding: 12,
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    marginBottom: 32,
    backgroundColor: colors.fab,
  },
  writeTaskWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    width: '80%',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addWrapper: {
    width: 50,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {
    fontSize: 28,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    fontStyle: 'italic'
  }
});

export default NoteView;
