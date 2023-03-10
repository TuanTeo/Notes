import {Icons} from '../components/Icons';
// import HomeScreen from "../screens/HomeScreen";
import HomeNavigator from '../navigations/HomeNavigator.js';
import {colors} from './constant';

export const ScreensArray = [
  {
    route: 'Notes',
    label: 'Notes',
    type: Icons.Feather,
    icon: 'home',
    component: HomeNavigator,
    color: colors.icon1,
  },
  {
    route: 'Archived',
    label: 'Archived',
    type: Icons.Feather,
    icon: 'archive',
    component: HomeNavigator,
    color: colors.icon2,
  },
  {
    route: 'Trash',
    label: 'Trash',
    type: Icons.Feather,
    icon: 'trash',
    component: HomeNavigator,
    color: colors.icon3,
  },
  // { route: 'Documents', label: 'My Documents', type: Icons.Feather, icon: 'layers', component: HomeScreen, color: colors.icon4, },
  // { route: 'Activity', label: 'My Activity', type: Icons.Feather, icon: 'pie-chart', component: HomeScreen, color: colors.primary, },
  {
    route: 'Settings',
    label: 'Settings',
    type: Icons.Feather,
    icon: 'settings',
    component: HomeNavigator,
    color: colors.important,
  },
];

export const ProjectsArray = [
  {
    title: 'Personal',
    icon: 'profile',
    color: colors.icon1,
    iconType: Icons.AntDesign,
  },
  {
    title: 'travel',
    icon: 'profile',
    color: colors.icon2,
    iconType: Icons.AntDesign,
  },
  {
    title: 'Business',
    icon: 'profile',
    color: colors.icon3,
    iconType: Icons.AntDesign,
  },
  {title: 'Add', icon: 'plus', color: colors.icon4, iconType: Icons.AntDesign},
];

export const ProfileMenu = [
  {label: 'History', icon: 'history', iconType: Icons.MaterialIcons},
  {label: 'Rate', icon: 'star', iconType: Icons.MaterialIcons},
  {label: 'Share', icon: 'share', iconType: Icons.MaterialIcons},
  {label: 'Logout', icon: 'logout', iconType: Icons.MaterialIcons},
];
