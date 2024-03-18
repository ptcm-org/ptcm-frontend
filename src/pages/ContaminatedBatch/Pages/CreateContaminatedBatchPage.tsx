import { Card, Divider, Spin, Typography } from 'antd';
import { producingCellCultureStore } from '@/stores/producingCellCultureStore';
import ContaminatedBatchForm from '../components/ContaminatedBatchForm';


const CreateContaminatedBatchPage = () => {
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
        <ContaminatedBatchForm type="create" onFinish={onFinish} />
      </Spin>
    </Card>
  );
}

export default CreateContaminatedBatchPage;