import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { PageHeader } from '../../components/PageHeader';
import { ScreenContainer } from '../../components/ScreenContainer';
import { paymentMethods } from '../../constants/data';
import { useAppContext } from '../../context/AppContext';
import { colors, radius, spacing, typography } from '../../theme';
import { formatDisplayDate } from '../../utils/format';

export default function PaymentReviewScreen() {
  const { profile, pendingPayment, addPaymentRecord, resetPendingPayment } = useAppContext();
  const method = paymentMethods.find((m) => m.id === pendingPayment.method);
  const [submitting, setSubmitting] = useState(false);

  const handleConfirm = () => {
    setSubmitting(true);
    setTimeout(() => {
      const id = `TXN-${Math.floor(100000 + Math.random() * 900000)}`;
      addPaymentRecord({
        id,
        service: pendingPayment.service || 'General Payment',
        amount: pendingPayment.amount,
        method: pendingPayment.method ?? 'bank',
        date: new Date().toISOString().split('T')[0],
        status: 'success',
        reference: id,
      });
      setSubmitting(false);
      resetPendingPayment();
      router.replace('/payment/success');
    }, 1200);
  };

  return (
    <ScreenContainer>
      <PageHeader title="Review & Confirm" subtitle="Step 3 of 3" />

      <Card style={styles.summaryCard}>
        <Text style={styles.amountLabel}>Amount to Pay</Text>
        <Text style={styles.amount}>Rs {pendingPayment.amount || '0'}</Text>
      </Card>

      <Card style={styles.detailsCard}>
        <DetailRow label="Service" value={pendingPayment.service || 'General Payment'} />
        <Divider />
        <DetailRow label="Payment Method" value={method?.label ?? '—'} />
        <Divider />
        {accountDetailLabel(method?.id) && (
          <>
            <DetailRow
              label={accountDetailLabel(method?.id) as string}
              value={maskAccount(pendingPayment.accountDetail, method?.id)}
            />
            <Divider />
          </>
        )}
        <DetailRow label="Payer Name" value={profile?.fullName ?? '—'} />
        <Divider />
        <DetailRow label="CNIC" value={profile?.cnic ?? '—'} />
        <Divider />
        <DetailRow label="Date" value={formatDisplayDate(new Date())} />
      </Card>

      <View style={styles.infoNote}>
        <Ionicons name="shield-checkmark-outline" size={18} color={colors.primary} />
        <Text style={styles.infoText}>
          Once confirmed, your payment status will be visible both in this app and
          on the ABS World Wide (Pvt) Ltd website under your account.
        </Text>
      </View>

      <Button
        label="Confirm & Pay"
        onPress={handleConfirm}
        loading={submitting}
        style={{ marginTop: spacing.sm }}
      />
    </ScreenContainer>
  );
}

function accountDetailLabel(methodId?: string) {
  switch (methodId) {
    case 'bank':
      return 'Account / IBAN';
    case 'card':
      return 'Card Number';
    case 'raast':
      return 'Raast ID (CNIC / Mobile)';
    case 'qr':
    case 'counter':
      return null;
    default:
      return 'Mobile Number';
  }
}

function maskAccount(value: string, methodId?: string) {
  if (!value) return '—';
  if (methodId === 'card') {
    const digits = value.replace(/\s/g, '');
    return `**** **** **** ${digits.slice(-4)}`;
  }
  return value;
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  summaryCard: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    marginBottom: spacing.lg,
  },
  amountLabel: {
    ...typography.small,
    color: '#C7D6E6',
    marginBottom: spacing.xs,
  },
  amount: {
    ...typography.h1,
    fontSize: 32,
    color: colors.textOnPrimary,
  },
  detailsCard: {
    marginBottom: spacing.lg,
    padding: 0,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
  },
  detailLabel: {
    ...typography.small,
    color: colors.textSecondary,
  },
  detailValue: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
  },
  infoNote: {
    flexDirection: 'row',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
    alignItems: 'flex-start',
  },
  infoText: {
    ...typography.caption,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 18,
  },
});
