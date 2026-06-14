import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/Button';
import { PageHeader } from '../../components/PageHeader';
import { ScreenContainer } from '../../components/ScreenContainer';
import { SelectableCard } from '../../components/SelectableCard';
import { paymentMethods } from '../../constants/data';
import { PaymentMethodId, useAppContext } from '../../context/AppContext';
import { colors, spacing, typography } from '../../theme';

export default function PaymentMethodScreen() {
  const { pendingPayment, setPendingPayment } = useAppContext();
  const [selected, setSelected] = useState<PaymentMethodId | null>(pendingPayment.method);

  const handleNext = () => {
    if (!selected) return;
    setPendingPayment({ method: selected });
    router.push('/payment/details');
  };

  return (
    <ScreenContainer>
      <PageHeader title="Select Payment Method" subtitle="Step 1 of 3" />

      {pendingPayment.service ? (
        <View style={styles.serviceBanner}>
          <Ionicons name="briefcase-outline" size={18} color={colors.primary} />
          <Text style={styles.serviceBannerText}>{pendingPayment.service}</Text>
        </View>
      ) : null}

      <Text style={styles.label}>Choose how you'd like to pay</Text>

      {paymentMethods.map((method) => (
        <SelectableCard
          key={method.id}
          title={method.label}
          subtitle={method.description}
          selected={selected === method.id}
          onPress={() => setSelected(method.id)}
          icon={
            <Ionicons
              name={method.icon}
              size={22}
              color={selected === method.id ? colors.primary : colors.textSecondary}
            />
          }
        />
      ))}

      <Button
        label="Continue"
        onPress={handleNext}
        disabled={!selected}
        style={{ marginTop: spacing.lg }}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  serviceBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  serviceBannerText: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  label: {
    ...typography.small,
    color: colors.textSecondary,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
});
