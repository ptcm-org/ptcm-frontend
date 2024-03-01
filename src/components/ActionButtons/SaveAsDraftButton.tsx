import React from 'react';
import { Button } from 'antd';
import { CustomButtonProps } from './ButtonType';

const SaveAsDraftButton: React.FC<CustomButtonProps> = ({
  type = 'primary',
  className,
  title,
  ...buttonProps
}) => (
  <Button
    type={type}
    className={className + ' bg-yellow-700 hover:bg-yellow-600'}
    {...buttonProps}
  >
    {title}
  </Button>
);

export default SaveAsDraftButton;
