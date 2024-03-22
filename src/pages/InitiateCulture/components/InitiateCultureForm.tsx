import { DATE_FORMAT } from "@/pages/Orders/constant";
import { useLovHook } from "@/pages/Settings/Lov/Hook";
import { lovStore } from "@/stores/lovStore";
import { producingCellCultureStore } from "@/stores/producingCellCultureStore";
import { IInitiateCultureForm } from "@/stores/producingCellCultureStore";
import { WEEKSOFYEAR } from "@/utils/commonConstantData";
import { Avatar, Button, Col, DatePicker, Divider, Form, Input, InputNumber, List, Row, Select, Transfer, TransferProps, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { DefaultOptionType } from "antd/es/select";
import clsx from "clsx";
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const InitiateCultureForm: React.FC<{
    type: 'update' | 'create';
    onFinish: (value: IInitiateCultureForm) => void;
  }> = ({ onFinish, type }) => {
    const [form] = Form.useForm<IInitiateCultureForm>();
    const navigate = useNavigate();
    const getLovs = lovStore(state => state.getLovs);
    const getListEmployees = producingCellCultureStore(state => state.getListEmployees);
    const employees = producingCellCultureStore(state => state.employeeData.employees);
    const initiateCulture = producingCellCultureStore(state => state.initiateCultureData.initiateCulture);

    const { getOptions } = useLovHook([
        'batch',
        'batchCode',
        'block',
        'coustomer',
        'tissueLineCode',
        'cellCulture',
        'phases',
        'plantCode'
      ]);

      const [targetKeys, setTargetKeys] = useState([]);
      const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
      const handleChange = (newSelectedKeys: string[]) => {
        setSelectedKeys(newSelectedKeys);
      };

      useEffect(() => {
        getLovs();
        getListEmployees();
     },[]);

     useEffect(() => {
        if (type === 'update' && initiateCulture) {
            const { initiatecultureDate } = initiateCulture;
          form.setFieldsValue({
            ...initiateCulture,
            initiatecultureDate: initiatecultureDate ? dayjs(initiatecultureDate) : null,
          });
          setSelectedKeys(initiateCulture.employees);
        }
      }, [initiateCulture, form, type]);

      return (
        <Form form={form} layout="vertical" className="my-4" onFinish={onFinish}>
            <Row gutter={24}>
                <Col span={24} md={12} xl={6}>
                    <Form.Item
                    label='BarCode'
                    name="barCode"
                    rules={[{ required: false }]}
                    >
                    <Input />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} xl={6}>
                    <Form.Item
                    label='BatchCode'
                    name="batchCode"
                    rules={[{ required: true }]}
                    >
                    <Select
                        showSearch
                        options={getOptions.batchCode} 
                        placeholder='--Select One--'
                      />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} xl={6}>
                    <Form.Item
                    label='Tissue Line Code'
                    name="tissueCultureLineCode"
                    rules={[{ required: true }]}
                    >
                    <Select
                        showSearch
                        options={getOptions.tissueLineCode} 
                        placeholder='--Select One--'
                      />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} xl={6}>
                    <Form.Item
                    label='Mother Stock'
                    name="motherStock"
                    rules={[{ required: true }]}
                    >
                    <Input />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} xl={6}>
                    <Form.Item
                    label='Customer Weeks'
                    name="customerWeeks"
                    rules={[{ required: true }]}
                    >
                    <Select
                        showSearch
                        options={WEEKSOFYEAR}
                      />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} xl={6}>
                    <Form.Item
                    label='Initiateculture Date'
                    name="initiatecultureDate"
                    rules={[{ required: true }]}
                    >
                    <DatePicker
                        className="w-full"
                        format={DATE_FORMAT}
                        disabledDate={d => !d || d.isAfter(dayjs())}
                      />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} xl={6}>
                    <Form.Item label='Plant Code' name="plantCloning">
                      <Select
                        showSearch
                        options={getOptions.plantCode} 
                        placeholder='--Select One--'
                      />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} xl={6}>
                    <Form.Item label='Mother Clusters' name="numOfMotherCluster">
                        <InputNumber min={1} className="w-full" />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} xl={6}>
                    <Form.Item label='Child Clusters' name="numOfChildCluster">
                        <InputNumber min={1} className="w-full" />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} xl={6}>
                    <Form.Item
                    label='Cell Culture Group'
                    name="cellCultureCode"
                    rules={[{ required: true }]}
                    >
                    <Select
                        showSearch
                        options={getOptions.cellCulture} 
                        placeholder='--Select One--'
                      />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} xl={12}>
                    <Form.Item
                    label='Note:'
                    name="notes"
                    rules={[{ required: false }]}
                    >
                    <TextArea />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} xl={12}>
                <Form.Item
                    label="Assign Employees"
                    name="employees"
                    rules={[{ required: true, message: 'Please select options' }]}
                >
                    <Transfer
                        showSearch
                        listStyle={{
                            width: 250,
                            height: 300,
                        }}
                        dataSource={employees.map((item) => ({key: item.id, title: clsx(item.employeeId, '---', item.firstName, item.middleName, item.lastName)}))}
                        targetKeys={selectedKeys}
                        onChange={handleChange}
                        render={(item) => item.title}
                    />
                </Form.Item>
                </Col>
                
            </Row>
            <Divider />
            <div className="w-full flex mt-4 items-center justify-between">
                <p className="text-sm text-gray-400">
                    (*) Required
                </p>
                <div className="space-x-4">
                <Button onClick={() => navigate('/initiatecultures')}>
                    Back
                </Button>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
                </div>
            </div>
        </Form>
    );
  }

  export default InitiateCultureForm;