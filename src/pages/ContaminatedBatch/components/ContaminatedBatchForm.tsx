import { DATE_FORMAT } from "@/pages/Orders/constant";
import { useLovHook } from "@/pages/Settings/Lov/Hook";
import { lovStore } from "@/stores/lovStore";
import { IContaminatedBatchForm, producingCellCultureStore } from "@/stores/producingCellCultureStore";
import { IInitiateCultureForm } from "@/stores/producingCellCultureStore";
import { WEEKSOFYEAR } from "@/utils/commonConstantData";
import { Avatar, Button, Col, DatePicker, Divider, Form, Input, InputNumber, List, Row, Select, Transfer, TransferProps, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { DefaultOptionType } from "antd/es/select";
import clsx from "clsx";
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const ContaminatedBatchForm: React.FC<{
    type: 'update' | 'create';
    onFinish: (value: IContaminatedBatchForm) => void;
  }> = ({ onFinish, type }) => {
    const [form] = Form.useForm<IContaminatedBatchForm>();
    const navigate = useNavigate();
    const getLovs = lovStore(state => state.getLovs);
    const getListEmployees = producingCellCultureStore(state => state.getListEmployees);
    const employees = producingCellCultureStore(state => state.employeeData.employees);

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
        getListEmployees();
     },[]);

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
                    label='Scan Date'
                    name="scanDate"
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
                    <Form.Item
                    label='Infection Type'
                    name="infectionId"
                    rules={[{ required: true }]}
                    >
                    <Select
                        showSearch
                        options={getOptions.cellCulture} 
                        placeholder='--Select One--'
                    />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} xl={6}>
                    <Form.Item label='Child Bags' name="numOfChildBags">
                        <InputNumber min={1} className="w-full" />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} xl={6}>
                    <Form.Item
                    label='Employee'
                    name="culturingCellEmployeeId"
                    rules={[{ required: true }]}
                    >
                    <Select
                        showSearch
                        options={getOptions.cellCulture} 
                        placeholder='--Select One--'
                      />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} xl={6}>
                    <Form.Item
                    label='Culturing Date'
                    name="culturingDate"
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
                    <Form.Item
                    label='Weeks'
                    name="weeks"
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
                    label='Environment Code'
                    name="environmentCode"
                    rules={[{ required: true }]}
                    >
                    <Select
                        showSearch
                        options={WEEKSOFYEAR}
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
                <Col span={24} md={12} xl={6}>
                    <Form.Item
                    label='Phase'
                    name="phaseIndex"
                    rules={[{ required: true }]}
                    >
                    <Select
                        showSearch
                        options={getOptions.cellCulture} 
                        placeholder='--Select One--'
                    />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} xl={6}>
                    <Form.Item
                    label='Infection Level'
                    name="infectionLevel"
                    rules={[{ required: true }]}
                    >
                    <Select
                        showSearch
                        options={getOptions.cellCulture} 
                        placeholder='--Select One--'
                    />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} xl={6}>
                    <Form.Item
                    label='Producing'
                    name="producingType"
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
                    name="cellCultureDescription"
                    rules={[{ required: false }]}
                    >
                    <TextArea />
                    </Form.Item>
                </Col>
            </Row>
            <Divider />
            <div className="w-full flex mt-4 items-center justify-between">
                <p className="text-sm text-gray-400">
                    (*) Required
                </p>
                <div className="space-x-4">
                <Button onClick={() => navigate('/subculturings')}>
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

  export default ContaminatedBatchForm;