import React, {useCallback} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import NoteView from '../../components/NoteView/NoteView';
import {StyleSheet, TextInput, View} from "react-native";

const CreateNoteScreen = (props) => {

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

  return (
    <View style={styles.container}>
      <TextInput style={styles.titleInput} multiline={true} placeholder={'Title'} />
      <NoteView/>
    </View>
  );
};

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
