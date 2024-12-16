import { DollarCircleOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Col, Divider, Progress, Row, Statistic } from 'antd';
import React from 'react';
import useFirestoreCollection from '../hooks/useFirestoreCollection';
import { OrderTable } from './tables/OrderTable';

// // Sample Data (this should be replaced with real data from your API or store)
// const users = [
//     { id: 'AOWXm0ngKuXllKzXtWh5nxskoj73', username: 'Vo Tan Tien', phone: '0379743117' },
//     { id: 'BOWXm0ngKuXllKzXtWh5nxskoj74', username: 'Nguyen Thi Mai', phone: '0379743118' },
//     // Add more users...
// ];

// const orders = [
//     { orderId: '1', date: '2024-11-18', addressId: '-OBzRHXZV1lSXkuoengQ', product: 'Keychain yellow' },
//     { orderId: '2', date: '2024-11-19', addressId: '-OBzQqHcBY5sqXNdj-U_', product: 'Phone Case Red' },
//     // Add more orders...
// ];

// const addresses = [
//     { address: '372, street A, Distrct TD, HCM City', isDefault: false, name: 'Vo Tan Tien', phone: '0379743117', uid: 'AOWXm0ngKuXllKzXtWh5nxskoj73' },
//     { address: '123 street A, District, HCM City', isDefault: false, name: 'Vo Tan Tien', phone: '0379743117', uid: 'AOWXm0ngKuXllKzXtWh5nxskoj73' },
//     { address: '345 street B, District 1, HCM City', isDefault: true, name: 'Vo Tan Tien', phone: '0379743117', uid: 'AOWXm0ngKuXllKzXtWh5nxskoj73' },
//     // Add more addresses...
// ];

const Dashboard: React.FC = () => {
    const { data: users } = useFirestoreCollection('Users');
    const { data: orders } = useFirestoreCollection('Orders');

    const ordersCount = orders?.length;
    const usersCount = users?.length;
    const productsCount = orders?.length; // Assuming one product per order
    const totalEarning = orders?.reduce((prev, cur) => ((prev.price ?? 0) * (prev.quantity ?? 0)) + ((cur.price ?? 0) * (cur.quantity ?? 0)), 0);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const countUniqueUidsInOrders = (orders: any[], users: any[]) => {
        const uniqueUids = new Set();

        // Iterate through the orders and add the unique uid to the Set
        orders.forEach(order => {
            const user = users.find(user => user.id === order.uid); // Find the user for the order
            if (user) {
                uniqueUids.add(user.id); // Add the user id (uid) to the Set
            }
        });

        return uniqueUids.size; // The size of the Set gives the count of unique uids
    };

    // Sample usage inside your component:
    const uniqueOrderedUserCount = countUniqueUidsInOrders(orders ?? [], users ?? []);

    return (
        <>
            <Row gutter={16}>
                {/* Total Users */}
                <Col className='mt-4'>
                    <Card>
                        <Statistic
                            title="Total Users"
                            value={usersCount}
                            prefix={<UserOutlined />}
                            valueStyle={{ color: '#3f8600' }}
                        />
                    </Card>
                </Col>
                {/* Total Orders */}
                <Col className='mt-4'>
                    <Card>
                        <Statistic
                            title="Total Orders"
                            value={ordersCount}
                            prefix={<ShoppingCartOutlined />}
                            valueStyle={{ color: '#3f8600' }}
                        />
                    </Card>
                </Col>
                {/* Total Products */}
                <Col className='mt-4'>
                    <Card>
                        <Statistic
                            title="Total Products"
                            value={productsCount}
                            prefix={<ShoppingCartOutlined />}
                            valueStyle={{ color: '#3f8600' }}
                        />
                    </Card>
                </Col>
                {/* Shipped Orders */}
                <Col className='mt-4'>
                    <Card>
                        <Statistic
                            title="Shipped Orders"
                            value={totalEarning}
                            prefix={<DollarCircleOutlined />}
                            valueStyle={{ color: '#3f8600' }}
                        />
                    </Card>
                </Col>
            </Row>
            <Divider />
            <OrderTable />

            {/* Shipping Status */}
            <Row style={{ marginTop: 24 }}>
                <Col span={24}>
                    <Card title="Users status">
                        <Progress
                            percent={((uniqueOrderedUserCount ?? 1) / (usersCount ?? 1)) * 100}
                            status="active"
                            strokeColor="#52c41a"
                            format={(percent) => `${percent}% of users have made their orders`}
                        />
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Dashboard;
