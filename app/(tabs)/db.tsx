import DateTimePicker from "@react-native-community/datetimepicker";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  addTodo,
  deleteTodo,
  getTodos,
  Todo,
  toggleTodo,
} from "../../services/db";

import { useFocusEffect } from "expo-router";
import { AppState } from "react-native";
import {
  scheduleTodoNotification
} from "../../services/notifications";
export default function Database() {
  const db = useSQLiteContext();

  const [items, setItems] = useState<Todo[]>([]);
  const [text, setText] = useState("");
  const [deadline, setDeadline] = useState(new Date());

  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

useEffect(() => {
  const sub = AppState.addEventListener("change", (state) => {
    if (state === "active") {
      loadItems();
    }
  });

  return () => sub.remove();
}, []);
useFocusEffect(
  React.useCallback(() => {
    loadItems();
  }, [])
);
  const loadItems = async () => {
    const data = await getTodos(db);
    setItems(data);
  };

  const addItemHandle = async () => {
    if (!text.trim()) return;

    const newItem = await addTodo(db, text, 1, deadline);

    await scheduleTodoNotification(
      newItem.id,
      newItem.todo,
      newItem.deadline
    );

    setItems((prev) => [newItem, ...prev]);

    setText("");
    setDeadline(new Date());
  };

  const removeItemHandle = async (id: number) => {
    await deleteTodo(db, id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const toggleHandle = async (item: Todo) => {
    await toggleTodo(db, item.id, item.completed);

    setItems((prev) =>
      prev.map((t) =>
        t.id === item.id
          ? { ...t, completed: !t.completed }
          : t
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Todo DB</Text>

      <TextInput
        style={styles.input}
        placeholder="Todo"
        value={text}
        onChangeText={setText}
      />

      <Pressable
        style={styles.dateButton}
        onPress={() => setShowDate(true)}
      >
        <Text style={styles.dateText}>
          {deadline.toLocaleString()}
        </Text>
      </Pressable>

      {showDate && (
        <DateTimePicker
          value={deadline}
          mode="date"
          onChange={(e, d) => {
            setShowDate(false);
            if (!d) return;

            const updated = new Date(deadline);
            updated.setFullYear(d.getFullYear());
            updated.setMonth(d.getMonth());
            updated.setDate(d.getDate());

            setDeadline(updated);
            setShowTime(true);
          }}
        />
      )}

      {showTime && (
        <DateTimePicker
          value={deadline}
          mode="time"
          onChange={(e, t) => {
            setShowTime(false);
            if (!t) return;

            const updated = new Date(deadline);
            updated.setHours(t.getHours());
            updated.setMinutes(t.getMinutes());

            setDeadline(updated);
          }}
        />
      )}

      <Button title="Add" onPress={addItemHandle} />

      <FlatList
        data={items}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text
              style={[
                styles.text,
                item.completed && { textDecorationLine: "line-through" },
              ]}
            >
              {item.todo}
            </Text>

            <Text style={styles.deadline}>
              {item.deadline.toLocaleString()}
            </Text>

            <View style={styles.buttons}>
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
  dateButton: { borderWidth: 1, padding: 14, borderRadius: 6 },
  dateText: { fontSize: 16 },
  item: { padding: 10, borderBottomWidth: 1, gap: 6 },
  text: { fontSize: 16 },
  deadline: { color: "gray" },
  buttons: { flexDirection: "row", gap: 10 },
});