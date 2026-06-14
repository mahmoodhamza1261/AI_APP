import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../theme';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  showBack?: boolean;
  right?: React.ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  onBack,
  showBack = true,
  right,
}: PageHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {showBack ? (
          <Pressable
            onPress={onBack ?? (() => router.back())}
            style={styles.backButton}
            hitSlop={8}
          >
            <Ionicons name="chevron-back" size={22} color={colors.primary} />
          </Pressable>
        ) : (
          <View style={styles.backButton} />
        )}
        <View style={styles.titleWrap}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        <View style={styles.right}>{right}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  titleWrap: {
    flex: 1,
    marginLeft: spacing.md,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.small,
    color: colors.textSecondary,
    marginTop: 2,
  },
  right: {
    minWidth: 40,
    alignItems: 'flex-end',
  },
});
