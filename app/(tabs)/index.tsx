import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Users, TrendingUp, Settings } from 'lucide-react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;

const weekData = {
  labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  datasets: [{
    data: [2100, 1950, 2300, 2000, 2400, 1800, 2200],
  }]
};

const monthlyRegistrations = {
  labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
  datasets: [{
    data: [20, 45, 28, 80, 99, 43],
  }]
};

const activityData = [
  {
    name: '活跃用户',
    population: 75,
    color: '#34C759',
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  },
  {
    name: '非活跃用户',
    population: 25,
    color: '#FF3B30',
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  },
];

export default function HomeScreen() {
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

  if (!isAdmin) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.greeting}>你好，用户</Text>
            <Text style={styles.title}>追踪你的卡路里</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>管理员仪表盘</Text>
          <Text style={styles.headerSubtitle}>数据分析与用户洞察</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={[styles.iconCircle, { backgroundColor: '#E3F2FF' }]}>
              <Users size={20} color="#007AFF" />
            </View>
            <Text style={styles.statValue}>2,547</Text>
            <Text style={styles.statLabel}>总用户数</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.iconCircle, { backgroundColor: '#E8FAE8' }]}>
              <Users size={20} color="#34C759" />
            </View>
            <Text style={styles.statValue}>1,890</Text>
            <Text style={styles.statLabel}>活跃用户</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.iconCircle, { backgroundColor: '#FFF5EB' }]}>
              <TrendingUp size={20} color="#FF9500" />
            </View>
            <Text style={styles.statValue}>75%</Text>
            <Text style={styles.statLabel}>活跃率</Text>
          </View>
        </View>

        <View style={styles.chartSection}>
          <Text style={styles.chartTitle}>用户餐食指标分析</Text>
          <Text style={styles.chartSubtitle}>过去7天平均卡路里摄入量</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chartScrollContent}
          >
            <LineChart
              data={weekData}
              width={screenWidth * 0.9}
              height={220}
              chartConfig={{
                backgroundColor: '#FFFFFF',
                backgroundGradientFrom: '#FFFFFF',
                backgroundGradientTo: '#FFFFFF',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
                labelColor: () => '#007AFF',
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#007AFF"
                },
                fillShadowGradient: '#E3F2FF',
                fillShadowGradientOpacity: 0.6,
                count: 6,
              }}
              bezier
              style={styles.chart}
              withVerticalLines={false}
              segments={6}
              withHorizontalLabels={true}
            />
          </ScrollView>
        </View>

        <View style={styles.chartSection}>
          <Text style={styles.chartTitle}>用户注册量分析</Text>
          <Text style={styles.chartSubtitle}>近6个月新增用户数量</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chartScrollContent}
          >
            <BarChart
              data={monthlyRegistrations}
              width={screenWidth * 0.9}
              height={220}
              yAxisLabel=""
              yAxisSuffix=""
              chartConfig={{
                backgroundColor: '#FFFFFF',
                backgroundGradientFrom: '#FFFFFF',
                backgroundGradientTo: '#FFFFFF',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
                labelColor: () => '#007AFF',
                style: {
                  borderRadius: 16,
                },
                barPercentage: 0.85,
                count: 6,
              }}
              style={styles.chart}
              showValuesOnTopOfBars={true}
              fromZero={true}
              withInnerLines={true}
              segments={6}
              withHorizontalLabels={true}
            />
          </ScrollView>
        </View>

        <View style={styles.chartSection}>
          <Text style={styles.chartTitle}>用户活跃度分析</Text>
          <Text style={styles.chartSubtitle}>活跃与非活跃用户比例</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chartScrollContent}
          >
            <PieChart
              data={activityData}
              width={screenWidth * 0.9}
              height={220}
              chartConfig={{
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#000000',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  greeting: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#000000',
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    width: '31%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#000000',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  chartSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#000000',
    marginBottom: 4,
  },
  chartSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginBottom: 16,
  },
  chartScrollContent: {
    paddingRight: 16,
  },
  chart: {
    borderRadius: 8,
  },
});