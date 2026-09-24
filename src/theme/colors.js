// Theme color constants and layout utilities for QuickBite Campus Food Ordering App

export const COLORS = {
  primary: '#FF6B35',       // Warm vibrant orange
  primaryDark: '#E85A24',   // Darker orange for active/pressed states
  primaryLight: '#FFECE5',  // Soft orange tint for badges and backgrounds
  secondary: '#004E89',     // Deep campus blue
  secondaryLight: '#E6F0FA',// Light blue tint
  accent: '#F7C59F',        // Soft peach accent
  background: '#F8F9FA',    // Clean light grey background
  cardBg: '#FFFFFF',        // Pure white card background
  textPrimary: '#1E293B',   // Dark slate text
  textSecondary: '#64748B', // Medium slate grey text
  textMuted: '#94A3B8',     // Light slate text
  border: '#E2E8F0',        // Subtle border grey
  divider: '#F1F5F9',       // Divider grey
  success: '#10B981',       // Green for orders / confirmed status
  successLight: '#D1FAE5',  // Light green badge background
  warning: '#F59E0B',       // Amber for preparing status
  warningLight: '#FEF3C7',  // Light amber badge
  danger: '#EF4444',        // Red for remove / delete / errors
  dangerLight: '#FEE2E2',   // Light red badge background
  white: '#FFFFFF',
  black: '#000000',
  starYellow: '#FFB800',    // Rating star yellow
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const RADIUS = {
  sm: 6,
  md: 12,
  lg: 16,
  xl: 24,
  round: 999,
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
};
