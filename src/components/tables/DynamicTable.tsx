/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Table, Button, Input, Space, Modal, Tooltip, Form, Select, Row, Col } from 'antd';
import { ColumnType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined, EyeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
interface DynamicTableProps {
    data: any[];
    isLoading: boolean;
    canEdit: boolean;
    canDelete: boolean;
    canCreate: boolean;
    onCreate?: (newItem: any) => void;
    onEdit?: (updatedItem: any) => void;
    onDelete?: (id: string) => void;
    sizes?: any[]
}

const DynamicTable: React.FC<DynamicTableProps> = ({
    data,
    isLoading,
    canEdit,
    canDelete,
    canCreate,
    onCreate,
    onEdit,
    onDelete,
    sizes
}) => {
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [isEditMode, setIsEditMode] = React.useState(false);
    const [currentItem, setCurrentItem] = React.useState<any>({});
    const [imageUrl, setImageUrl] = React.useState<string | null>(null);

    if (!data || data.length === 0) {
        return <Table columns={[]} dataSource={[]} />;
    }

    const objectWithMostProperties = data.reduce((prev, curr) => {
        if (!curr || !prev) return {};
        return Object.keys(curr).length > Object.keys(prev).length ? curr : prev;
    }, data[0]);

    const columns: ColumnType<any>[] = [
        ...Object.keys(objectWithMostProperties).map((key) => ({
            title: key.charAt(0).toUpperCase() + key.slice(1),
            dataIndex: key,
            key,
            sorter: (a: any, b: any) => {
                if (typeof a[key] === 'string' && typeof b[key] === 'string') {
                    return a[key].localeCompare(b[key]);
                }
                return a[key] - b[key];
            },
            render: (text: any) => {
                if (isValidImageUrl(text)) {
                    return (
                        <Tooltip title="Click to view image">
                            <EyeOutlined
                                style={{ cursor: 'pointer', color: 'blue' }}
                                onClick={() => handleImageClick(text)}
                            />
                        </Tooltip>
                    );
                }
                return text;
            },
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder={`Search ${key}`}
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => confirm()}
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Space>
                        <Button
                            type="link"
                            onClick={() => clearFilters && clearFilters()}
                        >
                            Reset
                        </Button>
                        <Button
                            type="link"
                            onClick={() => confirm()}
                            icon={<SearchOutlined />}
                        >
                            Search
                        </Button>
                    </Space>
                </div>
            ),
            onFilter: (value: any, record: any) => {
                if (typeof record[key] === 'string') {
                    return record[key].toLowerCase().includes(value.toString().toLowerCase());
                }
                return record[key] === value;
            },
        })),
        ...(canEdit || canDelete ? [{
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: any) => (
                <Space>
                    {canEdit && (
                        <Button
                            icon={<EditOutlined />}
                            onClick={() => handleCreateEdit(record)}
                            type="link"
                        >
                            Edit
                        </Button>
                    )}
                    {canDelete && (
                        <Button
                            icon={<DeleteOutlined />}
                            onClick={() => handleDelete(record.id)}
                            type="link"
                        >
                            Delete
                        </Button>
                    )}
                </Space>
            ),
        }] : [])
    ];

    const isValidImageUrl = (url: any) => {
        if (typeof url === 'string') {
            return url.includes('.jpg') || url.includes('.png') || url.includes('.jpeg') || url.includes('.gif');
        }
        return false;
    };

    const handleImageClick = (url: string) => {
        setImageUrl(url);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setImageUrl(null);
    };

    const handleCreateEdit = (item?: any) => {
        if (item) {
            setIsEditMode(true);
            setCurrentItem(item);
        } else {
            setIsEditMode(false);
        }
        setIsModalVisible(true);
    };

    const handleDelete = (id: string) => {
        onDelete?.(id);
    };

    const handleSave = () => {
        if (isEditMode) {
            onEdit?.(currentItem);
        } else {
            onCreate?.(currentItem);
        }
        setIsModalVisible(false);
    };

    const handleSizeChange = (value: string) => {
        setCurrentItem({ ...currentItem, size: value });
    };

    const renderFormFields = () => {
        return Object.keys(objectWithMostProperties).map((key) => {
            const value = currentItem[key];
            if (key === 'size') {
                return (
                    <Form.Item label="Size" key={key}>
                        <Select
                            value={value}
                            onChange={handleSizeChange}
                            placeholder="Select Size"
                        >
                            {sizes?.map((size) => (
                                <Select.Option key={size.title} value={size.title}>
                                    {size.title}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                );
            }
            return (
                <Form.Item label={key.charAt(0).toUpperCase() + key.slice(1)} key={key}>
                    <Input
                        value={value}
                        onChange={(e) => setCurrentItem({ ...currentItem, [key]: e.target.value })}
                        placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                    />
                </Form.Item>
            );
        });
    };

    return (
        <>
            {canCreate &&
                <Row style={{ marginBottom: 16 }} className='items-end justify-end w-full'>
                    <Col>
                        {<Button icon={<PlusOutlined />} onClick={() => {
                            handleCreateEdit();
                            setCurrentItem({});
                        }} type="primary">Create</Button>}
                    </Col>
                </Row>
            }
            {isLoading ? <Table columns={[]} dataSource={[]} /> : (
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey={(record) => record['id'] || Math.random().toString(36).substring(2, 15)}
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: 'max-content' }}
                />
            )}

            <Modal visible={isModalVisible} footer={null} onCancel={handleCancel}>
                {imageUrl && <img src={imageUrl} alt="Image" />}
            </Modal>

            <Modal
                title={isEditMode ? 'Edit Item' : 'Create Item'}
                visible={isModalVisible}
                onOk={handleSave}
                onCancel={() => setIsModalVisible(false)}
                destroyOnClose
            >
                <Form>{renderFormFields()}</Form>
            </Modal>
        </>
    );
};

export default DynamicTable;