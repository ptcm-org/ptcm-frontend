import { CreateWithTitleButton, ViewButton } from "@/components/ActionButtons";
import { ORDER_STATUS_OPTIONS, ORDER_TYPE_OPTIONS, WEEKSOFYEAR } from "@/utils/commonConstantData";
import { Button, Card, Col, Divider, Form, Input, Row, Select, Space, Table, TableColumnsType, Tooltip, Typography } from "antd";
import { EditOutlined, FilterOutlined } from '@ant-design/icons';
import { lovStore } from "@/stores/lovStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLovValue, useLovHook } from "@/pages/Settings/Lov/Hook";
import { InitiateCultureEmpItem, producingCellCultureStore } from "@/stores/producingCellCultureStore";
import { AlignType } from 'rc-table/lib/interface';
import dayjs from "dayjs";
import { userStore } from "@/stores/userStore";
import { calculateWeekOrderInYear } from "@/lib/planningCalulate";

const  CulturingCellPages = () => {

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
    const getInitiateCulturesByEmployeeId = producingCellCultureStore(state => state.getInitiateCulturesByEmployeeId);
    const isLoading = producingCellCultureStore(state => state.isLoading);
    const getProfile = userStore(state => state.getProfile);
    const currentUser = userStore(state => state.currentUser);
    const initiateCultureData = producingCellCultureStore(state => state.initiateCultureData);
    const { employeeData } = currentUser;
    const onFinish = (value: any) => {
        console.log(value);
        //Handle Filter
      };

    useEffect(() => {
      filterSubculturings();
      getLovs();
      getProfile();
    },[])

    useEffect(() => {
      const params = {
        filterType: 'allTime',
      };
      getInitiateCulturesByEmployeeId(employeeData?.id || '', params);
    },[currentUser])



    console.log(currentUser);
    console.log(initiateCultureData.initiateCulturesEmpData.initiateCulturesEmp);

    const CULTURINGCELL_TABLE_COLUMNS: TableColumnsType<InitiateCultureEmpItem> = [
      {
        title: 'BatchCode',
        dataIndex: 'batchCode',
        key: 'batchCode',
        align: 'center' as AlignType,
        render: (_, record) =>
          <a href={`/culturingcell/${record.id}/create`} className="text-blue-800">{getLovValue(lovData['batchCode'].value, record.batchCode)}</a>,
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
        title: 'Weeks',
        dataIndex: 'weeks',
        key: 'weeks',
        align: 'center' as AlignType,
        render: (_, record) =>
              calculateWeekOrderInYear(dayjs(record.initiatecultureDate)).toString()
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
              Culturing Cells
            </Typography.Title>
            <div className="flex space-x-2">
              <Button
                onClick={() => setOpenFilter(!openFilter)}
                icon={<FilterOutlined />}
              >
                Filter
              </Button>
              <CreateWithTitleButton
                title='Create Culturing Cell'
                onClick={() => navigate('/culturingcell/create')}
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
            columns={CULTURINGCELL_TABLE_COLUMNS}
            bordered
            rowKey={(item) => item.id}
            dataSource={initiateCultureData.initiateCulturesEmpData.initiateCulturesEmp}
            scroll={{ x: 1300 }}
          />
        </Card>
      );

}

export default CulturingCellPages;