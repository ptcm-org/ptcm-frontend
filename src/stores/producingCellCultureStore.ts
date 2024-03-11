import { CreateSubCulturingDto, CulturingCellDto, InitiateCultureDto, SubculturingDto, subculturingControllerCreateSubculturing, subculturingControllerGetListSubculturings } from '@/api/auth-proxies';
import create from 'zustand'

type ProducingCellCultureState = {
    error: string | null;
    isLoading: boolean;
    subculturingData: {
        isLoading: false;
        subculturings: SubculturingDto[];
        subculturing: SubculturingDto | null;
    },
    initiateCultureDate: {
        initiateCultures: InitiateCultureDto[],
        initiateCulture: InitiateCultureDto | null;
    },
    culturingCellData: {
        culturingCells: CulturingCellDto[];
        culTuringCell: CulturingCellDto | null;
    }

    filterSubculturings: () => Promise<void>;
    createSubculturing: (payload: CreateSubCulturingDto) => Promise<void>;
    
}

export const producingCellCultureStore = create<ProducingCellCultureState>((set) => ({
    isLoading: false,
    error: null,
    subculturingData: {
        isLoading: false,
        subculturings: [],
        subculturing: null,
    },
    initiateCultureDate: {
        initiateCultures : [],
        initiateCulture: null,
    },
    culturingCellData: {
        culturingCells: [],
        culTuringCell: null,
    },
    filterSubculturings: async () => {
        try {
            set({ isLoading: true, error: null });
            const { data } = await subculturingControllerGetListSubculturings();
            set((state) => ({...state, isLoading: false, subculturingData: { ...state.subculturingData, isLoading: false, subculturings: data }}))
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },
    createSubculturing: async (payload: CreateSubCulturingDto) => {
        try {
            set({ isLoading: true, error: null });
            const { data } = await subculturingControllerCreateSubculturing(payload);
            set({ isLoading: false });
            set((state) => ({...state, isLoading: false, subculturingData: { ...state.subculturingData, isLoading: false, subculturing: data }}))
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    }    
}));


