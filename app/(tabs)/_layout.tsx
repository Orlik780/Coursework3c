import { Image, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { Colors } from '@/consts/colors';

export default function TabLayout() {
  return (
    <Tabs  screenOptions={{ tabBarActiveTintColor: Colors.orange, tabBarInactiveTintColor: Colors.gray,tabBarStyle: {
      backgroundColor: 'white'
    },}}>
      <Tabs.Screen name="newsscreen" options={{ title: 'Новости', tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/home.png')}
              style={[tabsStyle.imgs, {tintColor: focused ? Colors.megaorange : Colors.gray }]}
            />
          ),}} />
      <Tabs.Screen name="numbers" options={{ title: 'Номера', headerStyle: {
            borderBottomWidth: 2,
            borderBottomColor: Colors.ligthgray,
            elevation: 0,
            shadowOpacity: 0,
          }, tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/double-bed.png')}
              style={[tabsStyle.imgs, {tintColor: focused ? Colors.megaorange : Colors.gray }]}
            />
          ), }} />
      <Tabs.Screen name="account" options={{ title: 'Аккаунт', tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/user.png')}
              style={[tabsStyle.imgs, {tintColor: focused ? Colors.megaorange : Colors.gray }]}
            />
          ), }} />
    </Tabs>
  );
}

const tabsStyle = StyleSheet.create({
  imgs: { 
    width: 24, 
    height: 24
  }
})
