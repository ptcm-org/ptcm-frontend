import { DefaultOptionType } from 'antd/es/select';

import { LovDto } from '@/api/auth-proxies';
import { lovStore, LovKey } from '@/stores/lovStore';

type LovValue<T extends LovKey> = {
  [K in T]: (id: string) => string | undefined;
};
type LovOption<T extends LovKey> = {
  [K in T]: DefaultOptionType[];
};

export function useLovHook<T extends LovKey>(
  keys: T[],
): {
  getValue: LovValue<T>;
  getOptions: LovOption<T>;
} {
  
  const lovData = lovStore(state => state.lovData);
  const getValue = {} as LovValue<T>;
  const getOptions = {} as LovOption<T>;

  keys.map(key => {
    getValue[key] = (id: string) =>
      lovData[key].value.find(item => item.id === id)?.lovCd;
    getOptions[key] = lovData[key].value
      .filter(item => item.isActive)
      .map(
        ({ id, lovCd, isActive }): DefaultOptionType => ({
          label: lovCd,
          value: id,
          disabled: !isActive,
        }),
      );
  });

  return { getValue, getOptions };
}

export const getLovValue = (lovData: LovDto[], id: string) =>
  lovData.find(item => item.id === id)?.lovCd;

export const getLovOptions = (lovData: LovDto[]) =>
  lovData &&
  lovData
    .filter(item => item.isActive)
    .map(
      ({ id, lovCd, isActive }): DefaultOptionType => ({
        label: lovCd,
        value: id,
        disabled: !isActive,
      }),
    );
