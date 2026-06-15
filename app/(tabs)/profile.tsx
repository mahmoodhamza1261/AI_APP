import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Card } from '../../components/Card';
import { ScreenContainer } from '../../components/ScreenContainer';
import { useAppContext } from '../../context/AppContext';
import { colors, radius, spacing, typography } from '../../theme';
import { formatDisplayDate } from '../../utils/format';

export default function ProfileScreen() {
  const { profile, clearProfile } = useAppContext();

  const dobDisplay = profile ? formatDisplayDate(new Date(profile.dateOfBirth)) : '—';

  const handleLogout = () => {
    clearProfile();
    router.replace('/');
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Profile</Text>

      <Card style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {profile?.fullName?.charAt(0).toUpperCase() ?? 'A'}
          </Text>
        </View>
        <Text style={styles.name}>{profile?.fullName ?? 'ABS User'}</Text>
        <Text style={styles.email}>Account verified with CNIC</Text>
      </Card>

      <Text style={styles.sectionTitle}>Personal Information</Text>
      <Card style={styles.infoCard}>
        <InfoRow icon="person-outline" label="Full Name" value={profile?.fullName ?? '—'} />
        <Divider />
        <InfoRow icon="card-outline" label="CNIC Number" value={profile?.cnic ?? '—'} />
        <Divider />
        <InfoRow icon="calendar-outline" label="Date of Birth" value={dobDisplay} />
      </Card>

      <Text style={styles.sectionTitle}>Settings</Text>
      <Card style={styles.infoCard}>
        <MenuRow icon="notifications-outline" label="Notifications" />
        <Divider />
        <MenuRow icon="shield-checkmark-outline" label="Security & Privacy" />
        <Divider />
        <MenuRow icon="help-circle-outline" label="Help & Support" />
        <Divider />
        <MenuRow icon="information-circle-outline" label="About ABS World Wide (Pvt) Ltd" />
      </Card>

      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={18} color={colors.danger} />
        <Text style={styles.logoutText}>Log Out</Text>
      </Pressable>
    </ScreenContainer>
  );
}

function InfoRow({ icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIcon}>
        <Ionicons name={icon} size={18} color={colors.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

function MenuRow({ icon, label }: { icon: any; label: string }) {
  return (
    <Pressable style={styles.menuRow}>
      <View style={styles.infoIcon}>
        <Ionicons name={icon} size={18} color={colors.primary} />
      </View>
      <Text style={styles.menuLabel}>{label}</Text>
      <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
    </Pressable>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  title: {
    ...typography.h1,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  profileCard: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  avatarText: {
    color: colors.textOnPrimary,
    fontSize: 24,
    fontWeight: '700',
  },
  name: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  email: {
    ...typography.small,
    color: colors.textSecondary,
    marginTop: 2,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  infoCard: {
    marginBottom: spacing.lg,
    padding: 0,
    overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
  },
  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoLabel: {
    ...typography.caption,
    color: colors.textMuted,
  },
  infoValue: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    marginTop: 2,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
  },
  menuLabel: {
    ...typography.body,
    color: colors.textPrimary,
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: spacing.md + 36 + spacing.md,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    marginBottom: spacing.xl,
  },
  logoutText: {
    ...typography.bodyBold,
    color: colors.danger,
  },
});
