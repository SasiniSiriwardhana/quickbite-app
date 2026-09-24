import React, { useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CartContext } from '../context/CartContext';
import { COLORS, RADIUS, SHADOWS, SPACING } from '../theme/colors';

const STATUS_STEPS = [
  { key: 'Placed', label: 'Order Placed', icon: 'document-text-outline', desc: 'Received by canteen' },
  { key: 'Preparing', label: 'Preparing Food', icon: 'restaurant-outline', desc: 'Chef is cooking' },
  { key: 'Ready for pickup', label: 'Ready for Pickup', icon: 'bag-check-outline', desc: 'Collect at counter' },
];

const OrderTrackingScreen = ({ route, navigation }) => {
  const { orders, updateOrderStatus } = useContext(CartContext);

  // Get order ID from route params or grab latest order
  const orderId = route.params?.orderId || (orders.length > 0 ? orders[0].id : null);
  const activeOrder = orders.find((o) => o.id === orderId) || orders[0];

  if (!activeOrder) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Ionicons name="receipt-outline" size={64} color={COLORS.textMuted} />
          <Text style={styles.emptyTitle}>No Active Order Found</Text>
          <TouchableOpacity
            style={styles.homeBtn}
            onPress={() => navigation.navigate('HomeTab')}
          >
            <Text style={styles.homeBtnText}>Go to Home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Get index of current status
  const currentStepIndex = STATUS_STEPS.findIndex(
    (s) => s.key.toLowerCase() === activeOrder.status.toLowerCase()
  );

  const activeIndex = currentStepIndex >= 0 ? currentStepIndex : 0;

  // Simulator helper to cycle status for testing purposes
  const handleSimulateStatus = () => {
    const nextIndex = (activeIndex + 1) % STATUS_STEPS.length;
    const nextStatus = STATUS_STEPS[nextIndex].key;
    updateOrderStatus(activeOrder.id, nextStatus);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('HomeTab')}
        >
          <Ionicons name="arrow-back" size={22} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Tracking</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Main Status Header Card */}
        <View style={styles.statusHeaderCard}>
          <View style={styles.orderIdBadge}>
            <Text style={styles.orderIdText}>Order #{activeOrder.id}</Text>
          </View>
          <Text style={styles.statusTitle}>
            {STATUS_STEPS[activeIndex]?.label || activeOrder.status}
          </Text>
          <Text style={styles.timeEstimate}>
            ⏱ Estimated Pickup: {activeOrder.pickupTime || '15-20 min'}
          </Text>
        </View>

        {/* Timeline Status Step Bar */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Order Status Timeline</Text>

          <View style={styles.timelineContainer}>
            {STATUS_STEPS.map((step, idx) => {
              const isDone = idx <= activeIndex;
              const isCurrent = idx === activeIndex;

              return (
                <View key={step.key} style={styles.timelineStepRow}>
                  {/* Step Left Dot and Connecting Line */}
                  <View style={styles.leftColumn}>
                    <View
                      style={[
                        styles.stepDot,
                        isDone && styles.stepDotDone,
                        isCurrent && styles.stepDotCurrent,
                      ]}
                    >
                      <Ionicons
                        name={isDone ? 'checkmark' : step.icon}
                        size={14}
                        color={isDone ? COLORS.white : COLORS.textMuted}
                      />
                    </View>

                    {idx < STATUS_STEPS.length - 1 && (
                      <View
                        style={[
                          styles.connectingLine,
                          idx < activeIndex && styles.connectingLineDone,
                        ]}
                      />
                    )}
                  </View>

                  {/* Step Right Content */}
                  <View style={styles.rightColumn}>
                    <Text
                      style={[
                        styles.stepTitle,
                        isDone && styles.stepTitleDone,
                        isCurrent && styles.stepTitleCurrent,
                      ]}
                    >
                      {step.label}
                    </Text>
                    <Text style={styles.stepDesc}>{step.desc}</Text>
                  </View>
                </View>
              );
            })}
          </View>

          {/* Simulate Status Progress Button */}
          <TouchableOpacity
            style={styles.simulateBtn}
            onPress={handleSimulateStatus}
          >
            <Ionicons name="refresh-circle" size={20} color={COLORS.secondary} />
            <Text style={styles.simulateBtnText}>
              Simulate Status Progress ({STATUS_STEPS[(activeIndex + 1) % STATUS_STEPS.length].key})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Pickup & Order Info */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Pickup Details</Text>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={18} color={COLORS.primary} />
            <Text style={styles.infoText}>{activeOrder.location}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="card-outline" size={18} color={COLORS.primary} />
            <Text style={styles.infoText}>{activeOrder.paymentMethod}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={18} color={COLORS.primary} />
            <Text style={styles.infoText}>{activeOrder.date}</Text>
          </View>
        </View>

        {/* Items Summary Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Items Ordered</Text>

          {activeOrder.items?.map((i) => (
            <View key={i.id} style={styles.itemRow}>
              <Text style={styles.itemQty}>{i.quantity}x</Text>
              <Text style={styles.itemName} numberOfLines={1}>
                {i.item.name}
              </Text>
              <Text style={styles.itemPrice}>Rs. {i.item.price * i.quantity}</Text>
            </View>
          ))}

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Paid</Text>
            <Text style={styles.totalVal}>Rs. {activeOrder.total}</Text>
          </View>
        </View>

        {/* Back to Home Button */}
        <TouchableOpacity
          style={styles.homeBtn}
          onPress={() => navigation.navigate('HomeTab')}
        >
          <Ionicons name="home-outline" size={20} color={COLORS.white} />
          <Text style={styles.homeBtnText}>Back to Home Screen</Text>
        </TouchableOpacity>
      </ScrollView>
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
  },
  scrollContent: {
    padding: SPACING.md,
    gap: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  statusHeaderCard: {
    backgroundColor: COLORS.secondary,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  orderIdBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: SPACING.md,
    paddingVertical: 4,
    borderRadius: RADIUS.round,
    marginBottom: SPACING.xs,
  },
  orderIdText: {
    color: COLORS.accent,
    fontSize: 13,
    fontWeight: '800',
  },
  statusTitle: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: '900',
    marginVertical: SPACING.xs,
  },
  timeEstimate: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    fontWeight: '600',
  },
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  timelineContainer: {
    paddingLeft: SPACING.xs,
  },
  timelineStepRow: {
    flexDirection: 'row',
  },
  leftColumn: {
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  stepDot: {
    width: 28,
    height: 28,
    borderRadius: RADIUS.round,
    backgroundColor: COLORS.divider,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepDotDone: {
    backgroundColor: COLORS.success,
  },
  stepDotCurrent: {
    backgroundColor: COLORS.primary,
    borderWidth: 3,
    borderColor: COLORS.primaryLight,
  },
  connectingLine: {
    width: 2,
    height: 36,
    backgroundColor: COLORS.divider,
    marginVertical: 2,
  },
  connectingLineDone: {
    backgroundColor: COLORS.success,
  },
  rightColumn: {
    flex: 1,
    paddingBottom: SPACING.md,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  stepTitleDone: {
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
  stepTitleCurrent: {
    color: COLORS.primary,
    fontWeight: '800',
  },
  stepDesc: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  simulateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.xs,
    backgroundColor: COLORS.secondaryLight,
    paddingVertical: SPACING.sm + 2,
    borderRadius: RADIUS.md,
    marginTop: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  simulateBtnText: {
    color: COLORS.secondary,
    fontSize: 13,
    fontWeight: '700',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.xs + 2,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  itemQty: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primary,
    width: 28,
  },
  itemName: {
    fontSize: 14,
    color: COLORS.textPrimary,
    flex: 1,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.secondary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.sm,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  totalVal: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.secondary,
  },
  homeBtn: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: RADIUS.md,
    gap: SPACING.xs,
    marginTop: SPACING.xs,
    ...SHADOWS.medium,
  },
  homeBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default OrderTrackingScreen;
