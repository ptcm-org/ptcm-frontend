import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CustomButtonProps } from './ButtonType';

const CreateWithTitleButton: React.FC<CustomButtonProps> = ({
  icon,
  title,
  ...buttonProps
}) => (
  <Button icon={icon || <PlusOutlined />} {...buttonProps}>
    {title}
  </Button>
);

// rgb(84 143 16)
export default CreateWithTitleButton;
