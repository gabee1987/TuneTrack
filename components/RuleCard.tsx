import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";

interface RuleCardProps {
  title: string;
  content: string[];
}

/**
 * A reusable card component for displaying game rules.
 */
export default function RuleCard({ title, content }: RuleCardProps) {
  return (
    <View style={styles.cardContainer}>
      <ThemedText type="title" style={styles.cardTitle}>
        {title}
      </ThemedText>
      {content.map((paragraph, index) => (
        <ThemedText type="default" key={index} style={styles.cardText}>
          {paragraph}
        </ThemedText>
      ))}
    </View>
  );
}

// -- STYLES --
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#ffffff88", // Slightly transparent white
    borderRadius: 10,
    padding: 15,
    marginBottom: 25,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#222",
  },
  cardText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 6,
    color: "#333",
  },
});
