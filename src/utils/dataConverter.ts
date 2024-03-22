import { InitiateCultureDto } from "@/api/auth-proxies";
import { InitiateCultureItem } from "./commonConstantData";
import clsx from "clsx";
import dayjs from "dayjs";
import { calculateWeekOrderInYear } from "@/lib/planningCalulate";

export const InitiateCultureToItem = (data: InitiateCultureDto): InitiateCultureItem[] => {
    const result = data?.employees?.map((item) => {
        const employeeData = JSON.parse(item);
        return {
            id: data.id + '-' + employeeData._id,
            initiatecultureId: data.id,
            batchCode: data.batchCode,
            initiatecultureDate: data.initiatecultureDate,
            tissueCultureLineCode: data.tissueCultureLineCode,
            motherStock: data.motherStock,
            notes: data.notes,
            employee: clsx(employeeData.employeeId, '-', employeeData.firstName, employeeData.middleName, employeeData.lastName).toLocaleLowerCase(),
            plantCloning: data.plantCloning,
            weeks: calculateWeekOrderInYear(dayjs(data.initiatecultureDate)).toString(),
            customerWeeks: data.customerWeeks.toString(),
            cellCultureCode: data.cellCultureCode,
            status: 'Active'
        }
    })
    return result;
}

export const ListInitiateCultureToItems = (data: InitiateCultureDto[]): InitiateCultureItem[] => {
    const result = data.map((item) => {
        return InitiateCultureToItem(item)
    })
    return result.flat();
}