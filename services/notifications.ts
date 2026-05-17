import * as Notifications from "expo-notifications";
import { SchedulableTriggerInputTypes } from "expo-notifications";
import { router } from "expo-router";
import { deleteTodo } from "./db";

let DB: any = null;

export async function requestNotificationPermission() {
  await Notifications.requestPermissionsAsync();
}

export function setupNotifications(db: any) {
  DB = db;

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });

  Notifications.setNotificationCategoryAsync("todo-actions", [
    {
      identifier: "show",
      buttonTitle: "Show",
      options: {
        opensAppToForeground: true,
      },
    },
    {
      identifier: "delete",
      buttonTitle: "Delete",
      options: {
        isDestructive: true,
        opensAppToForeground: false,
      },
    },
  ]);

  Notifications.addNotificationResponseReceivedListener(async (res) => {
    const action = res.actionIdentifier;
    const todoId = res.notification.request.content.data?.todoId;

    if (!todoId) return;
console.log("DB CHECK:", DB);

    if (action === "delete") {
      await deleteTodo(DB, todoId);
      router.replace("/db");
      router.replace("/db");
    }

    if (action === "show") {
      router.replace("/db");
    }
  });
}

export async function scheduleTodoNotification(id, title, deadline) {
  const date = new Date(deadline);

  if (isNaN(date.getTime())) return;

  if (date.getTime() <= Date.now()) {
    date.setSeconds(date.getSeconds() + 10);
  }

  return await Notifications.scheduleNotificationAsync({
    content: {
      title: "Todo deadline",
      body: title,
      data: { todoId: id },
      categoryIdentifier: "todo-actions",
    },
    trigger: {
      type: SchedulableTriggerInputTypes.DATE,
      date,
    },
  });
}