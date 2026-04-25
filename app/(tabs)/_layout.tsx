import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon sf="house.fill" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="todo">
        <Label>TodoCreate</Label>
        <Icon sf="info.circle.fill" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}