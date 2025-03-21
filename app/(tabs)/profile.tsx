import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, LogOut, Calendar, FileText, Award, Clock } from 'lucide-react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkUserType();
  }, []);

  const checkUserType = async () => {
    try {
      const userType = await AsyncStorage.getItem('userType');
      setIsAdmin(userType === 'admin');
    } catch (error) {
      console.error('Error checking user type:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userType');
      router.navigate({
        pathname: '/auth/login',
        params: {
          reset: 'true'
        }
      });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>个人资料</Text>
        <TouchableOpacity>
          <Settings size={24} color="#000000" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.profileSection}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }} 
            style={styles.profileImage} 
          />
          <Text style={styles.profileName}>{isAdmin ? '系统管理员' : '张小红'}</Text>
          <Text style={styles.profileEmail}>{isAdmin ? 'admin@123.com' : 'zhang.xiaohong@example.com'}</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>165 厘米</Text>
              <Text style={styles.statLabel}>身高</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>65 公斤</Text>
              <Text style={styles.statLabel}>体重</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>27 岁</Text>
              <Text style={styles.statLabel}>年龄</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>编辑资料</Text>
          </TouchableOpacity>
        </View>

        {!isAdmin && (
          <>
            <View style={styles.goalsSection}>
              <Text style={styles.sectionTitle}>我的目标</Text>
              <View style={styles.goalCard}>
                <View style={styles.goalIconContainer}>
                  <Award size={24} color="#007AFF" />
                </View>
                <View style={styles.goalInfo}>
                  <Text style={styles.goalTitle}>每日卡路里目标</Text>
                  <Text style={styles.goalValue}>2,000 卡路里</Text>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: '62.5%' }]} />
                  </View>
                  <Text style={styles.progressText}>已消耗 1,250 / 2,000 卡路里</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.viewAllGoals}>
                <Text style={styles.viewAllGoalsText}>查看所有目标</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.menuSection}>
              <TouchableOpacity style={styles.menuItem}>
                <View style={[styles.menuIconContainer, { backgroundColor: '#FF950020' }]}>
                  <Calendar size={24} color="#FF9500" />
                </View>
                <Text style={styles.menuItemText}>餐食历史</Text>
                <Text style={styles.menuItemArrow}>›</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <View style={[styles.menuIconContainer, { backgroundColor: '#5856D620' }]}>
                  <FileText size={24} color="#5856D6" />
                </View>
                <Text style={styles.menuItemText}>营养报告</Text>
                <Text style={styles.menuItemArrow}>›</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <View style={[styles.menuIconContainer, { backgroundColor: '#FF2D5520' }]}>
                  <Award size={24} color="#FF2D55" />
                </View>
                <Text style={styles.menuItemText}>成就</Text>
                <Text style={styles.menuItemArrow}>›</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <View style={[styles.menuIconContainer, { backgroundColor: '#4CD96420' }]}>
                  <Clock size={24} color="#4CD964" />
                </View>
                <Text style={styles.menuItemText}>禁食计划</Text>
                <Text style={styles.menuItemArrow}>›</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.upgradeCard}>
              <Text style={styles.upgradeTitle}>升级到高级版</Text>
              <Text style={styles.upgradeDescription}>
                获取无限食物扫描、详细营养洞察和个性化餐饮计划。
              </Text>
              <TouchableOpacity style={styles.upgradeButton}>
                <Text style={styles.upgradeButtonText}>查看套餐</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#FFFFFF" style={styles.logoutIcon} />
          <Text style={styles.logoutText}>退出登录</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  profileName: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: '#000000',
    marginBottom: 5,
  },
  profileEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#000000',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E5E5E5',
    height: '100%',
  },
  editProfileButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
  editProfileText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  goalsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#000000',
    marginBottom: 16,
  },
  goalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  goalIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#007AFF20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  goalInfo: {
    flex: 1,
  },
  goalTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#000000',
    marginBottom: 4,
  },
  goalValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#007AFF',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 2,
  },
  progressText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
  viewAllGoals: {
    alignItems: 'center',
    marginTop: 12,
  },
  viewAllGoalsText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#007AFF',
  },
  menuSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemText: {
    flex: 1,
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#000000',
  },
  menuItemArrow: {
    fontFamily: 'Inter-Regular',
    fontSize: 24,
    color: '#8E8E93',
  },
  upgradeCard: {
    backgroundColor: '#007AFF',
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 20,
    marginBottom: 24,
  },
  upgradeTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  upgradeDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 16,
  },
  upgradeButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  upgradeButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#007AFF',
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutIcon: {
    marginRight: 10,
  },
  logoutText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});