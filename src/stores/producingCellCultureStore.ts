import { CreateSubCulturingDto, CulturingCellDto, EnvironmentDto, InitiateCultureDto, SubculturingDto, UpdateSubCulturingDto, environmentControllerGetEnvironments, subculturingControllerCreateSubculturing, subculturingControllerGetListSubculturings, subculturingControllerGetSubculturingByBarCode, subculturingControllerGetSubculturingById, subculturingControllerUpdateSubculturing } from '@/api/auth-proxies';
import create from 'zustand'


export interface ISubculturingForm {
  barCode: string;
  batchCode: string;
  cellCultureCode: string;
  childBatchCode: string;
  cleanCount: number;
  cleanEnvironment: string;
  clonalCluster: number;
  culturemildInfection: number;
  culturePotentialInfection: number;
  cultureSevereInfection: number;
  customerWeeks: number;
  cutOfDate: string;
  disposalBags: number;
  employeeId: string;
  environmentId: string;
  mildInfectionCount: number;
  mildInfectionEnvironment: string;
  motherStock: string;
  notes?: string;
  phaseIndex: string;
  plantCloning: string;
  potentialInfectionCount: number;
  potentialInfectionEnvironment: string;
  severeInfectionCount: number;
  severeInfectionEnvironment: string;
  sterileCulture: number;
  subculturingDate: string;
  surplusBags: number;
  tissueCultureBags: number;
  tissueCultureLineCode: string;
}

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
    environmentData: {
        environments: EnvironmentDto[]
    }

    filterSubculturings: () => Promise<void>;
    createSubculturing: (payload: CreateSubCulturingDto) => Promise<void>;
    getDetailSubculturing: (id: string) => Promise<void>;
    updateSubculturing: (payload: UpdateSubCulturingDto) => Promise<void>;
    getListEnvironments: () => Promise<void>;
    
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
    environmentData: {
        environments: [],
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
    },
    getDetailSubculturing: async (id: string) => {
        try {
            set({ isLoading: true, error: null });
            const { data } = await subculturingControllerGetSubculturingById(id);
            set({ isLoading: false });
            set((state) => ({...state, isLoading: false, subculturingData: { ...state.subculturingData, isLoading: false, subculturing: data }}))
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },
    updateSubculturing: async (payload: UpdateSubCulturingDto) => {
        try {
            set({ isLoading: true, error: null });
            const { data } = await subculturingControllerUpdateSubculturing(payload);
            set({ isLoading: false });
            set((state) => ({...state, isLoading: false, subculturingData: { ...state.subculturingData, isLoading: false, subculturing: data }}))
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },
    getListEnvironments: async () => {
        try {
            set({ isLoading: true, error: null });
            const { data } = await environmentControllerGetEnvironments();
            set((state) => ({...state, isLoading: false, environmentData: { environments: data }}))
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    }    
}));


