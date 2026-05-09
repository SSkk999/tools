import React from "react";
import { StyleSheet, Text, View } from "react-native";



const TodoList: React.FC = () => {
  // const [todos, setTodos] = useState<Todo[]>([]);

  // const loadTodos = async () => {
  //   const data = await getTodos();
  //   setTodos(data);
  // };

  // useFocusEffect(
  //   useCallback(() => {
  //     loadTodos();
  //   }, [])
  // );

  // const handleToggle = async (id: number) => {
  //   const todo = todos.find(t => t.id === id);
  //   if (!todo) return;

  //   await toggleTodo(id, todo.completed);


  //   loadTodos();
  // };

  return (
    <View >
      {/* <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoItem todo={item} onToggle={handleToggle} />
        )}
      /> */}
      <Text style={styles.dateText}>Hello</Text>
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
   dateText: {
    fontSize: 48,            
    fontWeight: "bold",
    color: "#333",
    marginTop: 0,
    textAlign: "center",
  }
});
