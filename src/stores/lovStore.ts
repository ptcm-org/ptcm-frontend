import create from 'zustand'
import { CreateLovDto, LovDto, UpdateLovDto, lovControllerCreateLov, lovControllerGetLovs, lovControllerUpdateLov } from '@/api/auth-proxies';
import { LOV_CONFIG_LIST } from '@/pages/Settings/constant';

export type LovKey = (typeof LOV_CONFIG_LIST)[number]['key'];
export type LovTitle = (typeof LOV_CONFIG_LIST)[number]['title'];
export type LovConfig = {
  [k in LovKey]: { isLoading: boolean; value: LovDto[] };
};

export type LovActionsDto<T> = { key: LovKey; data: T };

type LovState = {
    error: string | null;
    isLoading: boolean;
    lovData: LovConfig & {
        isLoading: boolean;
    };
    getLovs: ()  => Promise<void>;
    createLov: (payload: CreateLovDto)  => Promise<void>;
    updateLov: (payload: LovActionsDto<UpdateLovDto>)  => Promise<void>;
    getLovsByType: (payload: string)    => Promise<void>;
}

export const lovStore = create<LovState>((set) => ({
  isLoading: false,
  error: null,
  lovData: {
    isLoading: false,
    ...LOV_CONFIG_LIST.reduce((a, { key }) => ({ ...a, [key]: { isLoading: false, value: [] } }), {} as LovConfig),
  },

  getLovs: async () => {
    try {
      set({ isLoading: true, error: null });
      const { data } = await lovControllerGetLovs();
      set({ isLoading: false });
      LOV_CONFIG_LIST.forEach(({ key }) => {
        set((state) => ({...state, lovData: { ...state.lovData, isLoading: false, [key]: { value: data.filter((item) => item.lovType === key), isLoading: false }} }))
      });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  createLov: async (payload: CreateLovDto) => {    
    try {
      set((state) => ({...state, lovData: {...state.lovData, [payload.lovType]: { isLoading: true, value: [...state.lovData[payload.lovType as LovKey].value] } } }));
      const { data } = await lovControllerCreateLov(payload);
      set((state) => ({...state, lovData: {...state.lovData, [payload.lovType]: { isLoading: false, value: [...state.lovData[payload.lovType as LovKey].value, data] }}}))
    }
    catch(error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  updateLov: async (payload: LovActionsDto<UpdateLovDto>) => {
    try {
      set((state) => ({...state, lovData: {...state.lovData, [payload.key]: { isLoading: true, value: [...state.lovData[payload.key].value] } } }));
      const { data } = await lovControllerUpdateLov(payload.data);
      set((state) => ({...state, lovData: {...state.lovData, [payload.key]: { isLoading: false, value: [...state.lovData[payload.key].value.map(item =>
        item.id === data.id ? data : item,
      ),] }}}))
    }
    catch(error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  getLovsByType: async (payload: string) => {

  }
}));
