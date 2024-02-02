import { createContext, useReducer } from 'react';
import { loginUser } from '../api/apiUsers';
import { useNotification } from './NotificationContext';

type UserContextType = {
  userData: UserState;
  dispatch: React.Dispatch<UserAction>;
  logIn: (username: string) => Promise<void>;
  logOut: () => void;
};

type UserState = {
  user: {
    username: string;
    avatar: string;
  } | null;
  isAuth: boolean;
  isLoginError: boolean;
};

type UserAction =
  | { type: 'LOGIN'; payload: { username: string; avatar: string } }
  | { type: 'LOGIN_ERROR' }
  | { type: 'LOGOUT' };

const initialState: UserState = {
  user: null,
  isAuth: false,
  isLoginError: false,
};

export const UserContext = createContext<UserContextType | null>(null);

function reducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case 'LOGIN':
      return {
        user: {
          username: action.payload.username,
          avatar: action.payload.avatar,
        },
        isAuth: true,
        isLoginError: false,
      };
    case 'LOGIN_ERROR':
      return {
        user: null,
        isAuth: false,
        isLoginError: true,
      };
    case 'LOGOUT':
      return {
        user: null,
        isAuth: false,
        isLoginError: false,
      };
    default:
      return state;
  }
}

function UserProvider({ children }: { children: React.ReactNode }) {
  const { showNotification } = useNotification();
  const [{ user, isAuth, isLoginError }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function logIn(username: string) {
    try {
      const userData = await loginUser(username);
      if (userData) {
        dispatch({
          type: 'LOGIN',
          payload: {
            username: userData.username,
            avatar: userData?.avatar || '',
          },
        });
        showNotification('Logowanie poprawne!', 'success');
      } else {
        dispatch({ type: 'LOGIN_ERROR' });
        showNotification('Logowanie niepoprawne!', 'error');
      }
    } catch (error) {
      console.error('Wystąpił błąd podczas logowania:', error);
    }
  }

  function logOut() {
    dispatch({ type: 'LOGOUT' });
  }

  return (
    <UserContext.Provider
      value={{
        dispatch,
        logIn,
        logOut,
        userData: { user, isAuth, isLoginError },
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider };
