import { DATE_FORMAT } from "@/pages/Orders/constant";
import { useLovHook } from "@/pages/Settings/Lov/Hook";
import { lovStore } from "@/stores/lovStore";
import { producingCellCultureStore } from "@/stores/producingCellCultureStore";
import { ISubculturingForm } from "@/stores/producingCellCultureStore";
import { WEEKSOFYEAR } from "@/utils/commonConstantData";
import { Button, Col, DatePicker, Divider, Form, Input, InputNumber, Row, Select, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { DefaultOptionType } from "antd/es/select";
import dayjs, { Dayjs } from 'dayjs';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SubCulturingForm: React.FC<{
    type: 'update' | 'create';
    onFinish: (value: ISubculturingForm) => void;
  }> = ({ onFinish, type }) => {
    const [form] = Form.useForm<ISubculturingForm>();
    const navigate = useNavigate();
    const getLovs = lovStore(state => state.getLovs);
    const getListEnvironments = producingCellCultureStore(state => state.getListEnvironments);
    const environments = producingCellCultureStore(state => state.environmentData.environments);
    const subculturing = producingCellCultureStore(state => state.subculturingData.subculturing);
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
      const environmentOptions = environments?.map(
        (item): DefaultOptionType => ({
          label: item.environmentName,
          value: item.id,
        }),
      );
    
      useEffect(() => {
         getLovs();
         getListEnvironments();
      },[]);

      useEffect(() => {
        if (type === 'update' && subculturing) {
            const { subculturingDate, cutOfDate } = subculturing;
          form.setFieldsValue({
            ...subculturing,
            subculturingDate: subculturingDate ? dayjs(subculturingDate) : null,
            cutOfDate: cutOfDate ? dayjs(cutOfDate) : null,
          });
        }
      }, [subculturing, form, type]);

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
                    label='Subculturing Date'
                    name="subculturingDate"
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
                    label='Expired'
                    name="cutOfDate"
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
                  <Col span={24} md={12} xl={6}>
                    <Form.Item label='Environment' name="environmentId">
                      <Select
                        showSearch
                        options={environmentOptions} 
                        placeholder='--Select One--'
                      />
                    </Form.Item>
                  </Col>
            </Row>
            <Divider />
            <Row gutter={24}>
                <Col span={24} md={12} xl={6}>
                    <Form.Item
                    label='Child Batch'
                    name="childBatchCode"
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
                    label='Phases'
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
                    <Form.Item label='Clonal Cluster' name="clonalCluster">
                        <InputNumber min={1} className="w-full" />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} xl={6}>
                    <Form.Item label='Tissue Culture Bags' name="tissueCultureBags">
                        <InputNumber min={1} className="w-full" />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} xl={6}>
                    <Form.Item label='Disposal Bags' name="disposalBags">
                        <InputNumber min={1} className="w-full" />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} xl={6}>
                    <Form.Item label='Surplus Bags' name="surplusBags">
                        <InputNumber min={1} className="w-full" />
                    </Form.Item>
                </Col>                
                <Col span={24} md={12} xl={6}>
                    <Form.Item label='Clean Count' name="cleanCount">
                        <InputNumber min={1} className="w-full" />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} xl={6}>
                    <Form.Item label='Sterile Culture' name="sterileCulture">
                        <InputNumber min={1} className="w-full" />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} xl={6}>
                <Form.Item
                    label='Clean Environment '
                    name="cleanEnvironment"
                    rules={[{ required: false }]}
                    >
                        <Select
                            showSearch
                            options={environmentOptions} 
                            placeholder='--Select One--'
                        />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} xl={6}></Col>
                <Col span={24} md={12} xl={6}>
                    <Form.Item label='Potential Infection Count' name="potentialInfectionCount">
                        <InputNumber min={1} className="w-full" />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} xl={6}>
                    <Form.Item label='Culture Potential Infection ' name="culturePotentialInfection">
                        <InputNumber min={1} className="w-full" />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} xl={6}>
                <Form.Item
                    label='Potential Infection Environment'
                    name="potentialInfectionEnvironment"
                    rules={[{ required: false }]}
                    >
                        <Select
                            showSearch
                            options={environmentOptions} 
                            placeholder='--Select One--'
                        />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} xl={6}></Col>
                <Col span={24} md={12} xl={6}>
                    <Form.Item label='Mild Infection Count' name="mildInfectionCount">
                        <InputNumber min={1} className="w-full" />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} xl={6}>
                    <Form.Item label='Culture mild Infection' name="culturemildInfection">
                        <InputNumber min={1} className="w-full" />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} xl={6}>
                <Form.Item
                    label='Mild Infection Environment'
                    name="mildInfectionEnvironment"
                    rules={[{ required: false }]}
                    >
                        <Select
                            showSearch
                            options={environmentOptions} 
                            placeholder='--Select One--'
                        />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} xl={6}></Col>
                <Col span={24} md={12} xl={6}>
                    <Form.Item label='Severe Infection Count' name="severeInfectionCount">
                        <InputNumber min={1} className="w-full" />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} xl={6}>
                    <Form.Item label='Culture Severe Infection' name="cultureSevereInfection">
                        <InputNumber min={1} className="w-full" />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} xl={6}>
                <Form.Item
                    label='Severe Infection Environment'
                    name="severeInfectionEnvironment"
                    rules={[{ required: false }]}
                    >
                        <Select
                            showSearch
                            options={environmentOptions} 
                            placeholder='--Select One--'
                        />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} xl={6}></Col>
                <Col span={24} md={12} xl={24}>
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

  export default SubCulturingForm;