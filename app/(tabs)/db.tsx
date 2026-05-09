import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { addTodo, deleteTodo, getTodos, Todo, toggleTodo,getItems } from "../../services/db";

export default function Database() {
  const db = useSQLiteContext();

  const [items, setItems] = useState<Todo[]>([]);
  const [text, setText] = useState("");

useEffect(() => {
    loadItems();
  }, []);
const loadItems = async () => {
  if (!db) return;

  const data = await getTodos(db);
  setItems(data);
};

  const addItemHandle = async () => {
    if (!text.trim()) return;

    const newItem = await addTodo(db, text, 1);

    setItems((prev) => [newItem, ...prev]);
    setText("");
  };

  const removeItemHandle = async (id: number) => {
    await deleteTodo(db, id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const toggleHandle = async (item: Todo) => {
    await toggleTodo(db, item.id, item.completed);

    setItems((prev) =>
      prev.map((t) =>
        t.id === item.id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Todo DB</Text>

      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
      />

      <Button title="Add" onPress={addItemHandle} />

      <FlatList
        data={items}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={[styles.text, item.completed && { textDecorationLine: "line-through" }]}>
              {item.todo}
            </Text>

            <View style={{ flexDirection: "row", gap: 10 }}>
              <Button
                title={item.completed ? "Undo" : "Done"}
                onPress={() => toggleHandle(item)}
              />

              <Button
                title="Delete"
                color="red"
                onPress={() => removeItemHandle(item.id)}
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 10 },
  title: { fontSize: 20, textAlign: "center" },
  input: { borderWidth: 1, padding: 10, borderRadius: 6 },
  item: { padding: 10, borderBottomWidth: 1 },
  text: { fontSize: 16 },
});