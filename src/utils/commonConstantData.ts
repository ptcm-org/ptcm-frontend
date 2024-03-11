import { DefaultOptionType } from "antd/es/select";

export const WEEKSOFYEAR: DefaultOptionType[] = Array.from({ length: 52 }, (_, index) => ({
    label: `${index + 1}`,
    value: index + 1,
  }));

export const ORDER_STATUS_OPTIONS: DefaultOptionType[] = [
    {
        label: 'Pending',
        value: 'Pending'
    },
    {
        label: 'Submited',
        value: 'Submited'
    },
    {
        label: 'Review',
        value: 'Review'
    },
    {
        label: 'Confirmed',
        value: 'Confirmed'
    }
]

export const ORDER_TYPE_OPTIONS: DefaultOptionType[] = [
    {
        label: 'Export Orders Abroad',
        value: 'abroad'
    },
    {
        label: 'Domestic Orders',
        value: 'domestic'
    },
    {
        label: 'Preservation Orders',
        value: 'preservation'
    },
    {
        label: 'Other',
        value: 'other'
    }
]

export const COMMON_DATE_FORMAT = 'MMMM DD, YYYY';
export const DETAIL_DATE_FORMAT = 'dddd, MMMM D, YYYY h:mm A';
export const DATE_TIME_PICKER_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const COLOR_BY_ALPHABET = [
    { char: 'A', colorText: '#FF5733' },
    { char: 'B', colorText: '#006994' },
    { char: 'C', colorText: '#00FFFF' },
    { char: 'D', colorText: '#2F4F4F' },
    { char: 'E', colorText: '#50C878' },
    { char: 'F', colorText: '#FF00FF' },
    { char: 'G', colorText: '#008000' },
    { char: 'H', colorText: '#FF69B4' },
    { char: 'I', colorText: '#4B0082' },
    { char: 'J', colorText: '#00A86B' },
    { char: 'K', colorText: '#C3B091' },
    { char: 'L', colorText: '#6495ED' },
    { char: 'M', colorText: '#FF00FF' },
    { char: 'N', colorText: '#000080' },
    { char: 'O', colorText: '#808000' },
    { char: 'P', colorText: '#800080' },
    { char: 'Q', colorText: '#ADD8E6' },
    { char: 'R', colorText: '#FF0000' },
    { char: 'S', colorText: '#C0C0C0' },
    { char: 'T', colorText: '#008080' },
    { char: 'U', colorText: '#120A8F' },
    { char: 'V', colorText: '#8B00FF' },
    { char: 'W', colorText: '#F5DEB3' },
    { char: 'X', colorText: '#D19FE8' },
    { char: 'Y', colorText: '#FFFF00' },
    { char: 'Z', colorText: '#480404' },
  ];
  