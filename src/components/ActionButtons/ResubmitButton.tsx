import { SendOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { ButtonType } from 'antd/es/button';
import React from 'react';

interface ResubmitButtonProps {
  onClick?: () => void;
  type?: ButtonType;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  href?: string;
  title: string;
}

const ResubmitButton: React.FC<ResubmitButtonProps> = ({
  onClick,
  disabled,
  type,
  className,
  loading,
  href,
  title,
}) => {
  return (
    <Tooltip title={title}>
      <Button
        icon={<SendOutlined />}
        type={type}
        loading={loading}
        onClick={onClick}
        className={className + ' hover:border-cyan-700 hover:text-cyan-700'}
        disabled={disabled}
        href={href}
      />
    </Tooltip>
  );
};

export default ResubmitButton;
