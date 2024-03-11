import type { ColumnsType } from 'antd/es/table';
import { DefaultOptionType } from 'antd/es/select';

export type PlanDto = {
    id: string;
    tissueCultureLine: string | undefined;
    batchCode: string | undefined;
    groupCode: string | undefined;
    block: string | undefined;
    phase: string;
    phaseFactor: number;
    phaseInfectionPercentange: string;
    phaseInfectionRate: number;
    phaseInfectionRateUnit: string;
    phaseInfectionRateUnitType: string;
    phaseYear: number;
    phaseWeek: number;
    clusterCustomer: number;
    phaseNumOfBag: number;
    phaseEnvironmentCode: string | undefined;
};

export type TissueCultureLineDto = {
    id: string;
    tissueCode: string;
    tissueName: string;
    tissueDescription: string;
};

export type PhaseDto = {
    id: string;
    phaseCode: string;
    phaseName: string;
    phaseDescription: string | undefined;
};

export type CellCultureGoup = {
    id: string;
    cellGroupCode: string;
    cellGroupName: string;
    cellGroupDescription: string;
};

export type CycleDto = {
    id: string;
    phaseCode: string;
    cycleName: string;
    cycleNumOfWeek: number;
    cycleDescription: string;
};

export type PhaseParamEntity = {
    phaseCode: string;
    phaseName: string;
    numOfWeek: number;
    infectionRate: number;
    phaseFactor: number;
    phaseEnvironment: string;
};

export type ProductionStep = {
    phaseCode: string;
    phaseName: string;
    phaseRate: number;
    infectionRate: number;
    planningRate: number;
    planningWeek: number;
    planningYear: number;
    planningCluster: number;
    planningBags: number;
    planningEnvironment: string;
}

export const BATCH_DATA_OPTIONS: DefaultOptionType[] = [
    {
        label: 'BATCH 0001',
        value: 'batch_0001'
    },
    {
        label: 'BATCH 0002',
        value: 'batch_0002'
    },
    {
        label: 'BATCH 0003',
        value: 'batch_0003'
    }
];
export const TISSUE_CULTURE_LINE_OPTIONS: DefaultOptionType[] = [
    {
        label: 'TISSUE 0001',
        value: 'tissue_0001'
    },
    {
        label: 'TISSUE 0002',
        value: 'tissue_0002'
    },
    {
        label: 'TISSUE 0003',
        value: 'tissue_0003'
    }
];

export const BLOCK_OPTIONS: DefaultOptionType[] = [
    {
        label: 'GER030_',
        value: 'GER030_'
    },
    {
        label: 'GER031_',
        value: 'GER031_'
    }
]

export const PHASE_OPTIONS: DefaultOptionType[] = [
    {
        label: 'X',
        value: 'X'
    },
    {
        label: 'CMT',
        value: 'CMT'
    },
    {
        label: 'TC',
        value: 'TC'
    },
    {
        label: 'SLTG',
        value: 'SLTG'
    },
    {
        label: 'GIAO',
        value: 'GIAO'
    },
    {
        label: 'ORDER',
        value: 'ORDER'
    }
];

export const GROUP_OPTIONS: DefaultOptionType[] = [
    {
        label: 'GGKT',
        value: 'GGKT'
    },
    {
        label: 'V1',
        value: 'V1'
    },
    {
        label: 'V2',
        value: 'V2'
    },
    {
        label: 'V3',
        value: 'V3'
    },
    {
        label: 'V4',
        value: 'V4'
    }
];

export const CUSTOMER_OPTIONS: DefaultOptionType[] = [
    {
        label: 'Customer 0001',
        value: 'customer 0001'
    },
    {
        label: 'Customer 0002',
        value: 'customer 0002'
    },
    {
        label: 'Customer 0003',
        value: 'customer 0003'
    }
];

export const PRODUCTION_PARAMETER_OPTIONS = [
    {
        tissueCode: '96-351-0001',
        tissueName: 'LY0004',
        cellGroupCode: 'V3',
        productionRates: [
            {
                phaseCode: 'X',
                phaseRate: 2.2,
                infectionRate: 0.07,
            },
            {
                phaseCode: 'TC',
                phaseRate: 2,
                infectionRate: 0.07,
            },
            {
                phaseCode: 'CMT',
                phaseRate: 2.2,
                infectionRate: 0.07,
            },
            {
                phaseCode: 'GIAO',
                phaseRate: 1,
                infectionRate: 0.07,
            },
        ],
        cycleWeek: [
            {
                phaseCode: 'X',
                weeks: 4,
            },
            {
                phaseCode: 'TC',
                weeks: 2,
            },
            {
                phaseCode: 'CMT',
                weeks: 2,
            },
            {
                phaseCode: 'GIAO',
                weeks: 1,
            },
        ]
    },
    {
        tissueCode: '96-351-0002',
        tissueName: 'LY0009',
        cellGroupCode: 'V3',
        productionRates: [
            {
                phaseCode: 'X',
                phaseRate: 1.8,
                infectionRate: 0.07,
            },
            {
                phaseCode: 'TC',
                phaseRate: 1.8,
                infectionRate: 0.07,
            },
            {
                phaseCode: 'CMT',
                phaseRate: 1.8,
                infectionRate: 0.07,
            },
            {
                phaseCode: 'GIAO',
                phaseRate: 1,
                infectionRate: 0.07,
            },
        ],
        cycleWeek: [
            {
                phaseCode: 'X',
                weeks: 4,
            },
            {
                phaseCode: 'TC',
                weeks: 2,
            },
            {
                phaseCode: 'CMT',
                weeks: 2,
            },
            {
                phaseCode: 'GIAO',
                weeks: 1,
            },
        ]
    }
];

export const DATE_FORMAT = 'MM/DD/YYYY';

export const DAY_OF_THE_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const DAY_OF_THE_WEEK_ABB = [
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
  'sun',
];
