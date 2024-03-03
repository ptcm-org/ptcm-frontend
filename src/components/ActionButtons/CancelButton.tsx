import React from 'react';
import { Button } from 'antd';
import { CustomButtonProps } from './ButtonType';

const CancelButton: React.FC<CustomButtonProps> = ({
  className,
  title,
  ...buttonProps
}) => (
  <Button
    className={className + ' hover:border-gray-700 hover:text-gray-700'}
    {...buttonProps}
  >
    {title}
  </Button>
);

export default CancelButton;
