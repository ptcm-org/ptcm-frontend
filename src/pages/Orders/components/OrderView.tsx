import { EditOutlined } from '@ant-design/icons';
import { Card, Typography, Button, Row, Col, Divider } from 'antd';


const { Title } = Typography;
const OrderView: React.FC = () => {

  return (
    <div className="space-y-4">
      <Card hoverable className="cursor-default m-6">
        <div className="flex sm:flex-row flex-col items-start justify-between">
          <Title level={4}>Order Info</Title>
        </div>
        <Divider className="mt-0" />
        <Row  gutter={24}>
          <Col span={8}>
            <p className="m-0 text-gray-500">Batch:</p>
            <p className="font-bold">XAB0098</p>
          </Col>
          <Col span={8}>
            <p className="m-0 text-gray-500">Batch Code:</p>
            <p className="font-bold">Code009NA</p>
          </Col>
          <Col span={8}>
            <p className="m-0 text-gray-500">Tissue Line Code (Customer):</p>
            <p className="font-bold">NA000231</p>
          </Col>
        </Row>
        <Row  gutter={24}>
          <Col span={8}>
            <p className="m-0 text-gray-500">Tissue Line Code</p>
            <p className="font-bold">NM0987</p>
          </Col>
          <Col span={8}>
            <p className="m-0 text-gray-500">Quantity Delivered:</p>
            <p className="font-bold">10000</p>
          </Col>
          <Col span={8}>
            <p className="m-0 text-gray-500">Week Delivered:</p>
            <p className="font-bold">25</p>
          </Col>
          <Col span={8}>
            <p className="m-0 text-gray-500">Year Delivered:</p>
            <p className="font-bold">2025</p>
          </Col>
          <Col span={8}>
            <p className="m-0 text-gray-500">Location Delivered:</p>
            <p className="font-bold">NY</p>
          </Col>
          <Col span={8}>
            <p className="m-0 text-gray-500">Confirm(lab):</p>
            <p className="font-bold">Pending</p>
          </Col>
          <Col span={8}>
            <p className="m-0 text-gray-500">Quantity(lab):</p>
            <p className="font-bold">10000</p>
          </Col>
          <Col span={8}>
            <p className="m-0 text-gray-500">Week Delivered(lab):</p>
            <p className="font-bold">10000</p>
          </Col>
          <Col span={8}>
            <p className="m-0 text-gray-500">Contact Info:</p>
            <p className="font-bold">10000</p>
          </Col>
          <Col span={8}>
            <p className="m-0 text-gray-500">Note(lab):</p>
            <p className="font-bold">10000</p>
          </Col>
          <Col span={8}>
            <p className="m-0 text-gray-500">Cell Culture Group:</p>
            <p className="font-bold">10000</p>
          </Col>
          <Col span={8}>
            <p className="m-0 text-gray-500">Customer:</p>
            <p className="font-bold">10000</p>
          </Col>
          <Col span={8}>
            <p className="m-0 text-gray-500">Actual Delivery Date:</p>
            <p className="font-bold">10000</p>
          </Col>
          <Col span={8}>
            <p className="m-0 text-gray-500">Actual Bags Delivered:</p>
            <p className="font-bold">10000</p>
          </Col>
          <Col span={8}>
            <p className="m-0 text-gray-500">Actual Trees Delivered:</p>
            <p className="font-bold">10000</p>
          </Col>
          <Col span={8}>
            <p className="m-0 text-gray-500">Order Type:</p>
            <p className="font-bold">10000</p>
          </Col>
        </Row>
      </Card>      
    </div>
  );
};

export default OrderView;
