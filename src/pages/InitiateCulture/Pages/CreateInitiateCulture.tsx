import { Card, Divider, Spin, Typography } from 'antd';
import InitiateCultureForm from '../components/InitiateCultureForm';
import { IInitiateCultureForm, producingCellCultureStore } from '@/stores/producingCellCultureStore';


const CreateInitiateCulture = () => {
  const isLoading = producingCellCultureStore(state => state.isLoading);
  const createInitiateCulture = producingCellCultureStore(state => state.createInitiateCulture);

  const onFinish = async (value: IInitiateCultureForm) => {
    console.log('submit data:', value);
    // const employeeObjects = value.employees.map((item) => ({id: item}));
    // console.log(employeeObjects);
    // await createInitiateCulture({
    //   ...value,
    //   employees: employeeObjects
    // });
    await createInitiateCulture(value);
  };

  return (
    <Card>
      <Typography.Title level={4}>
        Create Initiate Culture
      </Typography.Title>
      <Divider />
      <Spin spinning={isLoading}>
        <InitiateCultureForm type="create" onFinish={onFinish} />
      </Spin>
    </Card>
  );
}

export default CreateInitiateCulture;