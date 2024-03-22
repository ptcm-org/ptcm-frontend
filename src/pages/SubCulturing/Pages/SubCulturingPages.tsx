import { CreateWithTitleButton, ViewButton } from "@/components/ActionButtons";
import { DATE_TIME_PICKER_FORMAT, ORDER_STATUS_OPTIONS, ORDER_TYPE_OPTIONS, WEEKSOFYEAR } from "@/utils/commonConstantData";
import { Button, Card, Col, Divider, Form, Input, Row, Select, Space, Table, TableColumnsType, Tooltip, Typography } from "antd";
import { EditOutlined, FilterOutlined } from '@ant-design/icons';
import { AlignType } from 'rc-table/lib/interface';
import { lovStore } from "@/stores/lovStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLovValue, useLovHook } from "@/pages/Settings/Lov/Hook";
import { producingCellCultureStore } from "@/stores/producingCellCultureStore";
import dayjs from "dayjs";
import { SubculturingDto } from "@/api/auth-proxies";

const  SubCulturingPages = () => {

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
    const getListEnvironments = producingCellCultureStore(state => state.getListEnvironments);
    const environments = producingCellCultureStore(state => state.environmentData.environments);
    const onFinish = (value: any) => {
        console.log(value);
        //Handle Filter
      };

    useEffect(() => {
      filterSubculturings();
      getLovs();
      getListEnvironments();
    },[])


    const SUBCULTURING_TABLE_COLUMS :  TableColumnsType<SubculturingDto> = [
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
          // render: (_, record) =>
          //       getLovValue(lovData['batchCode'].value, record.batchCode),
      },
      {
        title: 'Subculturing Date',
        dataIndex: 'subculturingDate',
        key: 'subculturingDate',
        align: 'center' as AlignType,
        render: (_, record) =>
          dayjs(record.subculturingDate).format(DATE_TIME_PICKER_FORMAT),
      },
      {
        title: 'Expired',
        dataIndex: 'cutOfDate',
        key: 'cutOfDate',
        align: 'center' as AlignType,
        render: (_, record) =>
          dayjs(record.cutOfDate).format(DATE_TIME_PICKER_FORMAT),
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
        title: 'Environment',
        dataIndex: 'environmentId',
        align: 'center' as AlignType,
        render: (_, record) =>
              environments.find((item) => item.id == record.environmentId)?.environmentName,
      },
      {
        title: 'Tissue Culture Bags',
        dataIndex: 'tissueCultureBags',
        key: 'tissueCultureBags',
        align: 'center' as AlignType,
      },
      {
        title: 'Disposal Bags',
        dataIndex: 'disposalBags',
        key: 'disposalBags',
        align: 'center' as AlignType,
      },
      {
        title: 'Surplus Bags',
        dataIndex: 'surplusBags',
        key: 'surplusBags',
        align: 'center' as AlignType,
      },
      {
        title: 'Cell Culture Code',
        dataIndex: 'cellCultureCode',
        align: 'center' as AlignType,
        render: (_, record) =>
              getLovValue(lovData['cellCulture'].value, record.cellCultureCode),
      },
      {
        title: 'Phase',
        dataIndex: 'phaseIndex',
        align: 'center' as AlignType,
        render: (_, record) =>
              getLovValue(lovData['phases'].value, record.phaseIndex),
      },
      {
        title: 'Child Batch',
        dataIndex: 'childBatchCode',
        align: 'center' as AlignType,
        render: (_, record) =>
              getLovValue(lovData['batchCode'].value, record.childBatchCode),
      },
      {
        title: 'Clean Count',
        dataIndex: 'cleanCount',
        key: 'cleanCount',
        align: 'center' as AlignType,
      },
      {
        title: 'Sterile Culture',
        dataIndex: 'sterileCulture',
        key: 'sterileCulture',
        align: 'center' as AlignType,
      },
      {
        title: 'Potential Infection Count',
        dataIndex: 'potentialInfectionCount',
        key: 'potentialInfectionCount',
        align: 'center' as AlignType,
      },
      {
        title: 'Culture Potential Infection',
        dataIndex: 'culturePotentialInfection',
        key: 'culturePotentialInfection',
        align: 'center' as AlignType,
      },
      {
        title: 'Mild Infection Count',
        dataIndex: 'mildInfectionCount',
        key: 'mildInfectionCount',
        align: 'center' as AlignType,
      },
      {
        title: 'Culture Mild Infection',
        dataIndex: 'culturemildInfection',
        key: 'culturemildInfection',
        align: 'center' as AlignType,
      },
      {
        title: 'Severe Infection Count',
        dataIndex: 'severeInfectionCount',
        key: 'severeInfectionCount',
        align: 'center' as AlignType,
      },
      {
        title: 'Culture Severe Infection',
        dataIndex: 'cultureSevereInfection',
        key: 'cultureSevereInfection',
        align: 'center' as AlignType,
      },
      {
        title: 'Customer Weeks',
        dataIndex: 'customerWeeks',
        key: 'customerWeeks',
        align: 'center' as AlignType,
        sorter: (a, b) => a.customerWeeks - b.customerWeeks,
      },
      {
        title: 'Clonal Cluster',
        dataIndex: 'clonalCluster',
        key: 'clonalCluster',
        align: 'center' as AlignType,
        sorter: (a, b) => a.customerWeeks - b.customerWeeks,
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
                href={`/subculturings/${record.id}/update`}
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
              SubCulturings
            </Typography.Title>
            <div className="flex space-x-2">
              <Button
                onClick={() => setOpenFilter(!openFilter)}
                icon={<FilterOutlined />}
              >
                Filter
              </Button>
              <CreateWithTitleButton
                title='Create Subculturing'
                onClick={() => navigate('/subculturings/create')}
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
            columns={SUBCULTURING_TABLE_COLUMS}
            bordered
            rowKey={(item) => item.id}
            dataSource={subculturingData.subculturings}
            scroll={{ x: 1300 }}
          />
        </Card>
      );

}

export default SubCulturingPages;