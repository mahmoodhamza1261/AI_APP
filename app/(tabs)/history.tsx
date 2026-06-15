import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from '../../components/Card';
import { ScreenContainer } from '../../components/ScreenContainer';
import { paymentMethods } from '../../constants/data';
import { PaymentRecord, useAppContext } from '../../context/AppContext';
import { colors, radius, spacing, typography } from '../../theme';

const statusMap = {
  success: { bg: '#E3F8EF', color: colors.success, label: 'Successful' },
  pending: { bg: '#FEF3E2', color: colors.warning, label: 'Pending' },
  failed: { bg: colors.dangerLight, color: colors.danger, label: 'Failed' },
};

export default function HistoryScreen() {
  const { paymentHistory } = useAppContext();

  return (
    <ScreenContainer>
      <Text style={styles.title}>Payment History</Text>
      <Text style={styles.subtitle}>
        All your transactions, synced with your ABS World Wide (Pvt) Ltd account
      </Text>

      {paymentHistory.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="receipt-outline" size={40} color={colors.textMuted} />
          <Text style={styles.emptyText}>No payments yet</Text>
        </View>
      ) : (
        paymentHistory.map((item) => <TransactionCard key={item.id} item={item} />)
      )}
    </ScreenContainer>
  );
}

function TransactionCard({ item }: { item: PaymentRecord }) {
  const method = paymentMethods.find((m) => m.id === item.method);
  const status = statusMap[item.status];

  return (
    <Card style={styles.card}>
      <View style={styles.row}>
        <View style={[styles.icon, { backgroundColor: `${method?.color}1A` }]}>
          <Ionicons name={method?.icon ?? 'card-outline'} size={20} color={method?.color} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.serviceText}>{item.service}</Text>
          <Text style={styles.metaText}>
            {item.date} • {method?.label}
          </Text>
        </View>
        <Text style={styles.amountText}>Rs {item.amount}</Text>
      </View>

      <View style={styles.footerRow}>
        <Text style={styles.refText}>Ref: {item.reference}</Text>
        <View style={[styles.badge, { backgroundColor: status.bg }]}>
          <Text style={[styles.badgeText, { color: status.color }]}>{status.label}</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    ...typography.h1,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  card: {
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceText: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  metaText: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  amountText: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
  },
  refText: {
    ...typography.caption,
    color: colors.textMuted,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  badgeText: {
    ...typography.caption,
    fontWeight: '700',
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
    gap: spacing.sm,
  },
  emptyText: {
    ...typography.body,
    color: colors.textMuted,
  },
});
