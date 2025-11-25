import React, { useMemo } from "react";
import { Pressable, StyleSheet, View, Animated } from "react-native";
import { useAppTheme } from "@/design/theme/ThemeProvider";
import { ThemedText } from "@/components/ThemedText";
import { radii, spacing, shadowPresets, borders } from "@/styles/designTokens";
import { getAppButtonPalette } from "@/styles/components/appButtonTokens";
import { useAnimationSettings } from "@/contexts/AnimationSettingsContext";

type ToggleOption<TValue extends string> = {
  label: string;
  value: TValue;
};

type TogglePillProps<TValue extends string> = {
  options: ToggleOption<TValue>[];
  value: TValue;
  onChange: (value: TValue) => void;
  disabled?: boolean;
  caption?: string;
};

export function TogglePill<TValue extends string>({
  options,
  value,
  onChange,
  disabled = false,
  caption,
}: TogglePillProps<TValue>) {
  const { tokens, mode } = useAppTheme();
  const { animationsEnabled } = useAnimationSettings();
  const buttonPalette = useMemo(() => getAppButtonPalette(mode), [mode]);
  const activeIndex = options.findIndex((option) => option.value === value);
  const [containerWidth, setContainerWidth] = React.useState(0);
  const animatedValue = useMemo(
    () => new Animated.Value(activeIndex),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  React.useEffect(() => {
    if (animationsEnabled) {
      Animated.spring(animatedValue, {
        toValue: activeIndex,
        useNativeDriver: true, // Use native driver for better performance
        damping: 15,
        stiffness: 150,
        mass: 0.8,
      }).start();
    } else {
      // Immediately set to target value without animation
      animatedValue.setValue(activeIndex);
    }
  }, [activeIndex, animatedValue, animationsEnabled]);

  const gapSize = spacing.sm;
  const thumbWidth = React.useMemo(() => {
    if (containerWidth === 0) return 0;
    return (containerWidth - gapSize * (options.length - 1)) / options.length;
  }, [containerWidth, options.length, gapSize]);

  const translateX = React.useMemo(() => {
    return animatedValue.interpolate({
      inputRange: options.map((_, idx) => idx),
      outputRange: options.map((_, idx) => {
        if (containerWidth === 0) return 0;
        const width =
          (containerWidth - gapSize * (options.length - 1)) / options.length;
        return idx * (width + gapSize);
      }),
    });
  }, [animatedValue, containerWidth, options.length, gapSize]);

  return (
    <View style={styles.wrapper}>
      {caption && (
        <ThemedText style={[styles.caption, { color: tokens.pillCaptionText }]}>
          {caption}
        </ThemedText>
      )}
      <View
        style={[styles.container, { opacity: disabled ? 0.6 : 1 }]}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          if (width > 0) {
            setContainerWidth(width);
          }
        }}
      >
        {containerWidth > 0 && thumbWidth > 0 && (
          <Animated.View
            pointerEvents="none"
            style={[
              styles.activeThumb,
              {
                width: thumbWidth,
                transform: [{ translateX }],
                backgroundColor: tokens.pillActiveBackground,
                shadowColor: tokens.pillShadow,
              },
            ]}
          />
        )}
        {options.map((option, index) => {
          const isActive = option.value === value;
          return (
            <Pressable
              key={option.value}
              style={[
                styles.option,
                {
                  backgroundColor: isActive
                    ? tokens.pillActiveBackground
                    : buttonPalette.background,
                  borderColor: isActive
                    ? tokens.pillActiveBorder
                    : buttonPalette.border,
                  shadowColor: isActive ? tokens.pillShadow : undefined,
                },
                isActive && shadowPresets.soft,
              ]}
              accessibilityRole="button"
              accessibilityState={{ disabled, selected: isActive }}
              onPress={() => {
                if (disabled || isActive) {
                  return;
                }
                onChange(option.value);
              }}
              disabled={disabled || isActive}
            >
              <ThemedText
                style={[
                  styles.optionLabel,
                  {
                    color: isActive
                      ? tokens.pillActiveText
                      : buttonPalette.text,
                  },
                ]}
              >
                {option.label}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    alignItems: "center",
    gap: spacing.sm,
  },
  caption: {
    fontSize: 12,
    fontWeight: "500",
    opacity: 0.7,
    textAlign: "center",
  },
  container: {
    width: "100%",
    flexDirection: "row",
    gap: spacing.sm,
    backgroundColor: "transparent",
  },
    activeThumb: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      borderRadius: radii.pill,
      ...shadowPresets.floating,
    },
  option: {
    flex: 1,
    borderRadius: radii.pill,
    borderWidth: borders.hairline,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
  optionLabel: {
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
});

export default TogglePill;
