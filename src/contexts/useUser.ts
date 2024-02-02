import { useContext } from "react";
import { UserContext } from "./UserContext";

export  function useUser() {
  const context = useContext(UserContext);
  if (context === undefined || context === null)
    throw new Error('UserContext was used outside UserProvider');
  return context;
}
