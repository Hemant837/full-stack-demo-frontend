import { redirect } from "react-router";

export function getAuthToken() {
  const token = localStorage.getItem("token");
  return token;
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/");
  }
  return true;
}
