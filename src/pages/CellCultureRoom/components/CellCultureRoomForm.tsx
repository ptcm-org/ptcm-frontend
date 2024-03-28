import { DATE_FORMAT } from "@/pages/Orders/constant";
import { useLovHook } from "@/pages/Settings/Lov/Hook";
import { lookupTableStore } from "@/stores/lookupTableStore";
import { lovStore } from "@/stores/lovStore";
import { producingCellCultureStore } from "@/stores/producingCellCultureStore";
import { IInitiateCultureForm } from "@/stores/producingCellCultureStore";
import { userStore } from "@/stores/userStore";
import { WEEKSOFYEAR } from "@/utils/commonConstantData";
import { Avatar, Button, Col, DatePicker, Divider, Form, Input, InputNumber, List, Row, Select, Transfer, TransferProps, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { DefaultOptionType } from "antd/es/select";
import clsx from "clsx";
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const CellCultureRoomForm: React.FC<{
    type: 'update' | 'create';
    onFinish: (value: IInitiateCultureForm) => void;
  }> = ({ onFinish, type }) => {
    const [form] = Form.useForm<IInitiateCultureForm>();
    const navigate = useNavigate();
    const getLovs = lovStore(state => state.getLovs);
    const getListCleanRooms = lookupTableStore(state => state.getListCleanRooms);
    const getListShelves = lookupTableStore(state => state.getListShelves);
    const getListEnvironments = producingCellCultureStore(state => state.getListEnvironments);
    const environmentData = producingCellCultureStore(state => state.environmentData);
    const cleanRooms = lookupTableStore(state => state.cleanRooms);
    const shelves = lookupTableStore(state => state.shelves);
    const getProfile = userStore(state => state.getProfile);
    const currentUser = userStore(state => state.currentUser);

    const { getOptions } = useLovHook([
        'batch',
        'batchCode',
        'tissueLineCode',
        'cellCulture',
        'phases',
        'plantCode',
        'infectionLevel',
        'transaction',
        'cellCultureRoomStatus'
      ]);

      useEffect(() => {
        getLovs();
        getListEnvironments();
        getListCleanRooms();
        getListShelves();
     },[]);

      return (
        <Form form={form} layout="vertical" className="my-4" onFinish={onFinish}>
            <Row gutter={24}>
                <Col span={24} md={12} xl={12}>
                    <Form.Item
                    label='BarCode'
                    name="barCode"
                    rules={[{ required: false }]}
                    >
                    <Input />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} xl={12}>
                </Col>
                <Col span={24} md={12} xl={6}>
                    <Form.Item
                    label='culturing Date'
                    name="culturingCellDate"
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
                    label='Transaction'
                    name="transaction"
                    rules={[{ required: true }]}
                    >
                    <Select
                        showSearch
                        options={getOptions.transaction} 
                        placeholder='--Select One--'
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
                        options={environmentData.environments?.map(
                            (item): DefaultOptionType => ({
                              label: item.environmentName,
                              value: item.id,
                            }),
                          )}
                        placeholder='--Select One--'  
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
                        options={getOptions.phases} 
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
                        options={getOptions.infectionLevel} 
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
                    <Form.Item label='Child Clusters' name="numOfChildCluster">
                        <InputNumber min={1} className="w-full" />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} xl={6}>
                    <Form.Item
                    label='Clean Room'
                    name="cleanRoomId"
                    rules={[{ required: true }]}
                    >
                    <Select
                        showSearch
                        options={cleanRooms?.map(
                            (item): DefaultOptionType => ({
                              label: item.roomName,
                              value: item.id,
                            }),
                          )}  
                        placeholder='--Select One--'
                      />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} xl={6}>
                    <Form.Item
                    label='Shelve'
                    name="shelveId"
                    rules={[{ required: true }]}
                    >
                    <Select
                        showSearch
                        options={shelves?.map(
                            (item): DefaultOptionType => ({
                              label: item.shelveName,
                              value: item.id,
                            }),
                          )}   
                        placeholder='--Select One--'
                      />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} xl={6}>
                    <Form.Item
                    label='Status'
                    name="cellCultureStatus"
                    rules={[{ required: true }]}
                    >
                    <Select
                        showSearch
                        options={getOptions.cellCultureRoomStatus} 
                        placeholder='--Select One--'
                      />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} xl={6}>
                    <Form.Item
                    label='Employee'
                    name="employeeIds"
                    rules={[{ required: false }]}
                    >
                    <Input value={currentUser?.employeeData?.departmentId}/>
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
                <Button onClick={() => navigate('/cellculturerooms')}>
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

  export default CellCultureRoomForm;