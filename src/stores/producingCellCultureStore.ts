import { BioEmployeeDto, ContaminatedBatchDto, CreateContaminatedBatchDto, CreateCulturingCellDto, CreateInitiateCultureDto, CreateSubCulturingDto, CulturingCellDto, EnvironmentDto, InitiateCultureDto, SubculturingDto, UpdateCulturingCellDto, UpdateInitiateCultureDto, UpdateSubCulturingDto, bioEmployeeControllerGetEmployees, contaminatedBatchControllerCreateContaminatedBatch, contaminatedBatchControllerGetContaminatedBatchByBarCode, contaminatedBatchControllerGetContaminatedBatchById, contaminatedBatchControllerGetContaminatedBatchs, culturingCellControllerCreateCulturingCell, culturingCellControllerGetCulturingCells, culturingCellControllerUpdateCulturingCell, environmentControllerGetEnvironments, initiateCultureControllerCreateInitiateCulture, initiateCultureControllerGetInitiateCultureById, initiateCultureControllerGetListInitiateCultures, subculturingControllerCreateSubculturing, subculturingControllerGetListSubculturings, subculturingControllerGetSubculturingByBarCode, subculturingControllerGetSubculturingById, subculturingControllerUpdateSubculturing } from '@/api/auth-proxies';
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

export interface IInitiateCultureForm {
    id?: string;
    barCode: string;
    batchCode: string;
    cellCultureCode: string;
    customerWeeks: number;
    employees: string[];
    initiatecultureDate: string;
    motherStock: string;
    notes: string;
    numOfChildCluster: number;
    numOfMotherCluster: number;
    plantCloning: string;
    status: string;
    tissueCultureLineCode: string;
}

export interface ICulturingCellForm {
  id?: string;
  barCode: string;
  boxId: string;
  childCultureBags: number;
  childCultureCluster: number;
  description: string;
  dishId?: string;
  employeeId: string;
  environmentId: string;
  hourOfCulturing: number;
  initiateCultureId: string;
  minuteOfCulturing: number;
  motherCultureBags: number;
  motherCultureCluster: number;
  reviewStatus: string;
  status: string;
}

export interface ICellCultureRoomForm {

}

export interface IContaminatedBatchForm {
  barCode: string;
  batchCode: string;
  cellCultureCode: string;
  childBags: number;
  creatorId: string;
  culturingCellEmployeeId: string;
  culturingDate: string;
  customerWeeks: string;
  environmentCode: string;
  id?: string;
  infectionId: string;
  infectionLevel: string;
  motherStock: string;
  notes: string;
  phaseIndex: string;
  plantCloning: string;
  producingType: string;
  scanDate: string;
  status: string;
  tissueCultureLineCode: string;
  weeks: string;
}

type ProducingCellCultureState = {
    error: string | null;
    isLoading: boolean;
    subculturingData: {
        isLoading: false;
        subculturings: SubculturingDto[];
        subculturing: SubculturingDto | null;
    },
    initiateCultureData: {
        initiateCultures: InitiateCultureDto[],
        initiateCulture: InitiateCultureDto | null;
    },
    culturingCellData: {
        culturingCells: CulturingCellDto[];
        culTuringCell: CulturingCellDto | null;
    },
    cellCultureRoomData: {
        cellCultureRooms: [],
        cellCultureRoom: null,
    },
    contaminatedBatchData: {
        contaminatedBatchs: ContaminatedBatchDto[],
        contaminatedBatch: ContaminatedBatchDto | null,
    },
    environmentData: {
        environments: EnvironmentDto[]
    }
    employeeData: {
        employees: BioEmployeeDto[]
    }

    filterSubculturings: () => Promise<void>;
    createSubculturing: (payload: CreateSubCulturingDto) => Promise<void>;
    getDetailSubculturing: (id: string) => Promise<void>;
    getDetailSubculturingByBarCode: (barCode: string) => Promise<void>;
    updateSubculturing: (payload: UpdateSubCulturingDto) => Promise<void>;
    getListEnvironments: () => Promise<void>;
    getListEmployees: () => Promise<void>;
    createInitiateCulture: (payload: CreateInitiateCultureDto) => Promise<void>;
    filterInitiateCultures: () => Promise<void>;
    updateInitiateCulture: (payload: UpdateInitiateCultureDto) => Promise<void>;
    filterCulturingCells: () => Promise<void>;
    createCulturingCell: (payload: CreateCulturingCellDto) => Promise<void>;
    updateCulturingCell: (payload: UpdateCulturingCellDto) => Promise<void>;
    filterContaminateBatchs: () => Promise<void>;
    createContaminatedBatch: (payload: CreateContaminatedBatchDto) => Promise<void>;
    getDetailContaminateBatchById: (id: string) => Promise<void>;
    getDetailContaminateBatchByBarCode: (barCode: string) => Promise<void>;
}

export const producingCellCultureStore = create<ProducingCellCultureState>((set) => ({
    isLoading: false,
    error: null,
    subculturingData: {
        isLoading: false,
        subculturings: [],
        subculturing: null,
    },
    initiateCultureData: {
        initiateCultures : [],
        initiateCulture: null,
    },
    culturingCellData: {
        culturingCells: [],
        culTuringCell: null,
    },
    cellCultureRoomData: {
        cellCultureRooms: [],
        cellCultureRoom: null,
    },
    contaminatedBatchData: {
        contaminatedBatchs: [],
        contaminatedBatch:  null,
    },
    environmentData: {
        environments: [],
    },
    employeeData: {
        employees: [],
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
    getDetailSubculturingByBarCode: async (barCode: string) => {
        try {
            set({ isLoading: true, error: null });
            const { data } = await subculturingControllerGetSubculturingByBarCode(barCode);
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
    },
    getListEmployees: async () => {
        try {
            set({ isLoading: true, error: null });
            const { data } = await bioEmployeeControllerGetEmployees();
            set((state) => ({...state, isLoading: false, employeeData: { employees: data }}))
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },
    createInitiateCulture: async (payload: CreateInitiateCultureDto) => {
        try {
            set({ isLoading: true, error: null });
            const { data } = await initiateCultureControllerCreateInitiateCulture(payload);
            set({ isLoading: false });
            set((state) => ({...state, isLoading: false, initiateCultureData: { ...state.initiateCultureData, isLoading: false, initiateCulture: data }}))
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },
    filterInitiateCultures: async () => {
        try {
            set({ isLoading: true, error: null });
            const { data } = await initiateCultureControllerGetListInitiateCultures();
            set((state) => ({...state, isLoading: false, initiateCultureData: { ...state.initiateCultureData, initiateCultures: data }}))
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },
    updateInitiateCulture: async (payload: UpdateInitiateCultureDto) => {
        // try {
        //     set({ isLoading: true, error: null });
        //     const { data } = await ini(payload);
        //     set({ isLoading: false });
        //     set((state) => ({...state, isLoading: false, subculturingData: { ...state.subculturingData, isLoading: false, subculturing: data }}))
        // } catch (error: any) {
        //     set({ error: error.message, isLoading: false });
        // }
    },
    filterCulturingCells: async () => {
        try {
            set({ isLoading: true, error: null });
            const { data } = await culturingCellControllerGetCulturingCells();
            set((state) => ({...state, isLoading: false, culturingCellData: { ...state.culturingCellData, culturingCells: data }}))
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },
    createCulturingCell: async (payload: CreateCulturingCellDto) => {
        try {
            set({ isLoading: true, error: null });
            const { data } = await culturingCellControllerCreateCulturingCell(payload);
            set({ isLoading: false });
            set((state) => ({...state, isLoading: false, culturingCellData: { ...state.culturingCellData, culTuringCell: data }}))
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },
    updateCulturingCell: async (payload: UpdateCulturingCellDto) => {
        try {
            set({ isLoading: true, error: null });
            const { data } = await culturingCellControllerUpdateCulturingCell(payload);
            set({ isLoading: false });
            set((state) => ({...state, isLoading: false, culturingCellData: { ...state.culturingCellData, culTuringCell: data }}))
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },
    filterContaminateBatchs: async () => {
        try {
            set({ isLoading: true, error: null });
            const { data } = await contaminatedBatchControllerGetContaminatedBatchs();
            set((state) => ({...state, isLoading: false, contaminatedBatchData: { ...state.contaminatedBatchData, contaminatedBatch: data }}))
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },
    createContaminatedBatch: async (payload: CreateContaminatedBatchDto) => {
        try {
            set({ isLoading: true, error: null });
            const { data } = await contaminatedBatchControllerCreateContaminatedBatch(payload);
            set({ isLoading: false });
            set((state) => ({...state, isLoading: false, contaminatedBatchData: { ...state.contaminatedBatchData, contaminatedBatch: data }}))
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },
    getDetailContaminateBatchById: async (id: string) => {
        try {
            set({ isLoading: true, error: null });
            const { data } = await contaminatedBatchControllerGetContaminatedBatchById(id);
            set({ isLoading: false });
            set((state) => ({...state, isLoading: false, contaminatedBatchData: { ...state.contaminatedBatchData,  contaminatedBatch: data }}))
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },
    getDetailContaminateBatchByBarCode: async (barCode: string) => {
        try {
            set({ isLoading: true, error: null });
            const { data } = await contaminatedBatchControllerGetContaminatedBatchByBarCode(id);
            set({ isLoading: false });
            set((state) => ({...state, isLoading: false, contaminatedBatchData: { ...state.contaminatedBatchData,  contaminatedBatch: data }}))
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    }     
}));


