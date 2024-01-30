import { API_URL } from "../constants/appConst";
import { UserAccount } from "../validators/validators";

export async function registerUser(newUser: UserAccount) {
  const res = await fetch(`${API_URL}/usersAccount`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(newUser),
  });
  if (!res.ok) {
    throw new Error("Błąd podczas dodawania...");
  }
  const data = await res.json();

  return data;
}

export async function loginUser(username: string) {
  const res = await fetch(`${API_URL}/usersAccount?username=${username}`);
  if (!res.ok) {
    throw new Error(`Błąd podczas logowania. Odpowiedź z serwera: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  if (data.length === 0) {
    return;
  }

  return data[0];
}
