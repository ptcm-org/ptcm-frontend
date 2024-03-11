import { Button, Col, Form, Row, Spin, Typography } from 'antd';
import React, { useState } from 'react'
import OrderView from './OrderView';
import PlanView from './PlanView';
import { orderStore } from '@/stores/orderStore';

export function VerifyInfo({
    handleBackStep,
  }: {
    handleBackStep?: () => void;
  }) {
  
    const createOrder = orderStore(state => state.createOrder);
    const order = orderStore(state => state.order);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleBackClick = () => {
      console.log('Back');
      handleBackStep && handleBackStep();
    };

    const handleCreateOrderClick = async () => {
      console.log('Create ORder');
      await createOrder({...order, creatorId: '65e48b2f814ae83fbafd93b8', orderProducingStatus: 'Pending' });
    };

  return (
    <div>
        <Row justify="center" align={'bottom'}>
          <Col span={24}>
            <OrderView />
          </Col>
          <Col span={24}>
            <PlanView />
          </Col>
          {/* <div className="flex justify-end w-[50%]">
            <Button type="default" onClick={handleCreateOrderClick}>
              Create Order
            </Button>
          </div> */}
        </Row>
        <div className="flex items-center bg-green-700 p-3 mt-8 rounded">
          <div className="flex justify-start w-[50%]">
            <Button type="default" onClick={handleBackClick}>
              Back
            </Button>
          </div>
          <div className="flex justify-end w-[50%]">
            <Button type="default" onClick={handleCreateOrderClick}>
              Create Order
            </Button>
          </div>
        </div>
      </div>
  )
}
