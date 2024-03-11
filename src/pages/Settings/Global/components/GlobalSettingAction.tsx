import React from 'react';
import { Button, Col, Divider, Form, Space, Switch, Tooltip } from 'antd';

import { GlobalSettingDtoValue } from '@/api/auth-proxies';

const GlobalSettingAction: React.FC<{ value: GlobalSettingDtoValue }> = ({
  value,
}) => {
  const form = Form.useFormInstance();
  const changedValue = Form.useWatch('value', form);

  return (
    <Col span={6}>
      <Space size={12} split={<Divider type="vertical" />}>
        <Button disabled={changedValue === value} htmlType="submit">
          Save
        </Button>
        <Tooltip title="Set editable for other users.">
          <div>
            <Form.Item noStyle name={'editable'} valuePropName="checked">
              <Switch onChange={() => form.submit()} />
            </Form.Item>
          </div>
        </Tooltip>
      </Space>
    </Col>
  );
};

export default GlobalSettingAction;
