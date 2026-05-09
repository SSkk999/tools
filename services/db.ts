import * as SQLite from "expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";
export type Todo = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};
const db = SQLite.openDatabaseSync("todos.db");
export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      todo TEXT NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0,
      userId INTEGER NOT NULL
    );
  `);
}

export async function getTodos(db: SQLiteDatabase): Promise<Todo[]> {
  const rows = await db.getAllAsync<any>("SELECT * FROM todos ORDER BY id DESC");

  return rows.map((r) => ({
    id: r.id,
    todo: r.todo,
    completed: r.completed === 1,
    userId: r.userId,
  }));
}

export async function addTodo(db: SQLiteDatabase, todo: string, userId: number) {
  const result = await db.runAsync(
    "INSERT INTO todos (todo, completed, userId) VALUES (?, 0, ?)",
    [todo, userId]
  );

  return {
    id: result.lastInsertRowId,
    todo,
    completed: false,
    userId,
  };
}

export async function deleteTodo(db: SQLiteDatabase, id: number) {
  await db.runAsync("DELETE FROM todos WHERE id = ?", [id]);
}

export async function toggleTodo(db: SQLiteDatabase, id: number, current: boolean) {
  await db.runAsync(
    "UPDATE todos SET completed = ? WHERE id = ?",
    [current ? 0 : 1, id]
  );
}
export async function getItems(): Promise<Todo[]> {
  return await db.getAllAsync<Todo>("SELECT * FROM todos;");
  }

