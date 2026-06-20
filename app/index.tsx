import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { colors, spacing, typography } from '../theme';

export default function WelcomeScreen() {
  return (
    <LinearGradient
      colors={[colors.primary, colors.primaryDark]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safe}>
        <View style={styles.content}>
          <View style={styles.logoWrap}>
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.logo}
              contentFit="contain"
            />
          </View>

          <Text style={styles.title}>ABS World Wide (Pvt) Ltd</Text>
          <Text style={styles.tagline}>Breaking Barriers, Building Financial Bridges, Empowering Pakistan.</Text>

          <View style={styles.featureList}>
            <Feature text="Make your payments through ABS." />
            <Feature text="Pay securely via banks, digital wallets and all other platforms including IBFT facility." />
            <Feature text="Clients can pay cash on UBL counters all over Pakistan." />
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            label="Get Started"
            variant="secondary"
            onPress={() => router.push('/onboarding')}
          />
          <Text style={styles.footerNote}>
            By continuing you agree to ABS World Wide (Pvt) Ltd's Terms & Privacy Policy
          </Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <View style={styles.featureRow}>
      <View style={styles.dot} />
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safe: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrap: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    padding: spacing.md,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  title: {
    ...typography.h1,
    color: colors.textOnPrimary,
    textAlign: 'center',
  },
  tagline: {
    ...typography.body,
    color: '#C7D6E6',
    textAlign: 'center',
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
  },
  featureList: {
    width: '100%',
    gap: spacing.md,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
    marginTop: 6,
  },
  featureText: {
    ...typography.body,
    color: '#E2EBF4',
    flex: 1,
  },
  footer: {
    paddingBottom: spacing.lg,
    gap: spacing.md,
  },
  footerNote: {
    ...typography.caption,
    color: '#9FB3C8',
    textAlign: 'center',
  },
});
