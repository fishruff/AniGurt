import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");


export const register = async (email: string, password: string, username: string) => {
  return await pb.collection("users").create({
    email,
    password,
    passwordConfirm: password,
    username,
  });
};


export const login = async (email: string, password: string) => {
  return await pb.collection("users").authWithPassword(email, password);
};


export const logout = () => {
  pb.authStore.clear();
};


export const getCurrentUser = () => {
  return pb.authStore.model;
};
