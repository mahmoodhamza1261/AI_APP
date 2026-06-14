import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme';

interface SelectableCardProps {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  selected?: boolean;
  onPress?: () => void;
}

export function SelectableCard({
  title,
  subtitle,
  icon,
  selected,
  onPress,
}: SelectableCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        selected && styles.selected,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.iconWrap}>{icon}</View>
      <View style={styles.textWrap}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected ? (
          <Ionicons name="checkmark" size={14} color={colors.textOnPrimary} />
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  selected: {
    borderColor: colors.primary,
    backgroundColor: '#F0F5FA',
  },
  pressed: {
    opacity: 0.85,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.small,
    color: colors.textSecondary,
    marginTop: 2,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: radius.full,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
});
