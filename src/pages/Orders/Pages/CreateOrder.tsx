import {
    Card,
    Divider,
    Form,
    Popover,
    Steps,
    StepsProps,
    Typography,
  } from 'antd';
  import React, { useState } from 'react'
  import { OrderInfo } from '../components/OderInfo';
  import { PlanInfo } from '../components/PlanInfo';
  import { VerifyInfo } from '../components/VerifyInfo';
  
  const CreateOrder = () => {
  
    const [currentStep, setCurrentStep] = useState(0);
  
    const customDot: StepsProps['progressDot'] = dot => <Popover>{dot}</Popover>;
    const handleNextStep = () => {
      setCurrentStep(prevStep => prevStep + 1);
    };
  
    const handleBackStep = () => {
      setCurrentStep(prevStep => prevStep - 1);
    };
  
    const steps = [
      {
        content: <OrderInfo handleNextStep={handleNextStep} />,
      },
      {
        content: (
          <PlanInfo
            handleBackStep={handleBackStep}
            handleNextStep={handleNextStep}
          />
        ),
      },
  
      {
        content: (
          <Form.Item>
            <VerifyInfo handleBackStep={handleBackStep} />
          </Form.Item>
        ),
      },
    ];
  
    return (
      <Card>
        <Typography.Title level={3}>
          Create Plan
        </Typography.Title>
        <Divider />
        <Steps
          current={currentStep}
          progressDot={customDot}
          items={[
            {
              title: 'Order Information',
            },
            {
              title: 'Plan Information',
            },
            {
              title: 'Submit',
            },
          ]}
        />
        <div>{steps[currentStep].content}</div>
      </Card>
    );
  }

  export default CreateOrder;
  