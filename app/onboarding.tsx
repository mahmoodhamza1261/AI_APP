import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { DateField } from '../components/DateField';
import { ScreenContainer } from '../components/ScreenContainer';
import { TextField } from '../components/TextField';
import { useAppContext } from '../context/AppContext';
import { colors, spacing, typography } from '../theme';
import { formatCnic, isValidCnic, toIsoDate } from '../utils/format';

const TODAY = new Date();
const MIN_AGE_DATE = new Date();
MIN_AGE_DATE.setFullYear(MIN_AGE_DATE.getFullYear() - 18);

export default function OnboardingScreen() {
  const { setProfile } = useAppContext();

  const [fullName, setFullName] = useState('');
  const [cnic, setCnic] = useState('');
  const [dob, setDob] = useState<Date | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleCnicChange = (text: string) => {
    setCnic(formatCnic(text));
  };

  const handleContinue = () => {
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) newErrors.fullName = 'Please enter your full name';
    if (!isValidCnic(cnic)) newErrors.cnic = 'Enter a valid CNIC (e.g. 42101-1234567-1)';
    if (!dob) newErrors.dob = 'Please select your date of birth';
    else if (dob > MIN_AGE_DATE) newErrors.dob = 'You must be at least 18 years old';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setProfile({
      fullName: fullName.trim(),
      cnic,
      dateOfBirth: toIsoDate(dob as Date),
    });
    router.replace('/(tabs)');
  };

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
          contentFit="contain"
        />
        <Text style={styles.title}>Create Your Account</Text>
        <Text style={styles.subtitle}>
          Enter your details to get started with ABS World Wide (Pvt) Ltd
        </Text>
      </View>

      <TextField
        label="Full Name"
        placeholder="e.g. Ahmed Khan"
        value={fullName}
        onChangeText={setFullName}
        error={errors.fullName}
        leftIcon={<Ionicons name="person-outline" size={18} color={colors.textMuted} />}
        autoCapitalize="words"
      />

      <TextField
        label="CNIC Number"
        placeholder="42101-1234567-1"
        value={cnic}
        onChangeText={handleCnicChange}
        error={errors.cnic}
        leftIcon={<Ionicons name="card-outline" size={18} color={colors.textMuted} />}
        keyboardType="number-pad"
        maxLength={15}
      />

      <DateField
        label="Date of Birth"
        value={dob}
        onChange={setDob}
        error={errors.dob}
        maximumDate={TODAY}
        initialDate={MIN_AGE_DATE}
      />

      <Button label="Continue" onPress={handleContinue} style={{ marginTop: spacing.sm }} />

      <Text style={styles.disclaimer}>
        Your information is securely encrypted and used only for account
        verification and payment processing.
      </Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logo: {
    width: 72,
    height: 72,
    marginBottom: spacing.md,
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
    marginTop: spacing.xs,
  },
  disclaimer: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.lg,
    lineHeight: 18,
  },
});
