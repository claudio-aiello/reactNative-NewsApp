import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import CategorieScreen from '../screens/Categories';
import SettingScreen from '../screens/Setting';
import BookMarkScreen from '../screens/Bookmark';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Post from '../screens/Post';
import PostDetail from '../screens/PostDetail';

const Stack = createStackNavigator();
function HomeStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={HomeScreen}/>
      <Stack.Screen name="PostDetail" component={PostDetail} />
    </Stack.Navigator>
  );
}
function BookMarkStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Bookmark" component={BookMarkScreen} />
    </Stack.Navigator>
  );
}
function SettingStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Setting" component={SettingScreen} />
    </Stack.Navigator>
  );
}
function CategorieStack({navigation}) {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Categorie" component={CategorieScreen} />
      <Stack.Screen name="Post" component={Post} />
      <Stack.Screen name="PostDetail" component={PostDetail} />
    </Stack.Navigator>
  );
}

export default Navigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Bookmark') {
              iconName = focused ? 'bookmark' : 'bookmark-outline';
            } else if (route.name === 'Categories') {
              iconName = focused ? 'apps' : 'apps-box';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'cog' : 'cog-box';
            }
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Categories" component={CategorieStack} />
        <Tab.Screen name="Bookmark" component={BookMarkStack} />
        <Tab.Screen name="Settings" component={SettingStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
