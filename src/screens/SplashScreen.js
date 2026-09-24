import React, { useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, useWindowDimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CartContext } from '../context/CartContext';
import { COLORS, RADIUS, SPACING } from '../theme/colors';

const SplashScreen = ({ navigation }) => {
  const { user } = useContext(CartContext);
  const { width } = useWindowDimensions();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigateToNext();
    }, 2000);

    return () => clearTimeout(timer);
  }, [user, navigation]);

  const navigateToNext = () => {
    try {
      if (user) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }
    } catch (err) {
      console.error('Splash navigation error:', err);
    }
  };

  const iconSize = width > 600 ? 100 : 80;

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={navigateToNext}
    >
      <View style={styles.content}>
        <View style={[styles.iconCircle, { width: iconSize + 40, height: iconSize + 40, borderRadius: (iconSize + 40) / 2 }]}>
          <Ionicons name="fast-food" size={iconSize} color={COLORS.white} />
        </View>

        <Text style={styles.appName}>QuickBite</Text>
        <Text style={styles.tagline}>Fast. Fresh. On Campus.</Text>
        <Text style={styles.subtitle}>University Campus Food Ordering</Text>

        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.white} />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Tap anywhere to continue • Version 1.0.0</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  iconCircle: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  appName: {
    fontSize: 42,
    fontWeight: '900',
    color: COLORS.white,
    letterSpacing: 1,
    marginBottom: SPACING.xs,
  },
  tagline: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.accent,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
  },
  loadingContainer: {
    marginTop: SPACING.xxl,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default SplashScreen;
