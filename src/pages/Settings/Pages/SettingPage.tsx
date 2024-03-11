import {
    ApartmentOutlined,
    AppstoreOutlined,
    BookOutlined,
    GlobalOutlined,
    UnorderedListOutlined,
  } from '@ant-design/icons';
  import { Card, Col, Divider, Row, Typography } from 'antd';
  import { useNavigate } from 'react-router-dom';
  import React from 'react';
  
  const Node: React.FC<{ title: string; icon: React.ReactNode; url: string }> = ({
    title,
    icon,
    url,
  }) => {
    const navigate = useNavigate();
  
    return (
      <Col span={24} lg={8} xl={6}>
        <Card hoverable onClick={() => navigate(url)}>
          <div className="flex items-center space-x-6">
            {icon}
            <Typography.Title level={4} style={{ marginBottom: 0 }}>
              {title}
            </Typography.Title>
          </div>
        </Card>
      </Col>
    );
  };
  
  const SettingPage = () => {
  
    return (
      <Card className="h-screen">
        <Typography.Title level={4}>Setting</Typography.Title>
        <Divider />
        <Row gutter={[24, 24]}>
          <Node
            url="/settings/global"
            title='Global Setting'
            icon={<UnorderedListOutlined className="text-2xl" />}
          />
          <Node
            url="/settings/lov"
            title='List Of Values'
            icon={<BookOutlined className="text-2xl" />}
          />
          <Node
            url="/settings/department"
            title='Department'
            icon={<AppstoreOutlined className="text-2xl" />}
          />
          <Node
            url="/settings/office"
            title='Office'
            icon={<ApartmentOutlined className="text-2xl" />}
          />
          <Node
            url="/settings/environment"
            title='Enviroment'
            icon={<GlobalOutlined className="text-2xl" />}
          />
          <Node
            url="/settings/team"
            title='Team'
            icon={<AppstoreOutlined className="text-2xl" />}
          />
        </Row>
      </Card>
    );
  }
  
  export default SettingPage;