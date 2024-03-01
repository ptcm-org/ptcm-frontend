import React from 'react';
import { Button, Tooltip } from 'antd';
import { CustomButtonProps } from './ButtonType';
import { CloseOutlined } from '@ant-design/icons';

const CancelIconButton: React.FC<CustomButtonProps> = ({
  icon,
  title,
  ...buttonProps
}) => (
  <Tooltip title={title}>
    <Button icon={icon || <CloseOutlined />} {...buttonProps} />
  </Tooltip>
);

export default CancelIconButton;
