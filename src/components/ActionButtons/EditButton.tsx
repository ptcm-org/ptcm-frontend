import React from 'react';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { CustomButtonProps } from './ButtonType';

const EditButton: React.FC<CustomButtonProps> = ({
  icon,
  className,
  title,
  ...buttonProps
}) => (
  <Tooltip title={title}>
    <Button
      icon={icon || <EditOutlined />}
      className={className + ' hover:border-orange-400 hover:text-orange-400'}
      {...buttonProps}
    />
  </Tooltip>
);

export default EditButton;
