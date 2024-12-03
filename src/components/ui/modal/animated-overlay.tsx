import { theme } from "@/styles/theme";
import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";

export interface AnimatedOverlayProps {
  isVisible: boolean;
  onPress?: () => void;
  duration?: number;
  backgroundColor?: string;
}

export function AnimatedOverlay({
  isVisible,
  onPress,
  duration = 300,
  backgroundColor = theme.color.gray["064"],
}: AnimatedOverlayProps) {
  const [fadeAnimation] = useState(new Animated.Value(0));
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowOverlay(true);
      Animated.timing(fadeAnimation, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnimation, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }).start(() => setShowOverlay(false));
    }
  }, [isVisible]);

  if (!showOverlay) return null;

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={StyleSheet.absoluteFill}
      onPress={onPress}
    >
      <Animated.View
        style={[{ flex: 1 }, { backgroundColor, opacity: fadeAnimation }]}
      />
    </TouchableOpacity>
  );
}
