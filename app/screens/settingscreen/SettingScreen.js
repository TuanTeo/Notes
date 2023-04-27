import React, {useState} from 'react';
import {StyleSheet, Switch, View} from 'react-native';
import {Text} from 'react-native-paper';

export default SettingScreen = ({navigation}) => {
  const [enableBiometric, setEnableBiometric] = useState(false)

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Text>Đăng nhập bằng sinh trắc học</Text>
        <Switch value={enableBiometric} onValueChange={value => setEnableBiometric(value)}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    rowGap: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
