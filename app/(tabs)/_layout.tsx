import { Tabs } from 'expo-router';
import { StyleSheet, Platform } from 'react-native';
import { Chrome as Home, User, Users, Camera, Apple } from 'lucide-react-native';
import { useEffect, useState } from 'react';

export default function TabLayout() {
  const [userType, setUserType] = useState<'admin' | 'user' | null>(null);

  useEffect(() => {
    // Load user type from storage
    const loadUserType = async () => {
      try {
        const storedUserType = await global.localStorage.getItem('userType');
        setUserType(storedUserType === 'admin' ? 'admin' : 'user');
      } catch (error) {
        console.error('Error loading user type:', error);
        setUserType('user'); // Default to user on error
      }
    };

    loadUserType();
  }, []);

  if (!userType) {
    return null; // Or a loading indicator
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: [
          styles.tabBar,
          Platform.OS === 'android' && styles.androidTabBar
        ],
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false,
      }}>
      {/* 首页 - 对所有用户显示 */}
      <Tabs.Screen
        name="index"
        options={{
          title: '首页',
          tabBarIcon: ({ color, size }) => (
            <Home size={size} color={color} />
          ),
        }}
      />

      {/* 扫描 - 仅对普通用户显示 */}
      {userType === 'user' && (
        <Tabs.Screen
          name="scan"
          options={{
            title: '扫描',
            tabBarIcon: ({ color, size }) => (
              <Camera size={size} color={color} />
            ),
            href: userType === 'user' ? '/scan' : null,
          }}
        />
      )}

      {/* 营养 - 仅对普通用户显示 */}
      {userType === 'user' && (
        <Tabs.Screen
          name="nutrition"
          options={{
            title: '营养',
            tabBarIcon: ({ color, size }) => (
              <Apple size={size} color={color} />
            ),
            href: userType === 'user' ? '/nutrition' : null,
          }}
        />
      )}

      {/* 用户管理 - 仅对管理员显示 */}
      {userType === 'admin' && (
        <Tabs.Screen
          name="users"
          options={{
            title: '用户',
            tabBarIcon: ({ color, size }) => (
              <Users size={size} color={color} />
            ),
            href: userType === 'admin' ? '/users' : null,
          }}
        />
      )}

      {/* 个人资料 - 对所有用户显示 */}
      <Tabs.Screen
        name="profile"
        options={{
          title: '我的',
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    height: 60,
    paddingBottom: 5,
  },
  androidTabBar: {
    elevation: 8,
    height: 65,
    paddingBottom: 10,
  },
  tabBarLabel: {
    fontFamily: Platform.select({
      ios: 'Inter-Medium',
      android: 'normal', // Android 默认字体
      web: 'Inter-Medium',
    }),
    fontSize: 12,
  },
});