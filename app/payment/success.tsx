import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { ScreenContainer } from '../../components/ScreenContainer';
import { useAppContext } from '../../context/AppContext';
import { colors, spacing, typography } from '../../theme';

export default function PaymentSuccessScreen() {
  const { paymentHistory } = useAppContext();
  const latest = paymentHistory[0];

  return (
    <ScreenContainer scroll={false}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name="checkmark" size={48} color={colors.textOnPrimary} />
        </View>

        <Text style={styles.title}>Payment Successful</Text>
        <Text style={styles.subtitle}>
          Your payment has been received and recorded against your ABS World Wide (Pvt) Ltd
          account.
        </Text>

        {latest ? (
          <Card style={styles.card}>
            <DetailRow label="Amount" value={`Rs ${latest.amount}`} />
            <Divider />
            <DetailRow label="Reference No." value={latest.reference} />
            <Divider />
            <DetailRow label="Service" value={latest.service} />
            <Divider />
            <DetailRow label="Date" value={latest.date} />
          </Card>
        ) : null}
      </View>

      <View style={styles.footer}>
        <Button
          label="View Payment History"
          variant="outline"
          onPress={() => router.replace('/(tabs)/history')}
        />
        <Button label="Back to Home" onPress={() => router.replace('/(tabs)')} />
      </View>
    </ScreenContainer>
  );
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
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  card: {
    width: '100%',
    padding: 0,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  footer: {
    gap: spacing.md,
    paddingBottom: spacing.lg,
  },
});
