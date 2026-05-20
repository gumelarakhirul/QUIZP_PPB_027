import React, {useEffect,useState,} from "react";
import {View,TextInput,FlatList,StyleSheet,Text,RefreshControl,} from "react-native";
import Config from "../Config";
import BarangCard from "../components/BarangCard";

export default function ListScreen({
  navigation,
}) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const ambilData = async () => {
    try {
      const url =
        search === ""
          ? `${Config.BASE_URL}?select=*&order=id.desc`
          : `${Config.BASE_URL}?select=*&nama_barang=ilike.*${search}*&order=id.desc`;

      const response = await fetch(
        url,
        {
          headers:
            Config.HEADERS,
        }
      );

      const result =
        await response.json();

      setData(result);
    } catch (error) {
      console.log(error);
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

      <FlatList
        data={data}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={({ item }) => (
          <BarangCard
            item={item}
            onPress={() =>
              navigation.navigate(
                "Detail Barang",
                {
                  barang: item,
                }
              )
            }
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Data kosong
          </Text>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor:
      "#f3f4f6",
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
});