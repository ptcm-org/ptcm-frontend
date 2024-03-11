/**
 * export interface CreateOrderDto {
  actualBagsDelivered: number;
  actualDeliveryDate: string;
  actualTreesDelivered: number;
  batch: string;
  batchCode: string;
  cellCultureId: string; => NHom cay
  confirmationStatus: string;
  creatorId: string;
  customerContactInfo?: CreateOrderDtoCustomerContactInfo;
  customerInfo?: string;
  customerTissueLineCode: string;
  dateUploadedFile?: string;
  labNote?: string;
  labQuantityDelivered: number;
  labWeekDelivered: number;
  locationDelivered: string;
  orderFileUrl?: string;
  orderProducingStatus: string;
  orderType: string;
  quantityDelivered: number;
  tissueLineCode: string; ==> Ma giong
  weekDelivered: number;
  yearDelivered: number;
}
 */

import { Button, Col, DatePicker, Divider, Form, Input, InputNumber, Row, Select, Typography, notification } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs';
import { BATCH_DATA_OPTIONS, BLOCK_OPTIONS, DATE_FORMAT, TISSUE_CULTURE_LINE_OPTIONS } from '../constant';
import { ORDER_STATUS_OPTIONS, ORDER_TYPE_OPTIONS, WEEKSOFYEAR } from '@/utils/commonConstantData';
import Upload from 'antd/es/upload/Upload';
import {
  PlusOutlined,
} from '@ant-design/icons';

import { orderStore, Order } from '@/stores/orderStore';
import { lovStore } from '@/stores/lovStore';
import { useLovHook } from '@/pages/Settings/Lov/Hook';

export function OrderInfo({
    handleNextStep,
  }: {
    handleNextStep?: () => void;
  }) {

    const formRef = useRef(null);
    const order = orderStore(state => state.order);
    const saveOrder = orderStore(state => state.saveOrder);

    //Lov
    const lovData = lovStore(state => state.lovData);
    const getLovs = lovStore(state => state.getLovs);
    const { getOptions } = useLovHook([
      'batch',
      'batchCode',
      'block',
      'coustomer',
      'tissueLineCode',
      'cellCulture'
    ]);
  
    useEffect(() => {
       getLovs();
    },[]);

    useEffect(() => {
      if (formRef.current) {
        (formRef.current as any).setFieldsValue(order);
      }
    }, [order]);


    const handleNextClick = () => {
    //save Order Info to store
    if (formRef.current) {
      (formRef.current as any).submit();
    }
    handleNextStep && handleNextStep();
  };



    const onFinish = (values: Order) => {
      saveOrder(values);
      console.log('final order:', order)
    };

    return (
        <div>
          <Row justify="center">
            <Col span={24}>
              <div className="flex flex-col justify-center items-center m-5">
                <Typography.Title level={4}>
                  Order Info
                </Typography.Title>
              </div>
              <Divider />
              <Form labelAlign="left" layout="vertical" onFinish={onFinish}  ref={formRef}>
                <Row gutter={24}>
                  <Col md={6} span={24}>
                    <Form.Item
                      label='Batch'
                      name="batch"
                      rules={[{ required: true }]}
                    >
                      <Select 
                        showSearch 
                        options={getOptions.batch}
                        placeholder='--Select One--'
                       />
                    </Form.Item>
                  </Col>
                  <Col span={24} md={6}>
                    <Form.Item label='Batch Code' name="batchCode">
                      <Select
                        showSearch
                        options={getOptions.batchCode} placeholder='--Select One--'
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24} md={6}>
                    <Form.Item label='Tissue Line Code (Customer)' name="customerTissueLineCode">
                      <Select
                        showSearch
                        options={getOptions.tissueLineCode} placeholder='--Select One--'
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24} md={6}>
                    <Form.Item label='Tissue Line Code' name="tissueLineCode">
                      <Select
                        showSearch
                        options={getOptions.tissueLineCode} 
                        placeholder='--Select One--'
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24} md={6}>
                    <Form.Item label='Quantity Delivered' name="quantityDelivered">
                    <InputNumber min={1} className="w-full" />
                    </Form.Item>
                  </Col>
                  <Col span={24} md={6}>
                    <Form.Item label='Week Delivered' name="weekDelivered">
                    <Select
                        showSearch
                        options={WEEKSOFYEAR}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24} md={6}>
                    <Form.Item label='Year Delivered' name="yearDelivered">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={24} md={6}>
                    <Form.Item label='Location Delivered' name="locationDelivered">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={24} md={6}>
                    <Form.Item label='Confirm(lab)' name="confirmationStatus">
                      <Select
                        showSearch
                        options={ORDER_STATUS_OPTIONS}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24} md={6}>
                    <Form.Item label='Quantity(lab)' name="labQuantityDelivered">
                      <InputNumber min={1} className="w-full" />
                    </Form.Item>
                  </Col>
                  <Col span={24} md={6}>
                    <Form.Item label='Week Delivered(lab)' name="labWeekDelivered">
                      <Select
                        showSearch
                        options={WEEKSOFYEAR}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24} md={6}>
                    <Form.Item label='Contact Info' name="customerInfo">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={24} md={6}>
                    <Form.Item label='Note(lab)' name="labNote">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={24} md={6}>
                    <Form.Item label='Cell Culture Group' name="cellCultureId">
                      <Select
                        showSearch
                        options={getOptions.cellCulture} 
                        placeholder='--Select One--'
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24} md={6}>
                    <Form.Item label='Customer' name="customerId">
                      <Select
                        showSearch
                        options={getOptions.coustomer} 
                        placeholder='--Select One--'
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24} md={6}>
                    <Form.Item
                      label='Actual Delivery Date'
                      name="actualDeliveryDate"
                      rules={[{ required: false }]}
                    >
                      <DatePicker
                        className="w-full"
                        format={DATE_FORMAT}
                        disabledDate={d => !d || d.isAfter(dayjs())}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24} md={6}>
                    <Form.Item label='Actual Bags Delivered' name="actualBagsDelivered">
                      <InputNumber min={1} className="w-full" />
                    </Form.Item>
                  </Col>
                  <Col span={24} md={6}>
                    <Form.Item label='Actual Trees Delivered' name="actualTreesDelivered">
                      <InputNumber min={1} className="w-full" />
                    </Form.Item>
                  </Col>
                  <Col span={24} md={6}>
                    <Form.Item label='Order Type' name="orderType">
                      <Select
                        showSearch
                        options={ORDER_TYPE_OPTIONS}
                      />
                    </Form.Item>
                  </Col>
                  <Divider />
                  <Col span={24}>
                    <Form.Item label='Files'>
                      <Upload listType="picture-card" accept=".jpg,.pdf" multiple>
                        <div>
                          <PlusOutlined />
                        </div>
                      </Upload>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
          <div className="text-right bg-green-700 p-3 mt-8 rounded">
            <Button type="primary" className="text-right" onClick={handleNextClick}>
              Next
            </Button>
          </div>
        </div>
      )
}
