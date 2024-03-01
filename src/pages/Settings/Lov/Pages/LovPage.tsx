import { Card, Collapse, Typography } from 'antd';

import LovContent from '../components/LovContent';
import { LOV_CONFIG_LIST } from '../../constant';
import { lovStore } from '@/stores/lovStore';
import { useEffect } from 'react';

const { Title } = Typography;
const LOVSettingPage = () => {
  const lovData = lovStore(state => state.lovData);
  const getLovs = lovStore(state => state.getLovs);

  useEffect(() => {
     getLovs();
  },[]);

  return (
    <Card
      className="mb-80"
      title={
        <Title level={4} style={{ marginBottom: 0 }}>
          List Of Value Settings
        </Title>
      }
    >
      <Collapse
        ghost
        destroyInactivePanel
        defaultActiveKey={LOV_CONFIG_LIST.map(item => item.key)}
      >
        {LOV_CONFIG_LIST.map(({ key, title }) => (
          <LovContent
            key={key}
            lovKey={key}
            title={title}
            data={lovData[key]?.value}
            isLoading={lovData[key]?.isLoading || lovData.isLoading}
            header={title}
          />
        ))}
      </Collapse>
    </Card>
  );
}

export default LOVSettingPage;