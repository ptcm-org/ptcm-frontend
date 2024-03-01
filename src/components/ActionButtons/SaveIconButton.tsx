import React from 'react';
import { Button, Tooltip } from 'antd';
import { CustomButtonProps } from './ButtonType';
import { CheckOutlined } from '@ant-design/icons';

const SaveIconButton: React.FC<CustomButtonProps> = ({
  icon,
  title,
  ...buttonProps
}) => (
  <Tooltip title={title}>
    <Button icon={icon || <CheckOutlined />} {...buttonProps} />
  </Tooltip>
);

export default SaveIconButton;
