import React, {useCallback, useEffect, useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import NoteView from '../../components/NoteView/NoteView';
import {StyleSheet, TextInput, View} from "react-native";
import {observer} from "mobx-react-lite";
import {useUserStore} from "../../stores/userStore";
import {useTaskStore} from "../../stores/taskStore";
import {createNewTaskApi, getTaskByUser, updateNewTaskApi} from "../../services";

const CreateNoteScreen = observer((props) => {
  const userStore = useUserStore();
  const taskStore = useTaskStore();

  const [title, setTitle] = useState('')

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      props.navigation.getParent().setOptions({ headerShown: false})
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        props.navigation.getParent().setOptions({ headerShown: true})
      };
    }, [])
  )

  useEffect(() => {
    createNewTask()
    return () => unmount()
  }, [])

  const createNewTask = async () => {
    const body = {
      title: title,
      user_id: userStore.user.user_id,
      pin_enable: 0
    }
    const res = await createNewTaskApi(body)
    if (res.data.task_id) {
      taskStore.setCreateTaskId(res.data.task_id)
    }
  }

  const unmount = () => {
    updateNewTask()
  }

  const updateNewTask = async () => {
    const body = {
      title: taskStore.createTask.title,
      task_id: taskStore.createTask.task_id,
      pin_enable: 0,
      is_deleted: 0,
      is_archived: 0
    }
    const res = await updateNewTaskApi(body)
    if (res.data) {
      /* Cập nhật lại danh sách ghi chú */
      const res = await getTaskByUser(userStore.user.user_id)
      if (res.data) {
        taskStore.setTask(res.data)
      }
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.titleInput}
        multiline={true}
        placeholder={'Title'}
        value={title}
        onChangeText={text => {
          setTitle(text)
          taskStore.setTitle(text)
        }}
      />
      <NoteView />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleInput: {
    paddingStart: 12,
    paddingEnd: 12,
    paddingTop: 12,
    fontWeight: 'bold',
    fontSize: 18
  }
})

export default CreateNoteScreen;
