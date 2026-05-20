import React from "react";
import {View,Text,StyleSheet,Image,} from "react-native";
import AppButton from "../components/AppButton";
export default function DetailScreen({route,navigation,}) 
{
  const { barang } = route.params;
  return (
    <View style={styles.container}>
    {barang.foto && (
        <Image source={{uri: barang.foto,}}style={styles.image}/>
      )}
      <Text style={styles.title}>{barang.nama_barang}</Text>
      <Text>Pelapor:{barang.nama_pelapor}</Text>
      <Text>Kategori:{barang.kategori}</Text>
      <Text>Lokasi:{barang.lokasi}</Text>
      <Text>Status:{barang.status}</Text>
      <Text>{barang.deskripsi}</Text>
      <AppButton title="Kembali" color="#6b7280" onPress={() => navigation.goBack()}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  image: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});