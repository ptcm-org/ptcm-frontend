import { Card, Typography, Button, Row, Col, Divider, Table } from 'antd';
const { Title } = Typography;

const PlanView: React.FC = () => {

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
    ];

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
    return (
        <div className="space-y-4">
            <Card hoverable className="cursor-default m-6">
                <div className="flex sm:flex-row flex-col items-start justify-between">
                    <Title level={4}>Plan</Title>
                </div>
                <Divider className="mt-0" />
                <Table
                    dataSource={originData}
                    columns={columns}
                />
            </Card>
        </div>
    );
};

export default PlanView;