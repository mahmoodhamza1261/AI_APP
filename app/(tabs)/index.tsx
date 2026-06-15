import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from '../../components/Card';
import { ScreenContainer } from '../../components/ScreenContainer';
import { useAppContext } from '../../context/AppContext';
import { paymentMethods, services } from '../../constants/data';
import { colors, radius, spacing, typography } from '../../theme';

export default function HomeScreen() {
  const { profile, paymentHistory, resetPendingPayment } = useAppContext();
  const firstName = profile?.fullName?.split(' ')[0] ?? 'there';
  const recent = paymentHistory.slice(0, 3);

  const startPayment = () => {
    resetPendingPayment();
    router.push('/payment/method');
  };

  return (
    <ScreenContainer>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.name}>{firstName}</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{firstName.charAt(0).toUpperCase()}</Text>
        </View>
      </View>

      <LinearGradient
        colors={[colors.primary, colors.primaryLight]}
        style={styles.payCard}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.payCardLabel}>Need to make a payment?</Text>
          <Text style={styles.payCardTitle}>Pay for ABS services securely</Text>
          <Pressable style={styles.payButton} onPress={startPayment}>
            <Text style={styles.payButtonText}>Make a Payment</Text>
            <Ionicons name="arrow-forward" size={16} color={colors.primary} />
          </Pressable>
        </View>
        <Ionicons name="card" size={64} color="rgba(255,255,255,0.18)" style={styles.payCardIcon} />
      </LinearGradient>

      <Text style={styles.sectionTitle}>Pay With</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.methodsRow}
      >
        {paymentMethods.map((m) => (
          <View key={m.id} style={styles.methodChip}>
            <View style={[styles.methodIcon, { backgroundColor: `${m.color}1A` }]}>
              <Ionicons name={m.icon} size={20} color={m.color} />
            </View>
            <Text style={styles.methodLabel} numberOfLines={1}>
              {m.label}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <Pressable onPress={() => router.push('/(tabs)/history')}>
          <Text style={styles.seeAll}>See all</Text>
        </Pressable>
      </View>

      {recent.map((item) => (
        <Card key={item.id} style={styles.historyCard}>
          <View style={styles.historyRow}>
            <View style={styles.historyIcon}>
              <Ionicons name="receipt-outline" size={18} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.historyTitle}>{item.service}</Text>
              <Text style={styles.historyDate}>{item.date}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.historyAmount}>Rs {item.amount}</Text>
              <StatusBadge status={item.status} />
            </View>
          </View>
        </Card>
      ))}

      <Text style={styles.sectionTitle}>Our Services</Text>
      <View style={styles.servicesGrid}>
        {services.slice(0, 4).map((s) => (
          <Card key={s.id} style={styles.serviceCard}>
            <View style={styles.serviceIcon}>
              <Ionicons name={s.icon} size={20} color={colors.primary} />
            </View>
            <Text style={styles.serviceTitle}>{s.title}</Text>
          </Card>
        ))}
      </View>
    </ScreenContainer>
  );
}

function StatusBadge({ status }: { status: 'success' | 'pending' | 'failed' }) {
  const map = {
    success: { bg: colors.successLight, color: colors.success, label: 'Paid' },
    pending: { bg: '#FEF3E2', color: colors.warning, label: 'Pending' },
    failed: { bg: colors.dangerLight, color: colors.danger, label: 'Failed' },
  };
  const s = map[status];
  return (
    <View style={[styles.badge, { backgroundColor: s.bg }]}>
      <Text style={[styles.badgeText, { color: s.color }]}>{s.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  greeting: {
    ...typography.body,
    color: colors.textSecondary,
  },
  name: {
    ...typography.h1,
    color: colors.textPrimary,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.textOnPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  payCard: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  payCardLabel: {
    ...typography.small,
    color: '#C7D6E6',
    marginBottom: spacing.xs,
  },
  payCardTitle: {
    ...typography.h3,
    color: colors.textOnPrimary,
    marginBottom: spacing.md,
  },
  payButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    alignSelf: 'flex-start',
  },
  payButtonText: {
    ...typography.bodyBold,
    color: colors.primary,
  },
  payCardIcon: {
    position: 'absolute',
    right: -10,
    bottom: -10,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seeAll: {
    ...typography.small,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  methodsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
    paddingRight: spacing.md,
  },
  methodChip: {
    alignItems: 'center',
    gap: spacing.xs,
    width: 76,
  },
  methodIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  historyCard: {
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  historyIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyTitle: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  historyDate: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  historyAmount: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.sm,
    marginTop: spacing.xs,
  },
  badgeText: {
    ...typography.caption,
    fontWeight: '700',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  serviceCard: {
    width: '47%',
    alignItems: 'flex-start',
    padding: spacing.md,
  },
  serviceIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  serviceTitle: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    fontSize: 13,
  },
});
