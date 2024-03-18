import { Card, Divider, Spin, Typography } from 'antd';
import { producingCellCultureStore } from '@/stores/producingCellCultureStore';
import CulturingCellForm from '../components/CulturingCellForm';


const CreateCulturingCell = () => {
  const isLoading = producingCellCultureStore(state => state.isLoading);

  const onFinish = async (value: any) => {
    console.log('submit data:', value);
  };

  return (
    <Card>
      <Typography.Title level={4}>
        Create Initiate Culture
      </Typography.Title>
      <Divider />
      <Spin spinning={isLoading}>
        <CulturingCellForm type="create" onFinish={onFinish} />
      </Spin>
    </Card>
  );
}

export default CreateCulturingCell;