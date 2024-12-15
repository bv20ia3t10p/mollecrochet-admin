
import React, { useState } from 'react';
import { Divider, Layout, Menu } from 'antd';
import { UserOutlined, AppstoreAddOutlined, FileTextOutlined, HomeOutlined, CarOutlined } from '@ant-design/icons';
import { IProp } from '../../interfaces/IProp';
import { useNavigate } from 'react-router';

const { Sider, Content } = Layout;

export const Page: React.FC<IProp> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const navi = useNavigate();
    // Handle menu item click (you can replace this with actual routing logic)

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* Sidebar */}
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={setCollapsed}
                breakpoint="lg"
                width={250}
                className="pt-[1vh] px-[0.5vw] custom-sider overflow-hidden"
                color='primary'
                style={{
                    background: '#ffffff'
                }}
            >
                <div className="w-full overflow-hidden">
                    <img className='object-fill w-full h-full'
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRznF5YdA3Qs4coe_090sxgzIfnm3qmNStLhg&s" // Replace with your image URL
                    />
                </div>
                <Divider variant='solid' />
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['0']}
                    onClick={(e) => {
                        switch (e.key) {
                            case '1':
                                navi('/manage/users');
                                break;
                            case '2':
                                navi("/manage/products");
                                break;
                            case '3':
                                navi("/manage/orders");
                                break;
                            case '4':
                                navi("/manage/addresses");
                                break;
                            default:
                                navi("/manage");
                        }
                    }}
                >
                    <Menu.Item key="0" icon={<HomeOutlined />}>
                        Home
                    </Menu.Item>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        Users
                    </Menu.Item>
                    <Menu.Item key="2" icon={<AppstoreAddOutlined />}>
                        Products
                    </Menu.Item>
                    <Menu.Item key="3" icon={<FileTextOutlined />}>
                        Orders
                    </Menu.Item>
                    <Menu.Item key="4" icon={<CarOutlined />}>
                        Addresses
                    </Menu.Item>
                </Menu>
            </Sider>

            {/* Main Content */}
            <Layout>

                <Content
                    style={{
                        padding: '20px',
                        minHeight: '100vh',
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

