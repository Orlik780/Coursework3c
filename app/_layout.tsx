import { Stack } from "expo-router";

export default function PageLayout() {
  return (
  <Stack screenOptions={{headerShown: false}}>
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    <Stack.Screen name="index" options={{ title: 'Вход' }} />
    <Stack.Screen name="registration" options={{ title: 'Регистрация' }} />
    <Stack.Screen name="resetpas" options={{ title: 'Сброс пароля' }} />
  </Stack>
  );
}
