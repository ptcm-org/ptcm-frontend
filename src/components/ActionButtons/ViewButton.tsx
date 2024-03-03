import React from 'react';
import { Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { CustomButtonProps } from './ButtonType';

const ViewButton: React.FC<CustomButtonProps> = ({
  icon,
  className,
  title,
  ...buttonProps
}) => {
  return (
    <Tooltip title={title}>
      <Button
        icon={icon || <EyeOutlined />}
        className={className + ' hover:border-cyan-700 hover:text-cyan-700'}
        {...buttonProps}
      />
    </Tooltip>
  );
};

export default ViewButton;
