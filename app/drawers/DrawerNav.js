import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {ScreensArray} from './arrays.js';
import {colors} from './constant';
import CustomDrawer from './CustomDrawer';

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: styles.drawerStyles,
        drawerType: 'slide',
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      {ScreensArray.map((_, i) => (
        <Drawer.Screen
          key={i}
          name={_.route}
          component={_.component}
          options={{
            item: _,
            headerShown: false,
          }}
        />
      ))}
    </Drawer.Navigator>
  );
};

export default DrawerNav;

const styles = StyleSheet.create({
  drawerStyles: {
    backgroundColor: colors.sceneBg,
    paddingTop: 30,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
});
