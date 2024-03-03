import { Button } from 'antd';
import React from 'react';

import { CustomButtonProps } from './ButtonType';

const AcceptButton: React.FC<CustomButtonProps> = ({
  type = 'primary',
  title,
  ...buttonProps
}) => (
  <Button type={type} {...buttonProps}>
    {title}
  </Button>
);

export default AcceptButton;
