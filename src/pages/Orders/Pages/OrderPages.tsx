import { CreateWithTitleButton, ViewButton } from '@/components/ActionButtons';
import { Button, Card, Col, Divider, Form, Input, Row, Select, Space, Table, TableColumnsType, Tag, Tooltip, Typography } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { EditOutlined, FilterOutlined } from '@ant-design/icons';
import { orderStore } from '@/stores/orderStore';
import { COMMON_DATE_FORMAT, ORDER_STATUS_OPTIONS, ORDER_TYPE_OPTIONS, WEEKSOFYEAR } from '@/utils/commonConstantData';
import { lovStore } from '@/stores/lovStore';
import { OrderDto } from '@/api/auth-proxies';
import { AlignType } from 'rc-table/lib/interface';
import { getLovValue, useLovHook } from '@/pages/Settings/Lov/Hook';
import dayjs from 'dayjs';


const  OrderPages = () => {
  const orders = orderStore(state => state.orders);
  const isLoading = orderStore(state => state.isLoading);
  const filterOrders = orderStore(state => state.filterOrders);
  const navigate = useNavigate();
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [filterForm] = Form.useForm();
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
    filterOrders();
    getLovs();
  },[]);


  const onFinish = (value: any) => {
    console.log(value);
    //Handle Filter
  };

  const ORDER_TABLE_COLUMS :  TableColumnsType<OrderDto> = [
    {
        title: 'Batch',
        dataIndex: 'batch',
        align: 'center' as AlignType,
        render: (_, record) =>
              getLovValue(lovData['batch'].value, record.batch),
    },
    {
        title: 'Batch Code',
        dataIndex: 'batchCode',
        align: 'center' as AlignType,
        render: (_, record) =>
              getLovValue(lovData['batchCode'].value, record.batchCode),
    },
    {
        title: 'Tissue Line Code (Customer)',
        dataIndex: 'customerTissueLineCode',
        align: 'center' as AlignType,
        render: (_, record) =>
              getLovValue(lovData['tissueLineCode'].value, record.customerTissueLineCode),
      },
      {
        title: 'Tissue Line Code',
        dataIndex: 'tissueLineCode',
        align: 'center' as AlignType,
        render: (_, record) =>
              getLovValue(lovData['tissueLineCode'].value, record.tissueLineCode),
      },
      {
        title: 'Year Delivered',
        dataIndex: 'yearDelivered',
        key: 'yearDelivered',
        align: 'center' as AlignType,
        sorter: (a, b) => a.yearDelivered - b.yearDelivered,
      },
      {
        title: 'Week Delivered',
        dataIndex: 'weekDelivered',
        key: 'weekDelivered',
        align: 'center' as AlignType,
        sorter: (a, b) => a.weekDelivered - b.weekDelivered,
      },
      {
        title: 'Quantity Delivered',
        dataIndex: 'quantityDelivered',
        key: 'quantityDelivered',
        align: 'center' as AlignType,
        sorter: (a, b) => a.quantityDelivered - b.quantityDelivered,
      },
      {
        title: 'Location Delivered',
        dataIndex: 'locationDelivered',
        key: 'locationDelivered',
        align: 'center' as AlignType,
      },
      {
        title: 'Confirm(lab)',
        dataIndex: 'confirmationStatus',
        key: 'confirmationStatus',
        align: 'center' as AlignType,
        render: (_, record) => (
          <>
            {record.confirmationStatus === 'Submited' ? (
              <Tag color="green">{record.confirmationStatus}</Tag>
            ) : (
              <Tag color="orange">{record.confirmationStatus}</Tag>
            )}
          </>
        ),
      },
      {
        title: 'Note(lab)',
        dataIndex: 'labNote',
        key: 'labNote',
        align: 'center' as AlignType,
      },
      {
        title: 'Files',
        dataIndex: 'orderFileUrl',
        key: 'orderFileUrl',
        align: 'center' as AlignType,
      },
      {
        title: 'Cell Culture Group',
        dataIndex: 'cellCultureId',
        align: 'center' as AlignType,
        render: (_, record) =>
              getLovValue(lovData['cellCulture'].value, record.cellCultureId),
      },
      {
        title: 'Actual Delivery Date',
        dataIndex: 'actualDeliveryDate',
        key: 'actualDeliveryDate',
        align: 'center' as AlignType,
        render: (_, record) =>
          dayjs(record.actualDeliveryDate).format(COMMON_DATE_FORMAT),
      },
      {
        title: 'Option',
        width: '10%',
        align: 'center',
        render: (_text, record) => (
          <Space>
            <ViewButton title="View" href='' />
            <Tooltip title="Edit">
              <Button
                icon={<EditOutlined />}
                href=''
              />
            </Tooltip>
          </Space>
        ),
      },
];
    
  return (
    <Card>
      <div className="flex items-start justify-between">
        <Typography.Title level={4}>
          Orders
        </Typography.Title>
        <div className="flex space-x-2">
          <Button
            onClick={() => setOpenFilter(!openFilter)}
            icon={<FilterOutlined />}
          >
            Filter
          </Button>
          <CreateWithTitleButton
            title='Create Order'
            onClick={() => navigate('/orders/create')}
          />
        </div>
      </div>
      <Divider />
      {openFilter ? (
        <Card className="mb-6">
          <Form layout="vertical" form={filterForm} onFinish={onFinish}>
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item label="Batch" name="batch">
                  <Select 
                    showSearch 
                    options={getOptions.batch}
                    placeholder='--Select One--'
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Batch Code" name="batchCode">
                  <Select 
                    showSearch 
                    options={getOptions.batchCode}
                    placeholder='--Select One--'
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Tissue Line Code (Customer)" name="customerTissueLineCode">
                  <Select
                    showSearch
                    options={getOptions.tissueLineCode} placeholder='--Select One--'
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Tissue Line Code" name="tissueLineCode">
                  <Select
                    showSearch
                    options={getOptions.tissueLineCode} 
                    placeholder='--Select One--'
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label='Week Delivered' name="weekDelivered">
                  <Select
                      showSearch
                      options={WEEKSOFYEAR}
                    />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label='Year Delivered' name="yearDelivered">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label='Customer' name="customerId">
                  <Select />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label='Order Type' name="orderType">
                  <Select
                    showSearch
                    options={ORDER_TYPE_OPTIONS}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label='Cell Culture Group' name="cellCultureId">
                  <Select
                    showSearch
                    options={getOptions.cellCulture} 
                    placeholder='--Select One--'
                  />
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item label='Location Delivered' name="locationDelivered">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label='Confirm(lab)' name="confirmationStatus">
                  <Select
                    showSearch
                    options={ORDER_STATUS_OPTIONS}
                  />
                </Form.Item>
              </Col>
            </Row>
            <div className="space-x-4 flex justify-end">
              <Button onClick={() => filterForm.resetFields()}>Reset</Button>
              <Button type="primary" htmlType="submit">
                Search
              </Button>
            </div>
          </Form>
        </Card>
      ) : null}
      <Table
        loading={isLoading}
        columns={ORDER_TABLE_COLUMS}
        bordered
        rowKey={(item) => item.id}
        dataSource={orders}
        scroll={{ x: 1300 }}
      />
    </Card>
  );
}

export default OrderPages;