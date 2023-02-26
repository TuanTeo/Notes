import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import { Platform, StyleSheet } from 'react-native'
import { ScreensArray } from './arrays';
import { colors } from './constant';
import CustomDrawer from './CustomDrawer';

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: styles.drawerStyles,
        drawerType: 'slide',
        overlayColor: 'transparent',
        swipeEdgeWidth: Platform.OS === 'android' && 180,
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      {ScreensArray.map((_, i) => (
        <Drawer.Screen key={i} name={_.route} component={_.component}
          options={{
            item: _,
          }}
        />
      ))}
    </Drawer.Navigator>
  )
}

export default DrawerNav

const styles = StyleSheet.create({
  drawerStyles: {
    width: 260,
    backgroundColor: colors.sceneBg,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white'
  },
})