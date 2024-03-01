import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CustomButtonProps } from './ButtonType';

const CreateButton: React.FC<CustomButtonProps> = ({
  icon,
  title,
  ...buttonProps
}) => (
  <Button icon={icon || <PlusOutlined />} {...buttonProps}>
    {title}
  </Button>
);

export default CreateButton;
