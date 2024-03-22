import { Card, Divider, Spin, Typography } from 'antd';
import InitiateCultureForm from '../components/InitiateCultureForm';
import { IInitiateCultureForm, producingCellCultureStore } from '@/stores/producingCellCultureStore';
import { Outlet, useParams } from 'react-router-dom';
import { useEffect } from 'react';
const  UpdateInitiateCulture = () => {
    const { id } = useParams();
    const isLoading = producingCellCultureStore(state => state.isLoading);
    const getdetailInitiateCulture = producingCellCultureStore(state => state.getdetailInitiateCulture);
    const updateInitiateCulture = producingCellCultureStore(state => state.updateInitiateCulture);
    const initiateCulture = producingCellCultureStore(state => state.initiateCultureData.initiateCulture);
    const onFinish = async (value: IInitiateCultureForm) => {
        console.log('submit data:', value);
        await updateInitiateCulture({
          id: initiateCulture ? initiateCulture.id : '',
          initiateCulture: {
            ...value
          }
        });
      };

      useEffect(() => {
        if (id) {
            getdetailInitiateCulture(id);
        }
      },[]);
      
    return (
        <Card>
          <Typography.Title level={4}>
            Update Initiate Culture
          </Typography.Title>
          <Divider />
          <Spin spinning={isLoading}>
            <InitiateCultureForm type="update" onFinish={onFinish} />
          </Spin>
        </Card>
      );
}

export default UpdateInitiateCulture;