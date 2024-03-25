import create from 'zustand'
import { GetUsersResponse, UserProfileDto, usersControllerFindAll, usersControllerGetProfile } from '@/api/auth-proxies';

export interface UsersState {
    isLoading: boolean;
    error: string | null;
    usersList: GetUsersResponse;
    currentUser: UserProfileDto;
    getProfile: () => Promise<void>;
    getListUsers: () => Promise<void>;
  }

export const userStore = create<UsersState>(set => ({
  error: null,
  isLoading: false,
  usersList: [],
  currentUser: {
    userId: '',
    email: '',
    role: '',
  },
  getProfile: async () => {
    try {
        set({ isLoading: true, error: null });
        const { data } = await usersControllerGetProfile();
        set((state) => ({...state, isLoading: false, currentUser: data}))
    } catch (error: any) {
        set({ error: error.message, isLoading: false });
    }
  },
  getListUsers: async () => {
    try {
        set({ isLoading: true, error: null });
        const { data } = await usersControllerFindAll();
        set((state) => ({...state, isLoading: false, usersList: data}))
    } catch (error: any) {
        set({ error: error.message, isLoading: false });
    }
  },
}))