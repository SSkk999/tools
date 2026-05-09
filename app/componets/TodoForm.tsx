import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
    Alert,
    Button,
    ScrollView,
    StyleSheet,
    Text,
    TextInput
} from "react-native";

import { addTodo } from "../../services/db";

type TodoFormInputs = {
  todo: string;
  userId: string;
};

const TodoForm: React.FC = () => {
  const { control, handleSubmit, reset } = useForm<TodoFormInputs>({
    defaultValues: {
      todo: "",
      userId: "",
    },
  });

  const submitHandler: SubmitHandler<TodoFormInputs> = async (data) => {
    await addTodo(data.todo, Number(data.userId));

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
});