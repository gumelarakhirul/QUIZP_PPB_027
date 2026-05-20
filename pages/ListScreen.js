import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  Text,
  RefreshControl,
} from "react-native";

import Config from "../Config";
import BarangCard from "../components/BarangCard";
import AppButton from "../components/AppButton";

export default function ListScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const ambilData = async () => {
    try {
      setError("");

      const url =
        search === ""
          ? `${Config.BASE_URL}?select=*&order=id.desc`
          : `${Config.BASE_URL}?select=*&nama_barang=ilike.*${search}*&order=id.desc`;

      const response = await fetch(url, {
        headers: Config.HEADERS,
      });

      if (!response.ok) {
        throw new Error("Gagal memuat data dari server");
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.log(error);
      setError("Gagal memuat data dari server");
    } finally {
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    ambilData();
  };

  useEffect(() => {
    ambilData();
  }, [search]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Cari barang..."
        style={styles.search}
        value={search}
        onChangeText={setSearch}
      />

      {error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <BarangCard
              item={item}
              onPress={() =>
                navigation.navigate("Detail Barang", {
                  barang: item,
                })
              }
            />
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>Data kosong</Text>
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f3f4f6",
  },

  search: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },

  empty: {
    textAlign: "center",
    marginTop: 30,
    color: "#777",
  },

  errorBox: {
    marginTop: 40,
    alignItems: "center",
  },

  errorText: {
    color: "#ef4444",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
});