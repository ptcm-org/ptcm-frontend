import React from 'react';
import { Button } from 'antd';
import { CustomButtonProps } from './ButtonType';

const SaveButton: React.FC<CustomButtonProps> = ({
  type = 'primary',
  title,
  ...buttonProps
}) => (
  <Button type={type} {...buttonProps}>
    {title}
  </Button>
);

export default SaveButton;
