import _isEmpty from 'lodash/isEmpty';
import Title from 'antd/es/typography/Title';
import { Card } from 'antd';

import LanguageSetting from '../components/LanguageSetting';

const GlobalSettingsPage = () => {
  return (
    <Card
      title={
        <Title level={4} style={{ marginBottom: 0 }}>
          Global Settings
        </Title>
      }
    >
      <LanguageSetting />
    </Card>
  );
}

export default GlobalSettingsPage;