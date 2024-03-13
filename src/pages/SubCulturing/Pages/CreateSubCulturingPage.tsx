import { Card, Divider, Spin, Typography } from 'antd';
import SubCulturingForm from '../components/SubCulturingForm';
import { ISubculturingForm, producingCellCultureStore } from '@/stores/producingCellCultureStore';




const CreateSubCulturingPage = () => {
  const isLoading = producingCellCultureStore(state => state.isLoading);
  const createSubculturing = producingCellCultureStore(state => state.createSubculturing);

  const onFinish = async (value: ISubculturingForm) => {
    console.log('submit data:', value);
    await createSubculturing(value);
  };

  return (
    <Card>
      <Typography.Title level={4}>
        Create SubCulturing
      </Typography.Title>
      <Divider />
      <Spin spinning={isLoading}>
        <SubCulturingForm type="create" onFinish={onFinish} />
      </Spin>
    </Card>
  );
}

export default CreateSubCulturingPage;