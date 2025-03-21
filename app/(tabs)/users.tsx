import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Lock, UserCog } from 'lucide-react-native';

// Mock user data
const initialUsers = [
  { id: 1, name: '张小红', email: 'zhang.xiaohong@example.com', isPremium: false },
  { id: 2, name: '李明', email: 'li.ming@example.com', isPremium: true },
  { id: 3, name: '王华', email: 'wang.hua@example.com', isPremium: false },
  { id: 4, name: '赵静', email: 'zhao.jing@example.com', isPremium: true },
  { id: 5, name: '刘波', email: 'liu.bo@example.com', isPremium: false },
];

export default function UsersScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState(initialUsers);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePremiumToggle = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, isPremium: !user.isPremium } : user
    ));
  };

  const handleResetPassword = (userId: number) => {
    // In a real app, this would call an API to reset the password
    alert(`密码重置链接已发送至用户 ${users.find(u => u.id === userId)?.email}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>用户管理</Text>
        <Text style={styles.subtitle}>管理用户权限和账户设置</Text>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#8E8E93" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="搜索用户..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.userList}>
        {filteredUsers.map(user => (
          <View key={user.id} style={styles.userCard}>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
            </View>
            
            <View style={styles.userActions}>
              <View style={styles.premiumContainer}>
                <UserCog size={20} color="#8E8E93" style={styles.actionIcon} />
                <Text style={styles.premiumLabel}>高级用户</Text>
                <Switch
                  value={user.isPremium}
                  onValueChange={() => handlePremiumToggle(user.id)}
                  trackColor={{ false: '#E5E5EA', true: '#34C759' }}
                  ios_backgroundColor="#E5E5EA"
                />
              </View>
              
              <TouchableOpacity 
                style={styles.resetButton}
                onPress={() => handleResetPassword(user.id)}
              >
                <Lock size={20} color="#FFFFFF" />
                <Text style={styles.resetButtonText}>重置密码</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#000000',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#8E8E93',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 12,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#000000',
  },
  userList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  userCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userInfo: {
    marginBottom: 15,
  },
  userName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#000000',
    marginBottom: 4,
  },
  userEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
  userActions: {
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
    paddingTop: 15,
    gap: 15,
  },
  premiumContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    marginRight: 10,
  },
  premiumLabel: {
    flex: 1,
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#000000',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  resetButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
});