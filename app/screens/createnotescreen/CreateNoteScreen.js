import React, {useCallback} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import NoteView from '../../components/NoteView/NoteView';

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

  return <NoteView />;
};

export default CreateNoteScreen;
