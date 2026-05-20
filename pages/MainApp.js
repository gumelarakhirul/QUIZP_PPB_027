import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DashboardScreen from "./DashboardScreen";
import TambahLaporanScreen from "./TambahLaporanScreen";
import ListScreen from "./ListScreen";
import DetailScreen from "./DetailScreen";

const Stack = createNativeStackNavigator();

export default function MainApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Dashboard"
      >
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
        />

        <Stack.Screen
          name="Tambah Laporan"
          component={TambahLaporanScreen}
        />

        <Stack.Screen
          name="List Barang"
          component={ListScreen}
        />

        <Stack.Screen
          name="Detail Barang"
          component={DetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}