import { Button, Tooltip } from 'antd';
import React from 'react';

import { CustomButtonProps } from './ButtonType';

const RejectButton: React.FC<CustomButtonProps> = ({
  className,
  title,
  ...buttonProps
}) => (
  <Tooltip title={title}>
    <Button
      className={className + ' hover:border-red-700 hover:text-red-700'}
      {...buttonProps}
    />
  </Tooltip>
);

export default RejectButton;
