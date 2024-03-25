import create from 'zustand'
import { CulturingBoxDto, CulturingDishDto, culturingBoxControllerGetCulturingBoxs, culturingDishControllerGetCulturingDishs } from '@/api/auth-proxies';

export interface LookupState {
    isLoading: boolean;
    error: string | null;
    boxList: CulturingBoxDto[];
    dishList: CulturingDishDto[];
    getListBoxs: () => Promise<void>;
    getListDishs: () => Promise<void>;
    
  }

export const lookupTableStore = create<LookupState>(set => ({
  error: null,
  isLoading: false,
  boxList: [],
  dishList: [],
  getListBoxs: async () => {
    try {
        set({ isLoading: true, error: null });
        const { data } = await culturingBoxControllerGetCulturingBoxs();
        set((state) => ({...state, isLoading: false, boxList: data}))
    } catch (error: any) {
        set({ error: error.message, isLoading: false });
    }
  },
  getListDishs: async () => {
    try {
        set({ isLoading: true, error: null });
        const { data } = await culturingDishControllerGetCulturingDishs();
        set((state) => ({...state, isLoading: false, dishList: data}))
    } catch (error: any) {
        set({ error: error.message, isLoading: false });
    }
  },
}))