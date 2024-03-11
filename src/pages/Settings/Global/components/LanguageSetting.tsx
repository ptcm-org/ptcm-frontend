import React from 'react';
import Title from 'antd/es/typography/Title';
import { Col, Divider, Form, Row, Select } from 'antd';

import useGlobalSettingForm from '../useGlobalSettingForm';
import GlobalSettingAction from './GlobalSettingAction';
import { LANGUAGE_SETTING_OPTIONS } from '../../constant';

const LanguageSetting: React.FC = () => {
  const {
    form,
    globalSettingData: { language, isLoading },
    onFinish,
  } = useGlobalSettingForm('language', 'Language');

  return (
    <Form form={form} onFinish={onFinish}>
      <Divider orientation="left" orientationMargin={0}>
        <Title level={5}>Language</Title>
      </Divider>
      <Row gutter={24}>
        <Col span={6}>
          <Form.Item noStyle name={'value'}>
            <Select
              loading={isLoading}
              className="w-full"
              options={LANGUAGE_SETTING_OPTIONS}
            />
          </Form.Item>
        </Col>
        <GlobalSettingAction value={language.value} />
      </Row>
    </Form>
  );
};

export default LanguageSetting;
