import React from 'react';
import { View, StyleSheet, Text, StatusBar, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import { Home } from '../screens/Home';
import { Mssage } from '../screens/Message';
import { Profile } from '../screens/Profile';
import { Colors } from '../theme/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import profile from '../assest/profile.png';
const Tab = createBottomTabNavigator();

const ExploreScreen = () => (
  <View
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.background,
    }}
  >
    <Text style={{ color: Colors.textMuted, marginTop: 12, fontSize: 16 }}>
      Explore
    </Text>
  </View>
);

const NotificationsScreen = () => (
  <View
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.background,
    }}
  >
    <Text style={{ color: Colors.textMuted, marginTop: 12, fontSize: 16 }}>
      Notifications
    </Text>
  </View>
);

interface TabBarIconProps {
  name: string;
  focused: boolean;
  label: string;
}

const TabBarIcon = ({ name, focused, label }: TabBarIconProps) => (
  <View style={[styles.iconWrapper, focused && styles.iconActive]}>
    <Icon
      name={name}
      size={22}
      color={focused ? Colors.white : Colors.tabInactive}
    />
  </View>
);

export const TabNavigation= () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={'dark-content'} />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.tabInactive,
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon name="home" focused={focused} label="Home" />
            ),
          }}
        />
        <Tab.Screen
          name="Explore"
          component={ExploreScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon name="compass" focused={focused} label="Explore" />
            ),
          }}
        />
        <Tab.Screen
          name="Messages"
          component={Mssage}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                name="message-circle"
                focused={focused}
                label="Messages"
              />
            ),
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon name="bell" focused={focused} label="Notifications" />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={[
                  styles.profileIcon,
                  focused && styles.profileIconFocused,
                ]}
              >   
            
                <Image
                  source={profile}
                  style={{
                    width: 33,
                    height:33,
                    borderRadius: 18,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor:focused ? Colors.white : Colors.tabInactive
                  }}
                />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.white,
    borderTopWidth: 0,
    height: 70,
    paddingBottom: 10,
    paddingTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: -4 },
    elevation: 12,
    paddingHorizontal: 8,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconActive: {
    backgroundColor: Colors.primary,
  },
  profileIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.border,
    overflow: 'hidden',
  },
  profileIconFocused: {
    backgroundColor: Colors.primary,
  },
});
