import { DefaultOptionType } from "antd/es/cascader";

export const LOV_CONFIG_LIST = [
    {
      key: 'phases',
      title: 'Phases',
    },
    {
      key: 'batch',
      title: 'Batch',
    },
    {
      key: 'batchCode',
      title: 'Batch Code',
    },
    {
      key: 'block',
      title: 'Block',
    },
    {
      key: 'coustomer',
      title: 'Coustomer',
    },
    {
      key: 'tissueLineCode',
      title: 'Tissue Line Code',
    },
    {
      key: 'cellCulture',
      title: 'Cell Culture Group',
    },
    {
      key: 'jobTitle',
      title: 'Job Title',
    },
    {
      key: 'contractType',
      title: 'Contract Type',
    },
    {
      key: 'plantCode',
      title: 'Plant Code',
    },
    {
      key: 'infectionLevel',
      title: 'Infection Level',
    },
    {
      key: 'transaction',
      title: 'Transaction',
    },
    {
      key: 'cellCultureRoomStatus',
      title: 'Cell Culture Room Status',
    },
  ] as const;
  
  export const GLOBAL_SETTING_CONFIG_LIST = [
    // {
    //   key: 'national',
    //   title: 'National',
    // },
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