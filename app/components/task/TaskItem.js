import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const TaskItem = props => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <TouchableOpacity style={styles.square}></TouchableOpacity>
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
      <View style={styles.circular}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemLeft: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#29eaff',
    opacity: 0.4,
    borderRadius: 5,
    marginEnd: 15,
  },
  itemText: {
    maxWidth: '80%',
  },
  circular: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderColor: '#234234',
    borderWidth: 2,
  },
});

export default TaskItem;
