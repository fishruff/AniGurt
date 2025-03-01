import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

// Описание типов
export type UserRecord = {
  id: string;
  name: string;
  email: string;
};

export type User = {
  record: UserRecord;
};

// Регистрация пользователя
export const register = async (email: string, password: string, username: string) => {
  console.log({ email, password, username }); 
  try {
    const newUser = await pb.collection("users").create({
      email,
      password,
      passwordConfirm: password, // Обязательно для регистрации
      name: username, // Проверь, что поле `name` есть в PocketBase
    });

    return newUser;
  } catch (error) {
    console.error("Ошибка регистрации:", error); // Выведет детали ошибки
    throw new Error("Ошибка регистрации: " + error);
  }
};

// Авторизация пользователя
export const login = async (email: string, password: string) => {
  return await pb.collection("users").authWithPassword(email, password);
};

// Выход из аккаунта
export const logout = () => {
  pb.authStore.clear();
};

// Получение текущего пользователя
export const getCurrentUser = async (): Promise<UserRecord | null> => {
  if (!pb.authStore.isValid || !pb.authStore.model) return null;
  return pb.authStore.model as unknown as UserRecord;
};
