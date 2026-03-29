import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import TodoItem from "../componets/TodoItem";
import { Todo } from "../models/todos";
const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/todos?limit=10&skip=0")
      .then(res => res.json())
      .then(data => {
        setTodos(data.todos);
      });
  }, []);

  const handleToggle = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };
const now = new Date();
const day = now.getDate(); 
const month = now.getMonth() + 1; 

  return (
    <View style={styles.container}>
  <Text style={styles.dateText}>Todo List</Text>
  <Text style={styles.dateText}>{day}:{month}</Text>
  <View style={{ margin:50 , marginTop: 8 }} >
    {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}

        />
      ))}
  </View>
     
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,                 
    justifyContent: "center", 
    alignItems: "center", 
    marginTop : 140   
  },
  dateText: {
    fontSize: 48,            
    fontWeight: "bold",
    color: "#333",
  },
});
export default TodoList;