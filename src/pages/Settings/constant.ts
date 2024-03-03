import { DefaultOptionType } from "antd/es/cascader";

export const LOV_CONFIG_LIST = [
    {
      key: 'phases',
      title: 'Phases',
    },
    {
        key: 'cleanRooms',
        title: 'Clean Rooms',
    },
    {
        key: 'shelves',
        title: 'Shelves',
    },
    {
      key: 'jobTitle',
      title: 'Job Title',
    },
    {
      key: 'employmentType',
      title: 'Employment Type',
    },
    {
      key: 'employmentStatus',
      title: 'Employment Status',
    },
    {
      key: 'contractType',
      title: 'Contract Type',
    },
  ] as const;
  
  export const GLOBAL_SETTING_CONFIG_LIST = [
    {
      key: 'national',
      title: 'National',
    },
    {
      key: 'language',
      title: 'Language',
    },
  ] as const;
  
  export const LANGUAGE_SETTING_OPTIONS: DefaultOptionType[] = [
    { label: 'English', value: 'en' },
    { label: 'Vietnamese', value: 'vi' },
  ];
  
  export const SOCIAL_SITE_OPTIONS: (DefaultOptionType & { color: string })[] = [
    {
      label: 'Facebook',
      value: 'Facebook',
      color: '#3b5999',
    },
    {
      label: 'LinkedIn',
      value: 'LinkedIn',
      color: '#55acee',
    },
    {
      label: 'Twitter',
      value: 'Twitter',
      color: '#55acee',
    },
  ];
  
  export const STATUS_OPTIONS: DefaultOptionType[] = [
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' },
  ];