import React from "react";
import {TouchableOpacity,Text,StyleSheet,} from "react-native";
export default function AppButton({title,onPress,disabled,color = "#2563eb",}) 
{
  return (
    <TouchableOpacity
      style={[styles.button,{backgroundColor: disabled ? "#9ca3af": color,}, ]}onPress={onPress} disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 8,
  },

  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});