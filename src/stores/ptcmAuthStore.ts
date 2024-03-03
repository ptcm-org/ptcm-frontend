import { removeToken, saveToken, getToken } from '@/utils/cookie';
import create from 'zustand'
import { LoginDto, authControllerLogin } from '@/api/auth-proxies';

type State = {
  token: string | null
  error: string | null
  isLoading: boolean
  isLoggedIn: boolean
  login: (payload: LoginDto) => Promise<void>
  logout: () => void
}

export const usePtcmAuthStore = create<State>(set => ({
  token: null,
  error: null,
  isLoading: false,
  isLoggedIn: !!getToken().length,
  login: async (payload: LoginDto) => {
    set({ isLoading: true, error: null })
    try {
      const { data } = await authControllerLogin(payload);
      const { accessToken } = data;
      saveToken(accessToken);
      set({ isLoading: false, token: accessToken, isLoggedIn: true })
    } catch (error: any) {
      console.log(error);
      set({ error: error.message, isLoading: false })
    }
  },
  logout: () => { 
    set({ token: '', isLoggedIn: false })
    removeToken();
    
}
}))