import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { PageHeader } from '../../components/PageHeader';
import { ScreenContainer } from '../../components/ScreenContainer';
import { TextField } from '../../components/TextField';
import { paymentMethods } from '../../constants/data';
import { useAppContext } from '../../context/AppContext';
import { colors, radius, spacing, typography } from '../../theme';

export default function PaymentDetailsScreen() {
  const { pendingPayment, setPendingPayment } = useAppContext();
  const method = paymentMethods.find((m) => m.id === pendingPayment.method);

  const [amount, setAmount] = useState(pendingPayment.amount);
  const [accountDetail, setAccountDetail] = useState(pendingPayment.accountDetail);
  const [extra, setExtra] = useState({ expiry: '', cvv: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const isWallet = method?.id === 'easypaisa' || method?.id === 'jazzcash';
  const isCard = method?.id === 'card';
  const isBank = method?.id === 'bank';

  const accountLabel = isBank
    ? 'Bank Account / IBAN Number'
    : isCard
    ? 'Card Number'
    : 'Mobile Number';

  const accountPlaceholder = isBank
    ? 'PK00 BANK 0000 0000 0000 0000'
    : isCard
    ? '4242 4242 4242 4242'
    : '03XX-XXXXXXX';

  const handleNext = () => {
    const newErrors: { [key: string]: string } = {};

    if (!amount.trim() || isNaN(Number(amount.replace(/,/g, '')))) {
      newErrors.amount = 'Enter a valid amount';
    }
    if (!accountDetail.trim()) {
      newErrors.accountDetail = `Please enter your ${accountLabel.toLowerCase()}`;
    }
    if (isCard) {
      if (!extra.expiry.trim()) newErrors.expiry = 'Required';
      if (!extra.cvv.trim()) newErrors.cvv = 'Required';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setPendingPayment({ amount, accountDetail });
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

      <TextField
        label="Amount (PKR)"
        placeholder="e.g. 15,000"
        value={amount}
        onChangeText={setAmount}
        error={errors.amount}
        keyboardType="numeric"
        leftIcon={<Text style={styles.currencyPrefix}>Rs</Text>}
      />

      <TextField
        label={accountLabel}
        placeholder={accountPlaceholder}
        value={accountDetail}
        onChangeText={setAccountDetail}
        error={errors.accountDetail}
        keyboardType={isBank || isCard ? 'default' : 'phone-pad'}
        leftIcon={
          <Ionicons
            name={isBank ? 'business-outline' : isCard ? 'card-outline' : 'call-outline'}
            size={18}
            color={colors.textMuted}
          />
        }
      />

      {isCard && (
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <TextField
              label="Expiry (MM/YY)"
              placeholder="12/28"
              value={extra.expiry}
              onChangeText={(v) => setExtra((e) => ({ ...e, expiry: v }))}
              error={errors.expiry}
              keyboardType="numeric"
              maxLength={5}
            />
          </View>
          <View style={{ flex: 1 }}>
            <TextField
              label="CVV"
              placeholder="123"
              value={extra.cvv}
              onChangeText={(v) => setExtra((e) => ({ ...e, cvv: v }))}
              error={errors.cvv}
              keyboardType="numeric"
              maxLength={3}
              secureTextEntry
            />
          </View>
        </View>
      )}

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
  currencyPrefix: {
    ...typography.bodyBold,
    color: colors.textSecondary,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
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
