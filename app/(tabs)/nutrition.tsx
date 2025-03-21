import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MoveVertical as MoreVertical, Flame, Apple, Egg, Droplet, Heart } from 'lucide-react-native';

export default function NutritionScreen() {
  // 食物项目的模拟数据
  const foodItem = {
    name: '蓝莓糖浆煎饼',
    mealType: '早餐',
    calories: 615,
    carbs: 93,
    protein: 11,
    fats: 21,
    healthScore: 7,
    ingredients: [
      { name: '煎饼', calories: 595, image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80' },
      { name: '蓝莓', calories: 8, image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80' },
      { name: '糖浆', calories: 12, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80' }
    ]
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>营养</Text>
        <TouchableOpacity>
          <MoreVertical size={24} color="#000000" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.foodImageContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500&q=80' }} 
            style={styles.foodImage} 
          />
          
          {foodItem.ingredients.map((ingredient, index) => (
            <View 
              key={index} 
              style={[
                styles.ingredientTag,
                index === 0 ? { top: '30%', left: '20%' } :
                index === 1 ? { top: '60%', left: '70%' } :
                { top: '40%', left: '40%' }
              ]}
            >
              <Text style={styles.ingredientName}>{ingredient.name}</Text>
              <Text style={styles.ingredientCalories}>{ingredient.calories}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.foodInfoContainer}>
          <Text style={styles.mealType}>{foodItem.mealType}</Text>
          <Text style={styles.foodName}>{foodItem.name}</Text>
          
          <View style={styles.quantityControl}>
            <TouchableOpacity style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>1</Text>
            <TouchableOpacity style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.nutritionGrid}>
            <View style={styles.nutritionItem}>
              <View style={styles.nutritionIconContainer}>
                <Flame size={20} color="#FF3B30" />
              </View>
              <Text style={styles.nutritionLabel}>卡路里</Text>
              <Text style={styles.nutritionValue}>{foodItem.calories}</Text>
            </View>
            
            <View style={styles.nutritionItem}>
              <View style={[styles.nutritionIconContainer, { backgroundColor: '#FFD60A20' }]}>
                <Apple size={20} color="#FFD60A" />
              </View>
              <Text style={styles.nutritionLabel}>碳水</Text>
              <Text style={styles.nutritionValue}>{foodItem.carbs}克</Text>
            </View>
            
            <View style={styles.nutritionItem}>
              <View style={[styles.nutritionIconContainer, { backgroundColor: '#FF375F20' }]}>
                <Egg size={20} color="#FF375F" />
              </View>
              <Text style={styles.nutritionLabel}>蛋白质</Text>
              <Text style={styles.nutritionValue}>{foodItem.protein}克</Text>
            </View>
            
            <View style={styles.nutritionItem}>
              <View style={[styles.nutritionIconContainer, { backgroundColor: '#5AC8FA20' }]}>
                <Droplet size={20} color="#5AC8FA" />
              </View>
              <Text style={styles.nutritionLabel}>脂肪</Text>
              <Text style={styles.nutritionValue}>{foodItem.fats}克</Text>
            </View>
          </View>
          
          <View style={styles.healthScoreContainer}>
            <View style={styles.healthScoreHeader}>
              <View style={styles.healthScoreIconContainer}>
                <Heart size={20} color="#FF2D55" />
              </View>
              <Text style={styles.healthScoreTitle}>健康评分</Text>
              <Text style={styles.healthScoreValue}>{foodItem.healthScore}/10</Text>
            </View>
            
            <View style={styles.healthScoreBar}>
              <View style={[styles.healthScoreFill, { width: `${foodItem.healthScore * 10}%` }]} />
            </View>
          </View>
          
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.fixResultsButton}>
              <Text style={styles.fixResultsText}>修正结果</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.doneButton}>
              <Text style={styles.doneText}>完成</Text>
            </TouchableOpacity>
          </View>
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
  foodImageContainer: {
    position: 'relative',
    width: '100%',
    height: 300,
  },
  foodImage: {
    width: '100%',
    height: '100%',
  },
  ingredientTag: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  ingredientName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#000000',
    marginRight: 5,
  },
  ingredientCalories: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#007AFF',
  },
  foodInfoContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 40,
  },
  mealType: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 5,
  },
  foodName: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: '#000000',
    marginBottom: 20,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 20,
    color: '#000000',
  },
  quantityText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#000000',
    marginHorizontal: 20,
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  nutritionItem: {
    width: '48%',
    backgroundColor: '#F8F8F8',
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
  },
  nutritionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF3B3020',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  nutritionLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 5,
  },
  nutritionValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#000000',
  },
  healthScoreContainer: {
    backgroundColor: '#F8F8F8',
    borderRadius: 16,
    padding: 15,
    marginBottom: 30,
  },
  healthScoreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  healthScoreIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF2D5520',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  healthScoreTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#000000',
    flex: 1,
  },
  healthScoreValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#000000',
  },
  healthScoreBar: {
    height: 8,
    backgroundColor: '#E5E5E5',
    borderRadius: 4,
    overflow: 'hidden',
  },
  healthScoreFill: {
    height: '100%',
    backgroundColor: '#4CD964',
    borderRadius: 4,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fixResultsButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginRight: 10,
  },
  fixResultsText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#000000',
  },
  doneButton: {
    flex: 1,
    backgroundColor: '#000000',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginLeft: 10,
  },
  doneText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});