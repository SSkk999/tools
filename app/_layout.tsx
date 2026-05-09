import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { migrateDbIfNeeded } from "../services/db";
const DATABASE_NAME = "todos.db";
export default function Layout() {
  return (
 <SQLiteProvider databaseName={DATABASE_NAME} onInit={migrateDbIfNeeded}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ title: "Home", headerShown: false }}
        ></Stack.Screen>
      </Stack>
    </SQLiteProvider>
  );
}