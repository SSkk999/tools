import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import TodoItem from "../componets/TodoItem";
import { Todo } from "../models/todos";
import TodoForm from "./TodoForm";
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

    const addTodo = (todo: Todo) => {
    setTodos((prev) => [...prev, todo]);
  };
const now = new Date();
const day = now.getDate(); 
const month = now.getMonth() + 1; 

  return (

    <View style={styles.container}>
          <TodoForm  onSubmit={addTodo}/>
  <Text style={styles.dateText}>Todo List</Text>
  <Text style={styles.dateText}>{day}:{month}</Text>
        <FlatList
          data={todos}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TodoItem todo={item} onToggle={handleToggle} />
          )}
          contentContainerStyle={{ marginHorizontal: 50, marginTop: 8, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />


     
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
             
    justifyContent: "center", 

  },
  dateText: {
    fontSize: 48,            
    fontWeight: "bold",
    color: "#333",
    marginTop: 0,
    textAlign: "center",
  },
});
export default TodoList;