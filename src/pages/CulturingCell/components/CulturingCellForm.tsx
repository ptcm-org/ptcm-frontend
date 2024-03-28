import { DATE_FORMAT } from "@/pages/Orders/constant";
import { useLovHook } from "@/pages/Settings/Lov/Hook";
import { lovStore } from "@/stores/lovStore";
import { ICulturingCellForm, producingCellCultureStore } from "@/stores/producingCellCultureStore";
import { lookupTableStore } from '@/stores/lookupTableStore';
import { IInitiateCultureForm } from "@/stores/producingCellCultureStore";
import { userStore } from "@/stores/userStore";
import { MINSOFHOUR, WEEKSOFYEAR } from "@/utils/commonConstantData";
import { Avatar, Button, Col, DatePicker, Divider, Form, Input, InputNumber, List, Row, Select, Tabs, Transfer, TransferProps, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { DefaultOptionType } from "antd/es/select";
import clsx from "clsx";
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const CulturingCellForm: React.FC<{
    type: 'update' | 'create';
    onFinish: (value: ICulturingCellForm) => void;
  }> = ({ onFinish, type }) => {
    const [initCultureForm] = Form.useForm<IInitiateCultureForm>();
    const [form] = Form.useForm<ICulturingCellForm>();
    const navigate = useNavigate();
    const getLovs = lovStore(state => state.getLovs);
    const lovData = lovStore(state => state.lovData);
    const initiateCulture = producingCellCultureStore(state => state.initiateCultureData.initiateCulture);
    const environments = producingCellCultureStore(state => state.environmentData.environments);

    const currentUser = userStore(state => state.currentUser);
    const boxList = lookupTableStore(state => state.boxList);
    const dishList = lookupTableStore(state => state.dishList);
    const { getOptions } = useLovHook([
        'batch',
        'batchCode',
        'block',
        'coustomer',
        'tissueLineCode',
        'cellCulture',
        'phases',
        'plantCode',
        'infectionLevel'
      ]);

      const onChange = (key: string) => {
        console.log(key);
      };

    useEffect(() => {
        getLovs();
    },[]);

    useEffect(() => {
        console.log('initiateCulture is:', initiateCulture);
        if (initiateCulture) {
            const { initiatecultureDate } = initiateCulture;
            initCultureForm.setFieldsValue({
            ...initiateCulture,
            initiatecultureDate: initiatecultureDate ? dayjs(initiatecultureDate) : null,
          });
        }
    },[initiateCulture]);



      return (
        <Tabs 
            tabPosition="top"
            items={[
                {
                    key: 'Tissueexplants',
                    label: 'Tissue explants',
                    children: (
                    <Form form={initCultureForm} layout="vertical" className="my-4">
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
                                <Form.Item
                                    label='Employee'
                                    name="employeeId"
                                    rules={[{ required: false }]}
                                    >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24} md={12} xl={12}>
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
                                <Form.Item
                                label=' Weeks'
                                name="week"
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
                            <Col span={24} md={12} xl={12}>
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
                            <Col span={24} md={12} xl={12}>
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
                                <Form.Item label='Plant Code' name="plantCloning">
                                <Select
                                    showSearch
                                    options={getOptions.plantCode} 
                                    placeholder='--Select One--'
                                />
                                </Form.Item>
                            </Col>
                            <Col span={24} md={12} xl={12}>
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
                                label='Phase'
                                name="phaseIndex"
                                rules={[{ required: false }]}
                                >
                                <Select
                                    showSearch
                                    options={getOptions.phases} 
                                    placeholder='--Select One--'
                                />
                                </Form.Item>
                            </Col>
                            <Col span={24} md={12} xl={12}>
                                <Form.Item
                                label='Infection Level'
                                name="infectionLevel"
                                rules={[{ required: false }]}
                                >
                                <Select
                                    showSearch
                                    options={getOptions.infectionLevel} 
                                    placeholder='--Select One--'
                                />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                    ),
                },
                {
                    key: 'Implantedtissue',
                    label: 'Implanted tissue',
                    children: (
                    <Form form={form} layout="vertical" className="my-4" onFinish={onFinish}>
                        <Row gutter={24}>
                            <Col span={24} md={12} xl={6}>
                                <Form.Item
                                label='Box'
                                name="boxId"
                                rules={[{ required: true }]}
                                >
                                <Select
                                    showSearch
                                    options={boxList.map(
                                        (item): DefaultOptionType => ({
                                          label: item.boxName,
                                          value: item.id,
                                        }),
                                    )}
                                    placeholder='--Select One--'
                                />
                                </Form.Item>
                            </Col>
                            <Col span={24} md={12} xl={6}>
                                <Form.Item
                                label='Dish'
                                name="dishId"
                                rules={[{ required: true }]}
                                >
                                <Select
                                    showSearch
                                    options={dishList.map(
                                        (item): DefaultOptionType => ({
                                          label: item.dishName,
                                          value: item.id,
                                        }),
                                      )}
                                    placeholder='--Select One--'
                                />
                                </Form.Item>
                            </Col>
                            <Col span={24} md={12} xl={12}>
                                <Form.Item
                                label='Environment'
                                name="environmentId"
                                rules={[{ required: true }]}
                                >
                                <Select
                                    showSearch
                                    options={environments?.map(
                                        (item): DefaultOptionType => ({
                                          label: item.environmentName,
                                          value: item.id,
                                        }),
                                      )} 
                                    placeholder='--Select One--'
                                />
                                </Form.Item>
                            </Col>
                            <Col span={24} md={12} xl={12}>
                                <Form.Item label='Mother Bags' name="motherCultureBags">
                                    <InputNumber min={1} className="w-full" />
                                </Form.Item>
                            </Col>
                            <Col span={24} md={12} xl={12}>
                                <Form.Item label='Mother Clusters' name="motherCultureCluster">
                                    <InputNumber min={1} className="w-full" />
                                </Form.Item>
                            </Col>
                            <Col span={24} md={12} xl={12}>
                                <Form.Item label='Child Bags' name="childCultureBags">
                                    <InputNumber min={1} className="w-full" />
                                </Form.Item>
                            </Col>
                            <Col span={24} md={12} xl={12}>
                                <Form.Item label='Child Clusters' name="childCultureCluster">
                                    <InputNumber min={1} className="w-full" />
                                </Form.Item>
                            </Col>
                            <Col span={24} md={12} xl={6}>
                                <Form.Item label='Hours' name="hourOfCulturing">
                                    <InputNumber min={1} className="w-full" />
                                </Form.Item>
                            </Col>
                            <Col span={24} md={12} xl={6}>
                                <Form.Item
                                label='Minutes'
                                name="minuteOfCulturing"
                                rules={[{ required: true }]}
                                >
                                <Select
                                    showSearch
                                    options={MINSOFHOUR}
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
                        </Row>
                        <Divider />
                        <div className="w-full flex mt-4 items-center justify-between">
                            <p className="text-sm text-gray-400">
                                (*) Required
                            </p>
                            <div className="space-x-4">
                            <Button onClick={() => navigate('/culturingcells')}>
                                Back
                            </Button>
                            <Button type="primary" htmlType="submit">
                                Save
                            </Button>
                            </div>
                        </div>
                    </Form>
                    ),
                },
            ]}>

        </Tabs>  

    );
  }

  export default CulturingCellForm;