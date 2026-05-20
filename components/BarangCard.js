import React from "react";
import {View,Text,StyleSheet,TouchableOpacity,} from "react-native";
export default function BarangCard({item,onPress,}) 
{
  const isHilang =
  item.status === "Hilang";
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.row}>
        <Text style={styles.title}>{item.nama_barang}</Text>
        <Text
          style={[styles.status,{backgroundColor: isHilang ? "#ef4444" : "#22c55e",},]}>{item.status}
        </Text>
      </View>
      <Text>
        Pelapor: {item.nama_pelapor}
      </Text>
      <Text>
        Kategori: {item.kategori}
      </Text>
      <Text>
        Lokasi: {item.lokasi}
      </Text>
      <Text numberOfLines={2}>
        {item.deskripsi}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 3,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },

  status: {
    color: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: "bold",
  },
});