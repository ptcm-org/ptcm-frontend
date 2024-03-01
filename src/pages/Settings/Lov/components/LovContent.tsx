import React, { useState } from 'react';
import {
  Col,
  Collapse,
  CollapsePanelProps,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Space,
  Switch,
  Table,
  Tooltip,
  Typography,
} from 'antd';

import {
  CancelButton,
  CancelIconButton,
  CreateWithTitleButton,
  EditButton,
  SaveButton,
  SaveIconButton,
} from '@/components/ActionButtons';
import {
  LovKey,
  LovTitle,
} from '@/stores/lovStore';
import { LovDto } from '@/api/auth-proxies'; 
import { lovStore } from '@/stores/lovStore';

const EditingRow: React.FC<LovDto & { onFinish: (body: LovDto) => void }> = ({
  onFinish,
  ...lovDto
}) => {
  const [form] = Form.useForm<LovDto>();

  return (
    <Form
      form={form}
      initialValues={lovDto}
      onFinish={({ lovCd }) => onFinish({ ...lovDto, lovCd, lovAbbrev: lovCd })}
    >
      <Space>
        <Form.Item noStyle name="lovCd">
          <Input size="small" />
        </Form.Item>
        <SaveIconButton
          title="Save"
          size="small"
          shape="round"
          htmlType="submit"
        />
      </Space>
    </Form>
  );
};

const { Title, Text } = Typography;
const LovContent: React.FC<
  CollapsePanelProps & {
    data: LovDto[];
    isLoading: boolean;
    lovKey: LovKey;
    title: LovTitle;
  }
> = ({ lovKey, title, data, isLoading, header, ...panelProps }) => {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<string>('');
  const createLov = lovStore(state => state.createLov);
  const updateLov = lovStore(state => state.updateLov);

  const onFinish = async ({ lovCd }: { lovCd: string }) => {
    console.log(lovCd);
    await createLov({
      sortOrder: data.length,
      lovCd,
      lovAbbrev: lovCd,
      lovType: lovKey,
      lovTypeDesc: title,
      isActive: true,
    });
    setOpenForm(false);
  };

  const onUpdate = async ({ id, ...body }: LovDto) => {
    if (editingItem)
      Modal.confirm({
        title: 'Confirm Save Change?',
        onOk: async () => {
          await updateLov({
            key: lovKey,
            data: {
              lovId: id,
              body,
            },
          });
          setEditingItem('');
        },
        onCancel: () => setEditingItem(''),
      });
    else {
      await updateLov({
        key: lovKey,
        data: {
          lovId: id,
          body,
        },
      });
    }
  };

  return (
    <Collapse.Panel
      header={
        <Divider orientation="left" orientationMargin={0} style={{ margin: 0 }}>
          <Title level={5} style={{ marginBottom: 0 }}>
            {header}
          </Title>
        </Divider>
      }
      {...panelProps}
    >
      <Row>
        <Col xl={10} lg={14} md={18} span={24}>
          <Table
            loading={isLoading}
            size="small"
            dataSource={data}
            columns={[
              {
                ellipsis: true,
                width: 100,
                render: (_, record) =>
                  record.id !== editingItem ? (
                    <Text disabled={!record.isActive}>{record.lovCd}</Text>
                  ) : (
                    <EditingRow onFinish={onUpdate} {...record} />
                  ),
              },
              {
                align: 'right',
                width: 100,
                render: (_, record) => (
                  <Space split={'|'} align="center">
                    <Tooltip title="Set Disable">
                      <Switch
                        size="small"
                        checked={record.isActive}
                        onChange={checked =>
                          onUpdate({ ...record, isActive: checked })
                        }
                      />
                    </Tooltip>
                    {editingItem && editingItem === record.id ? (
                      <CancelIconButton
                        title="Cancel"
                        size="small"
                        shape="round"
                        onClick={() => setEditingItem('')}
                      />
                    ) : (
                      <EditButton
                        disabled={!record.isActive}
                        title="Edit"
                        size="small"
                        shape="round"
                        onClick={() => setEditingItem(record.id)}
                      />
                    )}
                  </Space>
                ),
              },
            ]}
            rowKey={item => item.id}
            showHeader={false}
            pagination={false}
          />
          {openForm ? (
            <Form onFinish={onFinish}>
              <Space className="mt-6">
                <Form.Item noStyle name="lovCd">
                  <Input />
                </Form.Item>
                <CancelButton
                  title="Cancel"
                  onClick={() => setOpenForm(false)}
                />
                <SaveButton title="Save" htmlType="submit" />
              </Space>
            </Form>
          ) : (
            <CreateWithTitleButton
              className="mt-6"
              title="Add New Value"
              onClick={() => setOpenForm(true)}
            />
          )}
        </Col>
      </Row>
    </Collapse.Panel>
  );
};

export default LovContent;
