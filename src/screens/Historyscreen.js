import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem("history");
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Error loading history:", error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>Completed Timers</Text>
      {history.length === 0 ? (
        <Text>No completed timers yet.</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ marginTop: 10, padding: 10, backgroundColor: "#d3d3d3", borderRadius: 5 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.name}</Text>
              <Text>Category: {item.category}</Text>
              <Text>Completed At: {new Date(item.completedAt).toLocaleString()}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
