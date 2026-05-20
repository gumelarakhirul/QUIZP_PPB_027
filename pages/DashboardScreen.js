import React from "react";
import {View,Text,StyleSheet,} from "react-native";
import AppButton from "../components/AppButton";
export default function DashboardScreen({
  navigation,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>FindIt</Text>
      <Text style={styles.subtitle}>Aplikasi Lost & Found Kampus</Text>
      <AppButton title="Tambah Laporan" onPress={() => navigation.navigate( "Tambah Laporan")}
      />
      <AppButton title="List Barang" onPress={() => navigation.navigate( "List Barang")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#ffffff",
  },

  logo: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2563eb",
  },

  subtitle: {
    textAlign: "center",
    marginBottom: 30,
    color: "#374151",
  },
});