import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../theme';

interface ScreenContainerProps {
  children: React.ReactNode;
  scroll?: boolean;
  style?: ViewStyle;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
}

export function ScreenContainer({
  children,
  scroll = true,
  style,
  edges = ['top', 'bottom'],
}: ScreenContainerProps) {
  const Content = scroll ? ScrollView : View;
  const contentProps = scroll
    ? { contentContainerStyle: [styles.content, style], showsVerticalScrollIndicator: false }
    : { style: [styles.content, { flex: 1 }, style] };

  return (
    <SafeAreaView style={styles.safe} edges={edges}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* @ts-ignore - dynamic component props */}
        <Content {...contentProps}>{children}</Content>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
  },
});
