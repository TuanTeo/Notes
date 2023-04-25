import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {ScreensArray} from './arrays.js';
import {colors} from './constant';
import CustomDrawer from './CustomDrawer';
import NAVIGATION_COMPONENT from '../utils/navConstants.js';
import AccountManagerScreen from '../screens/accountmanagerscreen/AccountManagerScreen.js';
import {Icons} from '../components/Icons/index.js';
import HomeNavigator from '../navigations/HomeNavigator.js';

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
            headerShown: true,
          }}
        />
      ))}
      <Drawer.Screen
        key={6}
        name={NAVIGATION_COMPONENT.ACCOUNT_MANAGER_SCREEN}
        component={AccountManagerScreen}
        options={{
          item: {
            route: 'AccountManagerScreen',
            label: 'AccountManagerScreen',
            type: Icons.Feather,
            icon: 'home',
            component: HomeNavigator,
            color: colors.icon1,
          },
          headerShown: true,
        }}
      />
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
