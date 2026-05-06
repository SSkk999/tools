import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import TodoItem from "../componets/TodoItem";
import { Todo } from "../models/todos";
import { storage } from "../services/storage";

const STORAGE_KEY = "TODOS";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const loadTodos = async () => {
    const local = await storage.load<Todo[]>(STORAGE_KEY);

    if (local && local.length > 0) {
      setTodos(local);
      return;
    }

    const res = await fetch("https://dummyjson.com/todos?limit=10");
    const data = await res.json();

    setTodos(data.todos);
    await storage.save(STORAGE_KEY, data.todos);
  };

  useFocusEffect(
    useCallback(() => {
      loadTodos();
    }, [])
  );

  const handleToggle = async (id: number) => {
    const updated = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    setTodos(updated);
    await storage.save(STORAGE_KEY, updated);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TodoItem todo={item} onToggle={handleToggle} />
        )}
      />
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  container: {}
});