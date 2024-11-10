import { Checkbox } from "expo-checkbox";
import { FlashList } from "@shopify/flash-list";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [listItem, setlistItem] = useState([
    { id: 1, text: "test", checked: false },
    { id: 2, text: "test2", checked: false },
  ]);

  const [newItemText, setNewItemText] = useState(""); // Zustand für das Eingabefeld
  useEffect(() => {
    const timer = setTimeout(() => {
      // Nach 2 Sekunden das Element entfernen
      setlistItem((prevItems) =>
        prevItems.filter((item) => item.checked === false)
      );
    }, 2000);

    // Cleanup-Funktion, um den Timer zu löschen, wenn das Item entfernt wird
    return () => clearTimeout(timer);
  }, [listItem]); // Effekt wird ausgeführt, wenn sich listItem ändert
  // Funktion, um die Checkbox umzuschalten
  const toggleCheckbox = (id: any) => {
    setlistItem((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // Funktion, um ein neues Item hinzuzufügen
  const addItem = () => {
    if (newItemText.trim() !== "") {
      setlistItem((prevItems) => [
        ...prevItems,
        { id: Date.now(), text: newItemText, checked: false }, // Neues Item hinzufügen
      ]);
      setNewItemText(""); // Eingabefeld nach dem Hinzufügen leeren
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headline}>Minimalistic todo list</Text>
      <FlashList
        data={listItem}
        keyExtractor={(item) => item.id.toString()} // Verwendung von keyExtractor
        renderItem={({ item }) => (
          <View style={styles.listItemContainer}>
            <Text style={styles.listItem}>{item.text}</Text>
            <Checkbox
              value={item.checked}
              onValueChange={() => toggleCheckbox(item.id)}
              color={item.checked ? "#4630EB" : undefined}
            />
          </View>
        )}
        estimatedItemSize={listItem.length}
      />

      <TextInput
        style={styles.input}
        value={newItemText}
        onChangeText={setNewItemText}
        placeholder="Add a new item"
        placeholderTextColor="#A9A9A9"
      />
      <Button
        title="Add Item"
        onPress={addItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    padding: 16,
  },
  headline: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    paddingLeft: 8,
    color: "#fff",
  },
  listItemContainer: {
    backgroundColor: "#3e3e3e",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listItem: {
    color: "#fff",
    fontSize: 16,
  },
});
