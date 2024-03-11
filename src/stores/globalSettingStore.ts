import create from 'zustand'
import { GLOBAL_SETTING_CONFIG_LIST } from '@/pages/Settings/constant';
import { CreateGlobalSettingDto, GlobalSettingDto, globalSettingControllerCreateGlobalSetting, globalSettingControllerGetGlobalSetting } from '@/api/auth-proxies';

export type GSKey = (typeof GLOBAL_SETTING_CONFIG_LIST)[number]['key'];
export type GSTitle = (typeof GLOBAL_SETTING_CONFIG_LIST)[number]['title'];
export type GSConfig = {
  [k in GSKey]: GlobalSettingDto;
};

export type GSActionDto<T> = { key: GSKey; data: T };

type GlobalSettingState = {
    error: string | null;
    isLoading: boolean;
    globalData: GSConfig & {
        isLoading: boolean;
    };
    createGlobalSettingType: (payload: GSActionDto<CreateGlobalSettingDto>) => Promise<void>;
    updateGlobalSettingValue: (payload: GSActionDto<CreateGlobalSettingDto>) => Promise<void>;
    getGlobalSetting: () => Promise<void>;
}

export const globalSettingStore = create<GlobalSettingState>((set) => ({
  isLoading: false,
  error: null,
  globalData: {
    isLoading: false,
    ...GLOBAL_SETTING_CONFIG_LIST.reduce(
        (a, { key }) => ({
          ...a,
          [key]: {
            id: '',
            value: '',
            GSType: '',
            GSTitle: '',
            editable: false,
          },
        }),
        {} as GSConfig,
      ),
  },
  createGlobalSettingType: async (payload: GSActionDto<CreateGlobalSettingDto>) => {
    try {
      set((state) => ({...state, isLoading: true }));
      const { data } = await globalSettingControllerCreateGlobalSetting(payload.data);
      set((state) => ({...state, isLoading: false, globalData: {...state.globalData, [payload.key]: data } }))
    }
    catch (error: any) {
        set({ error: error.message, isLoading: false });
      }
  },
  updateGlobalSettingValue: async (payload: GSActionDto<CreateGlobalSettingDto>) => {
    try {
      set((state) => ({...state, isLoading: true}));
      const { data } = await globalSettingControllerCreateGlobalSetting(payload.data);
      set((state) => ({...state,isLoading: false, globalData: {...state.globalData, [payload.key]: data } }))
    }
    catch (error: any) {
        set({ error: error.message, isLoading: false });
    }
  },
  getGlobalSetting: async () => {
    try {
      set({ isLoading: true, error: null });
      const { data } = await globalSettingControllerGetGlobalSetting();
      set({ isLoading: false });
      GLOBAL_SETTING_CONFIG_LIST.forEach(({ key }) => {
        const GSValue = data.find((item: { GSType: string; }) => item.GSType === key);
        if (GSValue)  set((state) => ({...state, globalData: {...state.globalData, [key]: GSValue}}));
      });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  }
}))