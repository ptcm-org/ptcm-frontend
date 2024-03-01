import React from 'react';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { CustomButtonProps } from './ButtonType';

const EditWithTitleButton: React.FC<CustomButtonProps> = ({
  icon,
  className,
  title,
  ...buttonProps
}) => (
  <Button
    icon={icon || <EditOutlined />}
    className={className + ' hover:border-orange-400 hover:text-orange-400'}
    {...buttonProps}
  >
    {title}
  </Button>
);

export default EditWithTitleButton;
