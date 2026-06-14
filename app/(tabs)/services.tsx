import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Card } from '../../components/Card';
import { ScreenContainer } from '../../components/ScreenContainer';
import { services } from '../../constants/data';
import { useAppContext } from '../../context/AppContext';
import { colors, radius, spacing, typography } from '../../theme';

export default function ServicesScreen() {
  const { resetPendingPayment, setPendingPayment } = useAppContext();

  const handlePay = (serviceTitle: string) => {
    resetPendingPayment();
    setPendingPayment({ service: serviceTitle });
    router.push('/payment/method');
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Our Services</Text>
      <Text style={styles.subtitle}>
        Explore ABS World Wide's full range of business solutions
      </Text>

      {services.map((s) => (
        <Card key={s.id} style={styles.card}>
          <View style={styles.row}>
            <View style={styles.icon}>
              <Ionicons name={s.icon} size={22} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{s.title}</Text>
              <Text style={styles.cardDescription}>{s.description}</Text>
            </View>
          </View>
          <Pressable style={styles.payLink} onPress={() => handlePay(s.title)}>
            <Text style={styles.payLinkText}>Pay for this service</Text>
            <Ionicons name="arrow-forward" size={14} color={colors.primary} />
          </Pressable>
        </Card>
      ))}
    </ScreenContainer>
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
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  cardDescription: {
    ...typography.small,
    color: colors.textSecondary,
  },
  payLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
  },
  payLinkText: {
    ...typography.small,
    color: colors.primary,
    fontWeight: '700',
  },
});
