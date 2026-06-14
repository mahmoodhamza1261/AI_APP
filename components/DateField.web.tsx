import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../theme';

interface DateFieldProps {
  label: string;
  value: Date | null;
  onChange: (date: Date) => void;
  error?: string;
  maximumDate?: Date;
  initialDate?: Date;
}

function toInputValue(date: Date | null): string {
  if (!date) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function DateField({ label, value, onChange, error, maximumDate }: DateFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {/* @ts-ignore - native HTML input on web platform */}
      <input
        type="date"
        value={toInputValue(value)}
        max={maximumDate ? toInputValue(maximumDate) : undefined}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const raw = event.target.value;
          if (!raw) return;
          const [year, month, day] = raw.split('-').map(Number);
          onChange(new Date(year, month - 1, day));
        }}
        style={{
          height: 52,
          borderRadius: 12,
          border: `1px solid ${error ? colors.danger : colors.border}`,
          paddingLeft: spacing.md,
          paddingRight: spacing.md,
          fontSize: 15,
          color: value ? colors.textPrimary : colors.textMuted,
          backgroundColor: colors.surface,
          width: '100%',
          boxSizing: 'border-box',
          fontFamily: 'inherit',
          outline: 'none',
        }}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.small,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    fontWeight: '600',
  },
  errorText: {
    ...typography.caption,
    color: colors.danger,
    marginTop: spacing.xs,
  },
});
