import { Card, Divider, Spin, Typography } from 'antd';
import SubCulturingForm from '../components/SubCulturingForm';
import { ISubculturingForm, producingCellCultureStore } from '@/stores/producingCellCultureStore';
import { Outlet, useParams } from 'react-router-dom';
import { useEffect } from 'react';
const  UpdateSubCulturingPage = () => {
    const { id } = useParams();
    const isLoading = producingCellCultureStore(state => state.isLoading);
    const getDetailSubculturing = producingCellCultureStore(state => state.getDetailSubculturing);
    const updateSubculturing = producingCellCultureStore(state => state.updateSubculturing);
    const subculturing = producingCellCultureStore(state => state.subculturingData.subculturing);
    const onFinish = async (value: ISubculturingForm) => {
        console.log('submit data:', value);
        await updateSubculturing({
          id: subculturing ? subculturing.id : '',
          subculturing: {
            ...value
          }
        });
      };

      useEffect(() => {
        if (id) {
          getDetailSubculturing(id);
        }
      },[]);
      
    return (
        <Card>
          <Typography.Title level={4}>
            Update Subculturing
          </Typography.Title>
          <Divider />
          <Spin spinning={isLoading}>
            <SubCulturingForm type="update" onFinish={onFinish} />
          </Spin>
        </Card>
      );
}

export default UpdateSubCulturingPage;