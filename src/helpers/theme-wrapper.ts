import { Theme, themes } from '@/constants/theme';

const findColor = (name: string): Theme | undefined => {
  const theme = themes.find((theme) => theme.name === name);
  return theme ? theme : undefined;
};

export { findColor };
