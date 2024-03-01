import React from 'react';
import { Button } from 'antd';
import { CustomButtonProps } from './ButtonType';

const CommentButton: React.FC<CustomButtonProps> = ({
  type = 'primary',
  className,
  title,
  ...buttonProps
}) => (
  <Button
    type={type}
    className={className + ' bg-gray-600 hover:bg-gray-500'}
    {...buttonProps}
  >
    {title}
  </Button>
);

export default CommentButton;
