import { Card, Divider, Spin, Typography } from 'antd';
import { producingCellCultureStore } from '@/stores/producingCellCultureStore';
import CellCultureRoomForm from '../components/CellCultureRoomForm';


const CreateCellCultureRoomPage = () => {
  const isLoading = producingCellCultureStore(state => state.isLoading);

  const onFinish = async (value: any) => {
    console.log('submit data:', value);
  };

  return (
    <Card>
      <Typography.Title level={4}>
        Create CellCulture Room
      </Typography.Title>
      <Divider />
      <Spin spinning={isLoading}>
        <CellCultureRoomForm type='create' onFinish={onFinish} />
      </Spin>
    </Card>
  );
}

export default CreateCellCultureRoomPage;