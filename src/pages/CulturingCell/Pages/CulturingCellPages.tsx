import { CreateWithTitleButton } from "@/components/ActionButtons";
import { ORDER_STATUS_OPTIONS, ORDER_TYPE_OPTIONS, WEEKSOFYEAR } from "@/utils/commonConstantData";
import { Button, Card, Col, Divider, Form, Input, Row, Select, Table, TableColumnsType, Typography } from "antd";
import { EditOutlined, FilterOutlined } from '@ant-design/icons';
import { lovStore } from "@/stores/lovStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLovValue, useLovHook } from "@/pages/Settings/Lov/Hook";
import { producingCellCultureStore } from "@/stores/producingCellCultureStore";
import { CulturingCellDto } from "@/api/auth-proxies";
import { AlignType } from 'rc-table/lib/interface';
import dayjs from "dayjs";
import clsx from "clsx";

const  CulturingCellPages = () => {

    const lovData = lovStore(state => state.lovData);
    const navigate = useNavigate();
    const [openFilter, setOpenFilter] = useState<boolean>(false);
    const [filterForm] = Form.useForm();
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
    const onFinish = (value: any) => {
        console.log(value);
        //Handle Filter
      };

    useEffect(() => {
      filterSubculturings();
    },[])

    const CULTURINGCELL_TABLE_COLUMNS: TableColumnsType<CulturingCellDto> = [
      {
        title: 'Barcode',
        dataIndex: 'barCode',
        key: 'barCode',
        align: 'center' as AlignType,
    },
    // {
    //   title: 'Tissue Line Code',
    //   dataIndex: 'tissueCultureLineCode',
    //   align: 'center' as AlignType,
    //   render: (_, record) =>
    //         getLovValue(lovData['tissueLineCode'].value, record.tissueCultureLineCode),
    // },
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
            columns={[]}
            bordered
            //rowKey={(item) => item.id}
            dataSource={[]}
            scroll={{ x: 1300 }}
          />
        </Card>
      );

}

export default CulturingCellPages;