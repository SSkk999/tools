import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import TodoForm from "../componets/TodoForm";
import { Todo } from "../models/todos";

export default function TodocCreate() {
   const [todos, setTodos] = useState<Todo[]>([]);


const now = new Date();
const day = now.getDate(); 
const month = now.getMonth() + 1; 
const addTodo = (todo: Todo) => {
    setTodos((prev) => [...prev, todo]);
  };
  return (
    <View>
        <TodoForm  onSubmit={addTodo}/>
        <Text style={styles.dateText}>Todo List</Text>
        <Text style={styles.dateText}>{day}:{month}</Text>
    </View>
  );
  
}
const styles = StyleSheet.create({
   dateText: {
    fontSize: 48,            
    fontWeight: "bold",
    color: "#333",
    marginTop: 0,
    textAlign: "center",
  }
});