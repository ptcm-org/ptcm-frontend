import {
    Button,
    Checkbox,
    Col,
    Divider,
    Form,
    Input,
    InputNumber,
    Popconfirm,
    Row,
    Select,
    Spin,
    Table,
    Typography,
  } from 'antd';
  import React, { useState } from 'react';
  import { SearchOutlined } from '@ant-design/icons';
  import { PhaseParamEntity } from '../constant';
  import { buildPlan, reshapePlan } from '@/lib/planningCalulate';
  
  export function PlanInfo({
      handleBackStep,
      handleNextStep,
    }: {
      handleBackStep?: () => void;
      handleNextStep?: () => void;
    }) {
      const [isLoading, setIsLoading] = useState<boolean>(false);
      const [search, setSearch] = useState<string>('');
  
      const handleNextClick = () => {
          handleNextStep && handleNextStep();
        };    
  
      interface Item {
        key: string;
        tissueCultureLine: string | undefined;
        batchCode: string | undefined;
        groupCode: string | undefined;
        block: string | undefined;
        phase: string;
        phaseFactor: number;
        phaseInfectionPercentange: string;
        phaseInfectionRate: number;
        phaseInfectionRateUnit: string | undefined;
        phaseInfectionRateUnitType: string | undefined;
        phaseYear: number;
        phaseWeek: number;
        clusterCustomer: number;
        phaseNumOfBag: number;
        phaseEnvironmentCode: string | undefined;
      }
        
      const originData: Item[] = [];
      for (let i = 0; i < 5; i++) {
        originData.push({
          key: i.toString(),
          phase: `X`,
          phaseFactor: 2.5,
          phaseInfectionPercentange: '7%',
          phaseInfectionRate: 1.83,
          phaseYear: 2024,
          phaseWeek: 20,
          phaseNumOfBag: 6,
          tissueCultureLine: undefined,
          batchCode: undefined,
          groupCode: undefined,
          block: undefined,
          phaseInfectionRateUnit: undefined,
          phaseInfectionRateUnitType: undefined,
          clusterCustomer: 0,
          phaseEnvironmentCode: '2105V'
        });
      }
      interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
        editing: boolean;
        dataIndex: string;
        title: any;
        inputType: 'number' | 'text';
        record: Item;
        index: number;
        children: React.ReactNode;
      }
        
      const EditableCell: React.FC<EditableCellProps> = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
      }) => {
        const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
      
        return (
          <td {...restProps}>
            {editing ? (
              <Form.Item
                name={dataIndex}
                style={{ margin: 0 }}
                rules={[
                  {
                    required: true,
                    message: `Please Input ${title}!`,
                  },
                ]}
              >
                {inputNode}
              </Form.Item>
            ) : (
              children
            )}
          </td>
        );
      };
  
      const [form] = Form.useForm();
      const [data, setData] = useState(originData);
      const [editingKey, setEditingKey] = useState('');
    
      const isEditing = (record: Item) => record.key === editingKey;
    
      const edit = (record: Partial<Item> & { key: React.Key }) => {
        form.setFieldsValue({ phase: '', phaseFactor: '', phaseInfectionPercentange: '', ...record });
        setEditingKey(record.key);
      };
    
      const cancel = () => {
        setEditingKey('');
      };
    
      const save = async (key: React.Key) => {
        try {
          const row = (await form.validateFields()) as Item;
    
          const newData = [...data];
          const index = newData.findIndex((item) => key === item.key);
          if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, {
              ...item,
              ...row,
            });
            setData(newData);
            setEditingKey('');
          } else {
            newData.push(row);
            setData(newData);
            setEditingKey('');
          }
        } catch (errInfo) {
          console.log('Validate Failed:', errInfo);
        }
      };
    
      const columns = [
        {
          title: 'Phase',
          dataIndex: 'phase',
          width: '25%',
          editable: true,
        },
        {
          title: 'Factor',
          dataIndex: 'phaseFactor',
          width: '15%',
          editable: true,
        },
        {
          title: 'Infection',
          dataIndex: 'phaseInfectionPercentange',
          width: '10%',
          editable: true,
        },
        {
          title: 'Year',
          dataIndex: 'phaseYear',
          width: '10%',
          editable: true,
        },
        {
          title: 'Week',
          dataIndex: 'phaseWeek',
          width: '10%',
          editable: true,
        },
        {
          title: 'Cluster',
          dataIndex: 'clusterCustomer',
          width: '10%',
          editable: true,
        },
        {
          title: 'Bags',
          dataIndex: 'phaseNumOfBag',
          width: '10%',
          editable: true,
        },
        {
          title: 'Environment',
          dataIndex: 'phaseEnvironmentCode',
          width: '10%',
          editable: true,
        },
        {
          title: 'Action',
          dataIndex: 'operation',
          render: (_: any, record: Item) => {
            const editable = isEditing(record);
            return editable ? (
              <span>
                <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
                  Save
                </Typography.Link>
                <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                  <a>Cancel</a>
                </Popconfirm>
              </span>
            ) : (
              <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                Edit
              </Typography.Link>
            );
          },
        },
      ];
    
      const mergedColumns = columns.map((col) => {
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: (record: Item) => ({
            record,
            inputType: col.dataIndex === 'phaseFactor' ? 'number' : 'text',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
          }),
        };
      });
  
      const params: PhaseParamEntity[] = [
        { phaseCode: 'ORDER', phaseName: 'Order', numOfWeek: 0, phaseFactor: 1.08, infectionRate: 0.07, phaseEnvironment: 'A' },
        { phaseCode: 'GIAO', phaseName: 'Giao', numOfWeek: 1, phaseFactor: 0.91, infectionRate: 0, phaseEnvironment: 'B' },
        { phaseCode: 'SLTG', phaseName: 'Sltg', numOfWeek: 0, phaseFactor: 0.93, infectionRate: 0, phaseEnvironment: 'C' },
        { phaseCode: 'TC', phaseName: 'Tc', numOfWeek: 2, phaseFactor: 1.8, infectionRate: 0.07, phaseEnvironment: 'D' },
        { phaseCode: 'CMT', phaseName: 'Cmt', numOfWeek: 2, phaseFactor: 2, infectionRate: 0.07, phaseEnvironment: 'E' },
        { phaseCode: 'X', phaseName: 'X', numOfWeek: 4, phaseFactor: 2, infectionRate: 0.07, phaseEnvironment: 'F' },
      ];
  
      const testBuildPlan = () => {
        const amount = 1000;
        const weeks = 20;
        const result = buildPlan(amount, weeks, params);
        console.log(result);
        const result1 = buildPlan(10000, 21, params);
        console.log(result1);
        const result2 = buildPlan(10000, 51, params);
        console.log(result2);
        const result3 = result2.map(obj => ({ ...obj }));
        // const result3 = [...result2];
        result3[4].planningCluster = 55;
        const testReshapePlan1 = reshapePlan(4, result3);
        console.log(testReshapePlan1);
        result3[5].phaseRate = 2.7;
        const testReshapePlan2 = reshapePlan(5, result3);
        console.log(testReshapePlan2);
        //result[5].phaseRate = 2.7;
      };
  
    return (
      <div>
        <Row justify="center" align={'bottom'}>
          <Col span={24}>
            <div className="flex flex-col justify-center items-center m-5">
              <Typography.Title level={4}>
                Plain detail
              </Typography.Title>
              <div className="flex justify-end w-[50%]">
                <Button
                  type="primary"
                  className="text-right"
                  onClick={testBuildPlan}
                >
                  Test Plan
                </Button>
              </div>
            </div>
            <Spin spinning={isLoading}>
              <Form layout="vertical" form={form} component={false}>
                <Form.Item>
                <Table
                  components={{
                    body: {
                      cell: EditableCell,
                    },
                  }}
                  bordered
                  dataSource={data}
                  columns={mergedColumns}
                  rowClassName="editable-row"
                  pagination={{
                    onChange: cancel,
                  }}
                />
                </Form.Item>
              </Form>
            </Spin>
          </Col>
        </Row>
        <div className="flex items-center bg-green-700 p-3 mt-8 rounded">
          <div className="flex justify-start w-[50%]">
            <Button type="default" onClick={handleBackStep}>
              Back
            </Button>
          </div>
          <div className="flex justify-end w-[50%]">
            <Button
              type="primary"
              className="text-right"
              onClick={handleNextClick}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    )
  }
  