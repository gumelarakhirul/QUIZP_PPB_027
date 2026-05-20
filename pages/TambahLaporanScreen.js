import React, { useState } from "react";
import {View,Text,TextInput,StyleSheet,ScrollView,Alert,Image,TouchableOpacity,} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import Config from "../Config";
import AppButton from "../components/AppButton";

const RadioButton = ({ label, selected, onPress }) => {
  return (
    <TouchableOpacity style={styles.radioContainer} onPress={onPress}>
      <View style={styles.radioOuter}>
        {selected && <View style={styles.radioInner} />}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

export default function TambahLaporanScreen({ navigation }) {
  const [namaPelapor, setNamaPelapor] = useState("");
  const [namaBarang, setNamaBarang] = useState("");
  const [kategori, setKategori] = useState("Elektronik");
  const [lokasi, setLokasi] = useState("");
  const [status, setStatus] = useState("Hilang");
  const [deskripsi, setDeskripsi] = useState("");
  const [foto, setFoto] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);
  const [permission, requestPermission] = useCameraPermissions();
  const valid = namaBarang.length >= 3 && deskripsi.length >= 20;
  const bukaKamera = async () => {
    if (!permission?.granted) {
      const result = await requestPermission();

      if (!result.granted) {
        Alert.alert(
          "Izin kamera ditolak"
        );
        return;
      }
    }

    setShowCamera(true);
  };

  const ambilFoto = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      setFoto(photo.uri);
      setShowCamera(false);
    }
  };

  const simpanData = async () => {
    try {
      const response = await fetch(
        Config.BASE_URL,
        {
          method: "POST",
          headers: Config.HEADERS,
          body: JSON.stringify({
            nama_pelapor: namaPelapor,
            nama_barang: namaBarang,
            kategori: kategori,
            lokasi: lokasi,
            status: status,
            deskripsi: deskripsi,
            foto: foto,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Gagal simpan");
      }

      Alert.alert(
        "Berhasil",
        "Laporan berhasil disimpan"
      );

      setNamaPelapor("");
      setNamaBarang("");
      setKategori("");
      setLokasi("");
      setStatus("");
      setDeskripsi("");
      setFoto("");

      navigation.navigate("List Barang");
    } catch (error) {
      Alert.alert(
        "Error",
        error.message
      );
    }
  };

  if (showCamera) {
    return (
      <View style={{ flex: 1 }}>
        <CameraView style={{ flex: 1 }} facing="back" ref={(ref) => setCameraRef(ref)}/>
        <View style={{ padding: 20 }}>
          <AppButton title="Ambil Foto" onPress={ambilFoto}/>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text>Nama Pelapor</Text>
      <TextInput style={styles.input} value={namaPelapor} onChangeText={setNamaPelapor}/>
      <Text>Nama Barang</Text>
      <TextInput style={styles.input} value={namaBarang} onChangeText={setNamaBarang}/>
      <Text>Kategori</Text>
      <View style={styles.radioGroup}>
        <RadioButton
          label="Elektronik"
          selected={
            kategori === "Elektronik"
          }
          onPress={() =>
            setKategori("Elektronik")
          }
        />
        <RadioButton
          label="Aksesoris"
          selected={
            kategori === "Aksesoris"
          }
          onPress={() =>
            setKategori("Aksesoris")
          }
        />
        <RadioButton
          label="Dokumen"
          selected={
            kategori === "Dokumen"
          }
          onPress={() =>
            setKategori("Dokumen")
          }
        />
        <RadioButton
          label="Lainnya"
          selected={
            kategori === "Lainnya"
          }
          onPress={() =>
            setKategori("Lainnya")
          }
        />
      </View>
      <Text>Lokasi</Text>
      <TextInput style={styles.input} value={lokasi} onChangeText={setLokasi}/>
      <Text>Status</Text>
      <View style={styles.radioGroup}>
        <RadioButton
          label="Hilang"
          selected={status === "Hilang"}
          onPress={() =>
            setStatus("Hilang")
          }
        />
        <RadioButton
          label="Ditemukan"
          selected={
            status === "Ditemukan"
          }
          onPress={() =>
            setStatus("Ditemukan")
          }
        />
      </View>
      <Text>Deskripsi</Text>
      <TextInput
        multiline
        style={[
          styles.input,
          { height: 100 },
        ]}
        value={deskripsi}
        onChangeText={setDeskripsi}
      />
      <Text>Jumlah karakter:{deskripsi.length}</Text>
      <AppButton title="Buka Kamera" onPress={bukaKamera}/>
      {foto && (
        <Image source={{ uri: foto }} style={styles.image}/>
      )}
      <AppButton title="Simpan Laporan" disabled={!valid} onPress={simpanData}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },

  radioGroup: {
    marginBottom: 12,
  },

  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#007bff",
  },

  radioLabel: {
    fontSize: 16,
  },

  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
});