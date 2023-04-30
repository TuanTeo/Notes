import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Text} from 'react-native-paper';
import {colors} from '../../drawers/constant';
import TaskItem from '../../components/task/TaskItem';
import {ScrollView} from 'react-native-gesture-handler';
import {observer} from "mobx-react-lite";
import {useDetailStore} from "../../stores/detailStore";

const NoteView = observer((props) => {
  const detailStore = useDetailStore()

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TaskItem
          text={
            'Task 1 Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1'
          }
        />
        <TaskItem text={'Task 2'} />
        <TaskItem text={'Task 3'} />
        <TaskItem text={'Task 4'} />
        <TaskItem text={'Task 5'} />
        <TaskItem text={'Task 6'} />
        <TaskItem text={'Task 6'} />
        <TaskItem text={'Task 6'} />
        <TaskItem text={'Task 6'} />
        <TaskItem text={'Task 6'} />

        <TaskItem text={'Task 6'} />
        <TaskItem text={'Task 6'} />
        <TaskItem text={'Task 6'} />
        <TaskItem text={'Task 6'} />
        <TaskItem text={'Task 6'} />
      </ScrollView>

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
});

export default NoteView;
