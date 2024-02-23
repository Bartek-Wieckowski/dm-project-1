import { createContext, useReducer } from 'react';
import { loginUser } from '../api/apiUsers';
import { useNotification } from './NotificationContext';

type UserContextType = {
  userData: UserState;
  dispatch: React.Dispatch<UserAction>;
  logIn: (username: string) => Promise<void>;
  logOut: () => void;
  updatedUser: (newUserData: UserState['user']) => void;
};

type UserState = {
  user: {
    id: number;
    name: string;
    username: string;
    avatar: string;
  } | null;
  isAuth: boolean;
  isLoginError: boolean;
};

type UserAction =
  | {
      type: 'LOGIN';
      payload: { id: number; name: string; username: string; avatar: string };
    }
  | { type: 'LOGIN_ERROR' }
  | { type: 'LOGOUT' }
  | {
      type: 'UPDATE_USER';
      payload: { id: number; name: string; username: string; avatar: string };
    };

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
          id: action.payload.id,
          name: action.payload.name,
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
    case 'UPDATE_USER':
      return {
        ...state,
        user: {
          id: action.payload.id,
          name: action.payload.name,
          username: action.payload.username,
          avatar: action.payload.avatar,
        },
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
            id: userData.id || 0,
            name: userData.name || '',
            username: userData.username || '',
            avatar: userData?.avatar || '',
          },
        });
        showNotification('Logowanie poprawne!', 'success');
      } else {
        dispatch({ type: 'LOGIN_ERROR' });
        showNotification('Logowanie niepoprawne!', 'error');
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR' });
      showNotification('Logowanie niepoprawne!', 'error');
    }
  }

  function logOut() {
    dispatch({ type: 'LOGOUT' });
  }

  function updatedUser(newUserData: UserState['user']) {
    if (newUserData !== null) {
      dispatch({ type: 'UPDATE_USER', payload: newUserData });
    }
  }

  return (
    <UserContext.Provider
      value={{
        dispatch,
        logIn,
        logOut,
        updatedUser,
        userData: { user, isAuth, isLoginError },
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider };
