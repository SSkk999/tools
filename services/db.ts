import { SQLiteDatabase } from "expo-sqlite";

export type Todo = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
  deadline: Date;
};



export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      todo TEXT NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0,
      userId INTEGER NOT NULL,
      deadline INTEGER NOT NULL
    );
  `);
}

export async function getTodos(db: SQLiteDatabase): Promise<Todo[]> {
  const rows = await db.getAllAsync<any>(
    "SELECT * FROM todos ORDER BY deadline ASC"
  );

  return rows.map((r) => ({
    id: r.id,
    todo: r.todo,
    completed: r.completed === 1,
    userId: r.userId,
    deadline: new Date(r.deadline),
  }));
}

export async function addTodo(
  db: SQLiteDatabase,
  todo: string,
  userId: number,
  deadline: Date
) {
  const result = await db.runAsync(
    "INSERT INTO todos (todo, completed, userId, deadline) VALUES (?, 0, ?, ?)",
    [todo, userId, deadline.getTime()]
  );

  return {
    id: result.lastInsertRowId,
    todo,
    completed: false,
    userId,
    deadline,
  };
}

export async function deleteTodo(db: SQLiteDatabase, id: number) {
    console.log("DELETE:", id);
  await db.runAsync("DELETE FROM todos WHERE id = ?", [id]);
}

export async function toggleTodo(
  db: SQLiteDatabase,
  id: number,
  current: boolean
) {
  await db.runAsync(
    "UPDATE todos SET completed = ? WHERE id = ?",
    [current ? 0 : 1, id]
  );
}

export async function getItems(): Promise<Todo[]> {
  const rows = await db.getAllAsync<any>(
    "SELECT * FROM todos ORDER BY deadline ASC"
  );

  return rows.map((r) => ({
    id: r.id,
    todo: r.todo,
    completed: r.completed === 1,
    userId: r.userId,
    deadline: new Date(r.deadline),
  }));
}