import { create, SetState } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  user: {
    email: string | null;
    id: number | null;
  };
}

interface AuthActions {
  login: (accessToken: string, user: { email: string; id: number }) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState & AuthActions>((set: SetState<AuthState & AuthActions>) => {
  const storedToken = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');

  return {
    isLoggedIn: !!storedToken, // Set isLoggedIn to true if there is a valid token
    token: storedToken ? JSON.parse(storedToken) : null,
    user: storedUser ? JSON.parse(storedUser) : { email: null, id: null },
    login: (accessToken, user) => {
      set((state) => ({ ...state, isLoggedIn: true, token: accessToken, user }));
      localStorage.setItem('token', JSON.stringify(accessToken));
      localStorage.setItem('user', JSON.stringify(user));
    },
    logout: () => {
      set((state) => ({ ...state, isLoggedIn: false, token: null, user: { email: null, id: null } }));
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  };
});

export default useAuthStore;
