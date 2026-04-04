import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Todo } from "../models/todos";

type TodoFormInputs = {
  todo: string;
  completed: boolean;
  userId: string; 
};

interface TodoFormProps {
  onSubmit: (data: Todo) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit }) => {
  const { control, handleSubmit, reset } = useForm<TodoFormInputs>({
    defaultValues: {
      todo: "",
      completed: false,
      userId: "",
    },
  });

  const submitHandler: SubmitHandler<TodoFormInputs> = (data) => {
    const todoData: Todo = {
      id: Date.now(), 
      todo: data.todo,
      completed: data.completed,
      userId: Number(data.userId),
    };
    onSubmit(todoData);
    reset();
    Alert.alert("Успішно", "Todo додано!");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Назва задачі</Text>
      <Controller
        control={control}
        name="todo"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Введіть задачу"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Text style={styles.label}>User ID</Text>
      <Controller
        control={control}
        name="userId"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="User ID"
            keyboardType="numeric"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="completed"
        render={({ field: { onChange, value } }) => (
          <View style={styles.checkboxContainer}>
            <Text>Завершено:</Text>
            <Button
              title={value ? "Так" : "Ні"}
              onPress={() => onChange(!value)}
            />
          </View>
        )}
      />

      <Button title="Додати Todo" onPress={handleSubmit(submitHandler)} />
    </ScrollView>
  );
};

export default TodoForm;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    justifyContent: "space-between",
  },
});