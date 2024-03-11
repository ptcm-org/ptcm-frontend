import { PhaseParamEntity, ProductionStep } from "../pages/Orders/constant";
// import * as dayjs from 'dayjs'
// import * as weekOfYear from 'dayjs/plugin/weekOfYear';

// dayjs.extend(weekOfYear);
import dayjs, { extend } from 'dayjs';  // Import extend function along with dayjs
import weekOfYear from 'dayjs/plugin/weekOfYear';

extend(weekOfYear);  // Extend dayjs with the weekOfYear plugin


export const calculateWeeksBetweenDates = (startDate: dayjs.Dayjs, endDate: dayjs.Dayjs): number => {
    const duration = endDate.diff(startDate, 'week');
    return duration;
}

export const calculateWeekOrderInYear = (date: dayjs.Dayjs): number => {
    const weekOrder = date.week();
    return weekOrder;
}

export const reshapePlanByTimeLine = (plan: ProductionStep[]): ProductionStep[] => {
    return [];
}

export const reshapePlan = (currentIndex: number, plan: ProductionStep[]): ProductionStep[] => {
    let result: ProductionStep[] = [];
    const planSize = plan.length;
    let currentAmount = plan[currentIndex].planningCluster;
    result = plan.slice(0, currentIndex + 1);
    for(let i = currentIndex + 1; i < planSize; i++) {
        currentAmount = Math.ceil(currentAmount * (plan[i-1].phaseRate - plan[i-1].infectionRate * plan[i-1].phaseRate));
        plan[i].planningCluster = currentAmount;
        result = [...result, {...plan[i],  planningCluster: currentAmount}];
    }

    return result;
}

export const buildPlan = (amount: number,weeks: number, params: PhaseParamEntity[]): ProductionStep[] => {
    let result: ProductionStep[] = [];
    const requiredSteps = ['ORDER', 'GIAO', 'SLTG', 'TC', 'CMT'];
    let currentAmount = amount;
    let availableWeeks = weeks;
    //required phases.
    requiredSteps.forEach(phase => {
        const phaseParam = params.find(p => p.phaseCode === phase);        
        if (phaseParam) {
            const step: ProductionStep = {
                phaseCode: phase,
                phaseName: phaseParam.phaseName,
                planningWeek: phaseParam.numOfWeek,
                planningYear: 0,
                planningCluster: currentAmount,
                planningBags: 0,
                planningEnvironment: phaseParam.phaseEnvironment,
                phaseRate: phaseParam.phaseFactor,
                infectionRate: phaseParam.infectionRate,
                planningRate: 0
            };
            result.unshift(step);

            //calculate currentAmount and availableWeeks
            currentAmount = phaseParam.phaseFactor - phaseParam.infectionRate * phaseParam.phaseFactor !== 0 ? 
                Math.ceil(currentAmount / (phaseParam.phaseFactor - phaseParam.infectionRate * phaseParam.phaseFactor)) : 1;
            availableWeeks -= phaseParam.numOfWeek;
        }
    });

    //X phase
    while (currentAmount > 0 && availableWeeks > 0) {
        const phaseParam = params.find(p => p.phaseCode === 'X');
        if (phaseParam) {
            const step: ProductionStep = {
                phaseCode: 'X',
                phaseName: phaseParam.phaseName,
                planningWeek: phaseParam.numOfWeek,
                planningYear: 0,
                planningCluster: currentAmount,
                planningBags: 0,
                planningEnvironment: phaseParam.phaseEnvironment,
                phaseRate: phaseParam.phaseFactor,
                infectionRate: phaseParam.infectionRate,
                planningRate: 0
            };
            result.unshift(step);
            //Calculate currentAmount and availableWeeks
            currentAmount = phaseParam.phaseFactor - phaseParam.infectionRate * phaseParam.phaseFactor !== 0 ?
                Math.ceil(currentAmount / (phaseParam.phaseFactor - phaseParam.infectionRate * phaseParam.phaseFactor)) : 1;
            availableWeeks -= phaseParam.numOfWeek;
        }
    }

    return result;
}