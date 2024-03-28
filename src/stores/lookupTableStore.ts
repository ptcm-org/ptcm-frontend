import create from 'zustand'
import { CleanRoomDto, CulturingBoxDto, CulturingDishDto, ShelveDto, cleanRoomControllerGetCleanRooms, culturingBoxControllerGetCulturingBoxs, culturingDishControllerGetCulturingDishs, shelveControllerGetListShelves } from '@/api/auth-proxies';

export interface LookupState {
    isLoading: boolean;
    error: string | null;
    boxList: CulturingBoxDto[];
    dishList: CulturingDishDto[];
    cleanRooms: CleanRoomDto[];
    shelves: ShelveDto[];
    getListBoxs: () => Promise<void>;
    getListDishs: () => Promise<void>;
    getListCleanRooms: () => Promise<void>;
    getListShelves: () => Promise<void>;
  }

export const lookupTableStore = create<LookupState>(set => ({
  error: null,
  isLoading: false,
  boxList: [],
  dishList: [],
  cleanRooms: [],
  shelves: [],
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
  getListCleanRooms: async () => {
    try {
      set({ isLoading: true, error: null });
      const { data } = await cleanRoomControllerGetCleanRooms();
      set((state) => ({...state, isLoading: false, cleanRooms: data}))
  } catch (error: any) {
      set({ error: error.message, isLoading: false });
  }
  },
  getListShelves: async () => {
    try {
      set({ isLoading: true, error: null });
      const { data } = await shelveControllerGetListShelves();
      set((state) => ({...state, isLoading: false, shelves: data}))
  } catch (error: any) {
      set({ error: error.message, isLoading: false });
  }
  },
}))