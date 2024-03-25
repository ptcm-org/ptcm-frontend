import { Card, Divider, Spin, Typography } from 'antd';
import { producingCellCultureStore } from '@/stores/producingCellCultureStore';
import { lookupTableStore } from '@/stores/lookupTableStore';
import CulturingCellForm from '../components/CulturingCellForm';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { userStore } from '@/stores/userStore';


const CreateCulturingCell = () => {
  const { id } = useParams();
  const isLoading = producingCellCultureStore(state => state.isLoading);
  const getdetailInitiateCulture = producingCellCultureStore(state => state.getdetailInitiateCulture);
  const getListBoxs = lookupTableStore(state => state.getListBoxs);
  const getListDishs = lookupTableStore(state => state.getListDishs);
  const getListEnvironments = producingCellCultureStore(state => state.getListEnvironments);
  const createCulturingCell = producingCellCultureStore(state => state.createCulturingCell);
  const getProfile = userStore(state => state.getProfile);
  const currentUser = userStore(state => state.currentUser);
  const initiateCulture = producingCellCultureStore(state => state.initiateCultureData.initiateCulture);

  const onFinish = async (value: any) => {
    console.log('submit data:', value);
    console.log('currentUser: ', currentUser);
    await createCulturingCell({
      ...value,
      employeeId: currentUser?.employeeData?.id || '',
      initiateCultureId: initiateCulture?.id || '',
      status: 'Active'
    });
  };

  useEffect(() => {
    if (id) {
        getdetailInitiateCulture(id);
    }
    getListBoxs();
    getListDishs();
    getListEnvironments();
    getProfile();
  },[]);

  return (
    <Card>
      <Typography.Title level={4}>
        Commit Culturing Cell
      </Typography.Title>
      <Divider />
      <Spin spinning={isLoading}>
        <CulturingCellForm type="create" onFinish={onFinish} />
      </Spin>
    </Card>
  );
}

export default CreateCulturingCell;