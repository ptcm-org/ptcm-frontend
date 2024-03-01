import React from 'react';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { CustomButtonProps } from './ButtonType';

const DeleteButton: React.FC<CustomButtonProps> = ({
  icon,
  className,
  title,
  ...buttonProps
}) => (
  <Tooltip title={title}>
    <Button
      icon={icon || <DeleteOutlined />}
      className={className + ' hover:border-red-700 hover:text-red-700'}
      {...buttonProps}
    />
  </Tooltip>
);

export default DeleteButton;
