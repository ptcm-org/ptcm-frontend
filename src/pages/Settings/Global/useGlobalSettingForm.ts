import { useEffect } from 'react';
import _isEmpty from 'lodash/isEmpty';
import { Form } from 'antd';

import { GlobalSettingDto } from '@/api/auth-proxies';
import {
  GSKey,
  GSTitle,
  globalSettingStore,
} from  '@/stores/globalSettingStore';

const useGlobalSettingForm = (key: GSKey, title: GSTitle) => {
  const [form] = Form.useForm<GlobalSettingDto>();
  const createGlobalSettingType = globalSettingStore(state => state.createGlobalSettingType);
  const updateGlobalSettingValue = globalSettingStore(state => state.updateGlobalSettingValue);
  const globalSettingData = globalSettingStore(state => state.globalData);

  const onFinish = (data: GlobalSettingDto) => {
    // if (globalSettingData[key].id)
    //   //update
    // else
    //   //create
  };

  useEffect(() => {
    form.setFieldsValue(globalSettingData[key]);
  }, [form, globalSettingData, key]);

  return { onFinish, form, globalSettingData };
};

export default useGlobalSettingForm;
