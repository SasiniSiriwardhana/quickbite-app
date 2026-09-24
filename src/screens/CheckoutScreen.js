import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CartContext } from '../context/CartContext';
import { COLORS, RADIUS, SHADOWS, SPACING } from '../theme/colors';

const LOCATIONS = [
  { id: 'loc1', name: 'Main Canteen Counter', desc: 'Ground Floor, Student Center' },
  { id: 'loc2', name: 'Engineering Faculty Cafe', desc: 'Block C, East Wing' },
  { id: 'loc3', name: 'Central Library Express', desc: 'Library Plaza Ground' },
  { id: 'loc4', name: 'Hostel Delivery Block', desc: 'Hostel Main Entrance' },
];

const PAYMENTS = [
  { id: 'p1', name: 'Cash on Pickup / Delivery', icon: 'cash-outline', desc: 'Pay when receiving your food' },
  { id: 'p2', name: 'Student Wallet Card', icon: 'card-outline', desc: 'Deduct from campus ID balance' },
  { id: 'p3', name: 'Online Bank Transfer', icon: 'globe-outline', desc: 'Pay via university portal' },
];

const CheckoutScreen = ({ navigation }) => {
  const { cart, deliveryFee, getCartSubtotal, getCartTotal, placeOrder, user } =
    useContext(CartContext);

  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0].name);
  const [selectedPayment, setSelectedPayment] = useState(PAYMENTS[0].name);

  const subtotal = getCartSubtotal();
  const total = getCartTotal();

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      Alert.alert('Empty Cart', 'Your cart is empty.');
      return;
    }

    const order = placeOrder({
      location: selectedLocation,
      paymentMethod: selectedPayment,
    });

    // Alert confirmation and navigate to OrderTracking
    Alert.alert(
      'Order Placed! 🎉',
      `Your order #${order.id} has been submitted successfully. Estimated pickup time is ${order.pickupTime}.`,
      [
        {
          text: 'Track Order',
          onPress: () =>
            navigation.replace('OrderTracking', { orderId: order.id }),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* User Info Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="person" size={20} color={COLORS.primary} />
            <Text style={styles.cardTitle}>Student Details</Text>
          </View>
          <View style={styles.userRow}>
            <Text style={styles.userName}>{user?.name || 'Guest Student'}</Text>
            <Text style={styles.userBadge}>
              {user?.isGuest ? 'GUEST' : `ID: ${user?.studentId}`}
            </Text>
          </View>
        </View>

        {/* Pickup / Delivery Location Selection */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="location" size={20} color={COLORS.primary} />
            <Text style={styles.cardTitle}>Pickup / Delivery Point</Text>
          </View>

          {LOCATIONS.map((loc) => {
            const isSelected = selectedLocation === loc.name;
            return (
              <TouchableOpacity
                key={loc.id}
                style={[
                  styles.optionCard,
                  isSelected && styles.optionCardSelected,
                ]}
                activeOpacity={0.8}
                onPress={() => setSelectedLocation(loc.name)}
              >
                <Ionicons
                  name={isSelected ? 'radio-button-on' : 'radio-button-off'}
                  size={20}
                  color={isSelected ? COLORS.primary : COLORS.textMuted}
                />
                <View style={styles.optionContent}>
                  <Text
                    style={[
                      styles.optionTitle,
                      isSelected && styles.optionTitleSelected,
                    ]}
                  >
                    {loc.name}
                  </Text>
                  <Text style={styles.optionSub}>{loc.desc}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Payment Method Selection */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="wallet" size={20} color={COLORS.primary} />
            <Text style={styles.cardTitle}>Payment Method</Text>
          </View>

          {PAYMENTS.map((pm) => {
            const isSelected = selectedPayment === pm.name;
            return (
              <TouchableOpacity
                key={pm.id}
                style={[
                  styles.optionCard,
                  isSelected && styles.optionCardSelected,
                ]}
                activeOpacity={0.8}
                onPress={() => setSelectedPayment(pm.name)}
              >
                <Ionicons
                  name={isSelected ? 'radio-button-on' : 'radio-button-off'}
                  size={20}
                  color={isSelected ? COLORS.primary : COLORS.textMuted}
                />
                <Ionicons
                  name={pm.icon}
                  size={22}
                  color={isSelected ? COLORS.secondary : COLORS.textSecondary}
                  style={{ marginLeft: 6 }}
                />
                <View style={styles.optionContent}>
                  <Text
                    style={[
                      styles.optionTitle,
                      isSelected && styles.optionTitleSelected,
                    ]}
                  >
                    {pm.name}
                  </Text>
                  <Text style={styles.optionSub}>{pm.desc}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Items Brief Overview */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="bag-handle" size={20} color={COLORS.primary} />
            <Text style={styles.cardTitle}>Order Summary ({cart.length} items)</Text>
          </View>

          {cart.map((i) => (
            <View key={i.id} style={styles.summaryItemRow}>
              <Text style={styles.summaryQty}>{i.quantity}x</Text>
              <Text style={styles.summaryName} numberOfLines={1}>
                {i.item.name}
              </Text>
              <Text style={styles.summaryPrice}>
                Rs. {i.item.price * i.quantity}
              </Text>
            </View>
          ))}

          <View style={styles.divider} />

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Items Subtotal</Text>
            <Text style={styles.priceVal}>Rs. {subtotal}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Campus Service Fee</Text>
            <Text style={styles.priceVal}>Rs. {deliveryFee}</Text>
          </View>
          <View style={styles.priceRowTotal}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalVal}>Rs. {total}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Place Order Bar */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.payLabel}>Payable Total</Text>
          <Text style={styles.payAmount}>Rs. {total}</Text>
        </View>

        <TouchableOpacity
          style={styles.placeOrderBtn}
          activeOpacity={0.88}
          onPress={handlePlaceOrder}
        >
          <Text style={styles.placeOrderText}>Confirm & Place Order</Text>
          <Ionicons name="checkmark-circle" size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 2,
    backgroundColor: COLORS.cardBg,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.round,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.secondary,
  },
  scrollContent: {
    padding: SPACING.md,
    paddingBottom: 120,
    gap: SPACING.md,
  },
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    marginBottom: SPACING.md,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  userRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: SPACING.sm + 2,
    borderRadius: RADIUS.md,
  },
  userName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  userBadge: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.secondary,
    backgroundColor: COLORS.secondaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.sm + 2,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.xs + 2,
    backgroundColor: COLORS.cardBg,
  },
  optionCardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  optionContent: {
    marginLeft: SPACING.sm,
    flex: 1,
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  optionTitleSelected: {
    color: COLORS.primary,
  },
  optionSub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  summaryItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  summaryQty: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primary,
    width: 28,
  },
  summaryName: {
    fontSize: 14,
    color: COLORS.textPrimary,
    flex: 1,
  },
  summaryPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.secondary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.sm,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  priceLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  priceVal: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  priceRowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.xs,
    paddingTop: SPACING.xs,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  totalVal: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.secondary,
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
  payLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  payAmount: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.secondary,
  },
  placeOrderBtn: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md - 2,
    borderRadius: RADIUS.md,
    ...SHADOWS.medium,
  },
  placeOrderText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },
});

export default CheckoutScreen;
