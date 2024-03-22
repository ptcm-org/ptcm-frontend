import { CreateWithTitleButton, ViewButton } from "@/components/ActionButtons";
import { COMMON_DATE_FORMAT, DATE_TIME_PICKER_FORMAT, InitiateCultureItem, ORDER_STATUS_OPTIONS, ORDER_TYPE_OPTIONS, WEEKSOFYEAR } from "@/utils/commonConstantData";
import { Button, Card, Col, Divider, Form, Input, Radio, RadioChangeEvent, Row, Select, Space, Table, TableColumnsType, Tag, Tooltip, Typography } from "antd";
import { EditOutlined, FilterOutlined } from '@ant-design/icons';
import { lovStore } from "@/stores/lovStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLovHook, getLovValue } from "@/pages/Settings/Lov/Hook";
import { producingCellCultureStore } from "@/stores/producingCellCultureStore";
import { InitiateCultureDto } from "@/api/auth-proxies";
import { AlignType } from 'rc-table/lib/interface';
import dayjs from "dayjs";
import clsx from "clsx";
import { ListInitiateCultureToItems } from "@/utils/dataConverter";

const  InitiateCulturePages = () => {

    const lovData = lovStore(state => state.lovData);
    const navigate = useNavigate();
    const [openFilter, setOpenFilter] = useState<boolean>(false);
    const [filterForm] = Form.useForm();
    const getLovs = lovStore(state => state.getLovs);
    const { getOptions } = useLovHook([
        'batch',
        'batchCode',
        'block',
        'coustomer',
        'tissueLineCode',
        'cellCulture'
      ]);
    
    const filterSubculturings = producingCellCultureStore(state => state.filterSubculturings);
    const subculturingData = producingCellCultureStore(state => state.subculturingData);
    const isLoading = producingCellCultureStore(state => state.isLoading);
    const initiatecultures = producingCellCultureStore(state => state.initiateCultureData.initiateCultures);
    const filterInitiateCultures = producingCellCultureStore(state => state.filterInitiateCultures);
    const [display, setDisplay] = useState<string>('list');
    const onFinish = (value: any) => {
        console.log(value);
        //Handle Filter
      };

    useEffect(() => {
      getLovs();
      filterInitiateCultures();
    },[])

    const onChangeDisplay = ({ target: { value } }: RadioChangeEvent) => {
      console.log('radio checked', value);
      setDisplay(value);
    };


    const INITIATECULTURE_ITEM_TABLE_COLUMS : TableColumnsType<InitiateCultureItem> = [
      {
        title: 'Initiateculture Date',
        dataIndex: 'initiatecultureDate',
        key: 'initiatecultureDate',
        align: 'left' as AlignType,
        render: (_, record) =>
          <a href={`/initiateculture/${record.initiatecultureId}/update`} className="text-blue-800">{dayjs(record.initiatecultureDate).format('D-M-YYYY')}</a>,
      },
      {
        title: 'Employee',
        dataIndex: 'employee',
        key: 'employee',
        align: 'left' as AlignType,
      },
      {
        title: 'Batch',
        dataIndex: 'batch',
        align: 'center' as AlignType,
        render: (_, record) =>
              getLovValue(lovData['batchCode'].value, record.batchCode),
      },
      {
        title: 'Tissue Line Code',
        dataIndex: 'tissueCultureLineCode',
        align: 'center' as AlignType,
        render: (_, record) =>
              getLovValue(lovData['tissueLineCode'].value, record.tissueCultureLineCode),
      },
      {
        title: 'Mother Stock',
        dataIndex: 'motherStock',
        align: 'center' as AlignType,
      },
      {
        title: 'Plant Code',
        dataIndex: 'plantCloning',
        key: 'plantCloning',
        align: 'center' as AlignType,
        render: (_, record) =>
              getLovValue(lovData['plantCode'].value, record.plantCloning),
      },
      {
        title: 'Cell Culture Code',
        dataIndex: 'cellCultureCode',
        align: 'center' as AlignType,
        render: (_, record) =>
              getLovValue(lovData['cellCulture'].value, record.cellCultureCode),
      },
      {
        title: 'Weeks',
        dataIndex: 'weeks',
        key: 'weeks',
        align: 'center' as AlignType,
      },
      {
        title: 'Customer Weeks',
        dataIndex: 'customerWeeks',
        key: 'customerWeeks',
        align: 'center' as AlignType,
      },
      {
        title: 'Notes',
        dataIndex: 'notes',
        key: 'notes',
        align: 'left' as AlignType,
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
                href={`/initiateculture/${record.initiatecultureId}/update`}
              />
            </Tooltip>
          </Space>
        ),
      },
    ];

    const INITIATECULTURE_TABLE_COLUMS :  TableColumnsType<InitiateCultureDto> = [
      {
        title: 'Initiateculture Date',
        dataIndex: 'initiatecultureDate',
        key: 'initiatecultureDate',
        align: 'center' as AlignType,
        render: (_, record) =>
          <a href={`/initiateculture/${record.id}/update`} className="text-blue-800">{dayjs(record.initiatecultureDate).format('D-M-YYYY')}</a>,
      },
      {
          title: 'Batch',
          dataIndex: 'batch',
          align: 'center' as AlignType,
          render: (_, record) =>
                getLovValue(lovData['batchCode'].value, record.batchCode),
      },
      {
          title: 'Barcode',
          dataIndex: 'barCode',
          key: 'barCode',
          align: 'center' as AlignType,
      },
      {
        title: 'Tissue Line Code',
        dataIndex: 'tissueCultureLineCode',
        align: 'center' as AlignType,
        render: (_, record) =>
              getLovValue(lovData['tissueLineCode'].value, record.tissueCultureLineCode),
      },
      {
        title: 'Mother Stock',
        dataIndex: 'motherStock',
        align: 'center' as AlignType,
      },
      {
        title: 'Plant Code',
        dataIndex: 'plantCloning',
        key: 'plantCloning',
        align: 'center' as AlignType,
        render: (_, record) =>
              getLovValue(lovData['plantCode'].value, record.plantCloning),
      },
      {
        title: 'Cell Culture Code',
        dataIndex: 'cellCultureCode',
        align: 'center' as AlignType,
        render: (_, record) =>
              getLovValue(lovData['cellCulture'].value, record.cellCultureCode),
      },
      {
        title: 'Customer Weeks',
        dataIndex: 'customerWeeks',
        key: 'customerWeeks',
        align: 'center' as AlignType,
      },
      {
        title: 'Employees',
        dataIndex: 'employees',
        align: 'left' as AlignType,
        render: (_, record) => (
          <>
          {
            record?.employees?.map((employee) => {              
              const employeeData = JSON.parse(employee);
              console.log(employeeData);
              return (
                <Tag color='green' key={employeeData?._id}>
                  {clsx(employeeData.employeeId, '-', employeeData.firstName, employeeData.middleName, employeeData.lastName).toLocaleLowerCase()}
                </Tag>
              )
            })}
          </>
        )     
      },
      {
        title: 'Note',
        dataIndex: 'notes',
        key: 'notes',
        align: 'center' as AlignType,
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
                href={`/initiateculture/${record.id}/update`}
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
              Initiate Cultures
            </Typography.Title>
            <div className="flex space-x-2">
              <Button
                onClick={() => setOpenFilter(!openFilter)}
                icon={<FilterOutlined />}
              >
                Filter
              </Button>
              <CreateWithTitleButton
                title='Create Initiate Culture'
                onClick={() => navigate('/initiateculture/create')}
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
          <div className="flex items-start justify-end m-1">
            <Radio.Group onChange={onChangeDisplay} value={display}>
              <Radio.Button value="list">By List</Radio.Button>
              <Radio.Button value="employees">By Employees</Radio.Button>
            </Radio.Group>
          </div>
          {display === 'list' ? 
            (<Table
            loading={isLoading}
            columns={INITIATECULTURE_TABLE_COLUMS}
            bordered
            rowKey={(item) => item.id}
            dataSource={initiatecultures}
            scroll={{ x: 1300 }}
          />) : (
            <Table
            loading={isLoading}
            columns={INITIATECULTURE_ITEM_TABLE_COLUMS}
            bordered
            rowKey={(item) => item.id}
            dataSource={ListInitiateCultureToItems(initiatecultures)}
            scroll={{ x: 1300 }}
          />
          )
          }
          
        </Card>
      );

}

export default InitiateCulturePages;