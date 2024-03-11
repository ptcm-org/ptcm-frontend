import { culturingPhaseControllerGetListCulturingPhasesByTissueLineCode } from '@/api/auth-proxies';
import create from 'zustand'

export interface CulturingPhase {
  cellCultureCode: string;
  id: string;
  infectionRate: number;
  labCode: string;
  phaseCode: string;
  phaseIndex: number;
  phaseName: string;
  producingRate: number;
  tissueCultureLineCode: string;
}

type CulturingPhaseState = {
    error: string | null;
    isLoading: boolean;
    cellCultures: CulturingPhase[];
    cellCulturing: CulturingPhase;
    getDataByTissueLineCode: (payload: string)    => Promise<void>;
}

export const producingLookupStore = create<CulturingPhaseState>((set) => ({
    isLoading: false,
    error: null,
    cellCultures: [],
    cellCulturing: { 
        id: '',
        cellCultureCode: '',
        labCode: '',
        phaseName: '',
        phaseCode: '',
        tissueCultureLineCode: '',
        infectionRate: 0,
        producingRate: 0,
        phaseIndex: 0,
    },
    getDataByTissueLineCode: async (payload: string) => {
        set((state) => ({...state, isLoading: true}));
        const { data } = await culturingPhaseControllerGetListCulturingPhasesByTissueLineCode(payload);
        set((state) => ({...state, isLoading: false, cellCultures: data}));
    }
}));
