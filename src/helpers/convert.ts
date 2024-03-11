interface Employee {
  firstName: string;
  middleName?: string;
  lastName: string;
}

const generateFullName = (employee: Employee): string => {
  return `${employee.firstName} ${employee.middleName ? employee.middleName + ' ' : ''}${employee.lastName}`;
};

type LabelFunction<T> = (obj: T) => string;

type ConvertArrayToObjectArray = {
  <T extends Record<any, any>, K extends keyof T>(
    arr: T[] | undefined,
    keyName: K,
    labelName?: keyof T,
    labelFunction?: LabelFunction<T>,
  ): Array<{ key: T[K]; label: string }> | undefined;
};

const convertArrayToObjectArray: ConvertArrayToObjectArray = (arr, keyName, labelName, labelFunction) => {
  return arr?.map((obj) => {
    const key = obj[keyName];
    let label = '';
    if (labelName && obj[labelName] !== undefined) {
      label = obj[labelName].toString();
    } else if (labelFunction) {
      label = labelFunction(obj);
    }
    return { key, label };
  });
};

export { generateFullName, convertArrayToObjectArray };
