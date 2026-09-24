import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Alert,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CartContext } from '../context/CartContext';
import { COLORS, RADIUS, SHADOWS, SPACING } from '../theme/colors';

const ItemDetailScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState('');
  const { addToCart } = useContext(CartContext);
  const { height } = useWindowDimensions();

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart(item, quantity, instructions);
    Alert.alert(
      'Added to Cart!',
      `Added ${quantity} x ${item.name} to your cart.`,
      [
        {
          text: 'Continue Shopping',
          onPress: () => navigation.goBack(),
          style: 'cancel',
        },
        {
          text: 'Go to Cart',
          onPress: () => navigation.navigate('Cart'),
        },
      ]
    );
  };

  const totalAmount = item.price * quantity;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Banner Image Container */}
        <View style={[styles.imageContainer, { height: height * 0.35 }]}>
          <Image source={{ uri: item.image }} style={styles.image} />

          {/* Back Button Overlay */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Detail Card Content */}
        <View style={styles.detailsContainer}>
          {/* Category & Tags Row */}
          <View style={styles.tagsRow}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{item.category.toUpperCase()}</Text>
            </View>

            <View style={styles.metaInfo}>
              <Ionicons name="star" size={14} color={COLORS.starYellow} />
              <Text style={styles.metaText}>{item.rating}</Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.metaText}>⏱ {item.prepTime}</Text>
              {item.calories && (
                <>
                  <Text style={styles.dot}>•</Text>
                  <Text style={styles.metaText}>🔥 {item.calories}</Text>
                </>
              )}
            </View>
          </View>

          {/* Title & Price */}
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.price}>Rs. {item.price}</Text>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Description */}
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{item.description}</Text>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Special Instructions */}
          <Text style={styles.sectionTitle}>Special Instructions</Text>
          <TextInput
            style={styles.instructionsInput}
            placeholder="e.g. Less spicy, separate sauce, extra napkins..."
            placeholderTextColor={COLORS.textMuted}
            value={instructions}
            onChangeText={setInstructions}
            multiline
            numberOfLines={2}
          />

          {/* Quantity Selector */}
          <View style={styles.quantityRow}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <View style={styles.quantitySelector}>
              <TouchableOpacity
                style={[styles.qtyBtn, quantity <= 1 && styles.qtyBtnDisabled]}
                onPress={handleDecrease}
                disabled={quantity <= 1}
              >
                <Ionicons
                  name="remove"
                  size={18}
                  color={quantity <= 1 ? COLORS.textMuted : COLORS.textPrimary}
                />
              </TouchableOpacity>

              <Text style={styles.qtyText}>{quantity}</Text>

              <TouchableOpacity style={styles.qtyBtn} onPress={handleIncrease}>
                <Ionicons name="add" size={18} color={COLORS.textPrimary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Sticky Add To Cart Bar */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.totalLabel}>Total Price</Text>
          <Text style={styles.totalValue}>Rs. {totalAmount}</Text>
        </View>

        <TouchableOpacity
          style={styles.addCartBtn}
          activeOpacity={0.85}
          onPress={handleAddToCart}
        >
          <Ionicons name="cart" size={20} color={COLORS.white} />
          <Text style={styles.addCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  imageContainer: {
    width: '100%',
    position: 'relative',
    backgroundColor: COLORS.divider,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: SPACING.md,
    backgroundColor: COLORS.white,
    width: 40,
    height: 40,
    borderRadius: RADIUS.round,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  detailsContainer: {
    padding: SPACING.lg,
    backgroundColor: COLORS.cardBg,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    marginTop: -20,
  },
  tagsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  categoryBadge: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
  },
  categoryText: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '800',
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  dot: {
    color: COLORS.textMuted,
    marginHorizontal: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginTop: SPACING.xs,
  },
  price: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.secondary,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  description: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  instructionsInput: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    padding: SPACING.sm + 2,
    fontSize: 14,
    color: COLORS.textPrimary,
    textAlignVertical: 'top',
  },
  quantityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.round,
    paddingHorizontal: SPACING.xs,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.round,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  qtyBtnDisabled: {
    backgroundColor: COLORS.divider,
  },
  qtyText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginHorizontal: SPACING.md,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.cardBg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.large,
  },
  totalLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.secondary,
  },
  addCartBtn: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md - 2,
    borderRadius: RADIUS.md,
    ...SHADOWS.medium,
  },
  addCartText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },
});

export default ItemDetailScreen;
