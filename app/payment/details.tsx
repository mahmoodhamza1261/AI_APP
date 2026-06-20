import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { PageHeader } from '../../components/PageHeader';
import { ScreenContainer } from '../../components/ScreenContainer';
import { TextField } from '../../components/TextField';
import { banks, paymentMethods, wallets } from '../../constants/data';
import { useAppContext } from '../../context/AppContext';
import { colors, radius, spacing, typography } from '../../theme';

export default function PaymentDetailsScreen() {
  const { pendingPayment, setPendingPayment } = useAppContext();
  const method = paymentMethods.find((m) => m.id === pendingPayment.method);

  const [amount, setAmount] = useState(pendingPayment.amount);
  const [extra, setExtra] = useState<Record<string, string>>(pendingPayment.extraDetails ?? {});
  const [selectedBank, setSelectedBank] = useState(pendingPayment.accountDetail);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isForm = method?.id === 'abs-api' || method?.id === 'create-wallet';
  const isBankTransfer = method?.id === 'bank-transfer';
  const isQr = method?.id === 'qr';

  const setField = (key: string, value: string) =>
    setExtra((prev) => ({ ...prev, [key]: value }));

  const handleNext = () => {
    const newErrors: Record<string, string> = {};

    if (!amount.trim() || isNaN(Number(amount.replace(/,/g, '')))) {
      newErrors.amount = 'Enter a valid amount';
    }
    if (isForm) {
      if (!extra.name?.trim()) newErrors.name = 'Required';
      if (!extra.idCard?.trim()) newErrors.idCard = 'Required';
      if (!extra.phone?.trim()) newErrors.phone = 'Required';
    }
    if (isBankTransfer && !selectedBank) {
      newErrors.bank = 'Please select a bank or digital wallet';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setPendingPayment({ amount, accountDetail: selectedBank, extraDetails: extra });
    router.push('/payment/review');
  };

  return (
    <ScreenContainer>
      <PageHeader title="Payment Details" subtitle="Step 2 of 3" />

      <Card style={styles.methodCard}>
        <View style={[styles.methodIcon, { backgroundColor: `${method?.color}1A` }]}>
          <Ionicons name={method?.icon ?? 'card-outline'} size={20} color={method?.color} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.methodLabel}>{method?.label}</Text>
          {pendingPayment.service ? (
            <Text style={styles.methodSub}>{pendingPayment.service}</Text>
          ) : null}
        </View>
      </Card>

      {isForm && (
        <>
          <TextField
            label="Full Name"
            placeholder="Enter your full name"
            value={extra.name ?? ''}
            onChangeText={(v) => setField('name', v)}
            error={errors.name}
            leftIcon={<Ionicons name="person-outline" size={18} color={colors.textMuted} />}
          />
          <TextField
            label="ID Card No"
            placeholder="42101-1234567-1"
            value={extra.idCard ?? ''}
            onChangeText={(v) => setField('idCard', v)}
            error={errors.idCard}
            keyboardType="numeric"
            leftIcon={<Ionicons name="id-card-outline" size={18} color={colors.textMuted} />}
          />
          <TextField
            label="Telephone No"
            placeholder="03XX-XXXXXXX"
            value={extra.phone ?? ''}
            onChangeText={(v) => setField('phone', v)}
            error={errors.phone}
            keyboardType="phone-pad"
            leftIcon={<Ionicons name="call-outline" size={18} color={colors.textMuted} />}
          />
        </>
      )}

      {isBankTransfer && (
        <>
          <Text style={styles.groupLabel}>Select Bank</Text>
          {banks.map((b) => (
            <BankRow
              key={b.id}
              name={b.name}
              icon={b.icon}
              color={b.color}
              selected={selectedBank === b.name}
              onPress={() => setSelectedBank(b.name)}
            />
          ))}
          <Text style={styles.groupLabel}>Select Digital Wallet</Text>
          {wallets.map((w) => (
            <BankRow
              key={w.id}
              name={w.name}
              icon={w.icon}
              color={w.color}
              selected={selectedBank === w.name}
              onPress={() => setSelectedBank(w.name)}
            />
          ))}
          {errors.bank ? <Text style={styles.errorText}>{errors.bank}</Text> : null}
        </>
      )}

      {isQr && (
        <View style={styles.qrContainer}>
          <View style={styles.qrBox}>
            <Ionicons name="qr-code" size={200} color={colors.primary} />
          </View>
          <Text style={styles.qrLabel}>Scan to Pay</Text>
          <Text style={styles.qrSub}>
            Open any banking or wallet app, tap Scan QR, and scan this code to complete your payment.
          </Text>
        </View>
      )}

      <TextField
        label="Amount (PKR)"
        placeholder="e.g. 15,000"
        value={amount}
        onChangeText={setAmount}
        error={errors.amount}
        keyboardType="numeric"
        leftIcon={<Text style={styles.currencyPrefix}>Rs</Text>}
      />

      <View style={styles.infoNote}>
        <Ionicons name="information-circle-outline" size={16} color={colors.textSecondary} />
        <Text style={styles.infoText}>
          This payment will be recorded on your ABS World Wide (Pvt) Ltd account and synced
          with the website automatically.
        </Text>
      </View>

      <Button label="Continue" onPress={handleNext} style={{ marginTop: spacing.sm }} />
    </ScreenContainer>
  );
}

function BankRow({
  name,
  icon,
  color,
  selected,
  onPress,
}: {
  name: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={[styles.bankRow, selected && styles.bankRowSelected]}
      onPress={onPress}
    >
      <View style={[styles.bankIcon, { backgroundColor: `${color}1A` }]}>
        <Ionicons name={icon} size={18} color={color} />
      </View>
      <Text style={[styles.bankName, selected && styles.bankNameSelected]}>{name}</Text>
      {selected && <Ionicons name="checkmark-circle" size={20} color={colors.primary} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  methodIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodLabel: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  methodSub: {
    ...typography.small,
    color: colors.textSecondary,
    marginTop: 2,
  },
  groupLabel: {
    ...typography.small,
    color: colors.textSecondary,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  bankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    marginBottom: spacing.sm,
  },
  bankRowSelected: {
    borderColor: colors.primary,
    backgroundColor: '#EBF2FA',
  },
  bankIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bankName: {
    ...typography.body,
    color: colors.textPrimary,
    flex: 1,
  },
  bankNameSelected: {
    fontWeight: '700',
    color: colors.primary,
  },
  errorText: {
    ...typography.small,
    color: colors.danger,
    marginBottom: spacing.sm,
  },
  qrContainer: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
    marginBottom: spacing.md,
  },
  qrBox: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  qrLabel: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  qrSub: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },
  currencyPrefix: {
    ...typography.bodyBold,
    color: colors.textSecondary,
  },
  infoNote: {
    flexDirection: 'row',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  infoText: {
    ...typography.caption,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 18,
  },
});
