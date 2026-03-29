import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Todo } from "../models/todos";

type Props = {
  todo: Todo;
  onToggle: (id: number) => void;
};

const TodoItem: React.FC<Props> = ({ todo, onToggle }) => {
  return (
    <TouchableOpacity
      onPress={() => onToggle(todo.id)}
      style={[
        styles.container,
        todo.completed && styles.completedContainer,
      ]}
    >
      <Text style={[styles.check, todo.completed && styles.completedCheck]}>
        {todo.completed ? "✔" : "○"}
      </Text>
      <Text style={[styles.text, todo.completed && styles.completedText]}>
        {todo.todo}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 13,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  completedContainer: {
    backgroundColor: "#d4edda",
  },
  check: {
    fontSize: 20,
    color: "gray",
    marginRight: 10,
  },
  completedCheck: {
    color: "green",
  },
  text: {
    fontSize: 16,
    color: "black",
  },
  completedText: {
    color: "green",
    textDecorationLine: "line-through",
  },
});

export default TodoItem;