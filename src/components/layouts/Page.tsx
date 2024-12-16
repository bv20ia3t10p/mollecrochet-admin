
import React, { useState } from 'react';
import { Divider, Layout, Menu, Row, Typography } from 'antd';
import { UserOutlined, AppstoreAddOutlined, FileTextOutlined, HomeOutlined, CarOutlined, PictureOutlined, BookOutlined, CommentOutlined, LogoutOutlined } from '@ant-design/icons';
import { IProp } from '../../interfaces/IProp';
import { useNavigate } from 'react-router';

const { Sider, Content } = Layout;

export const Page: React.FC<IProp> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const navi = useNavigate();
    // Handle menu item click (you can replace this with actual routing logic)

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Row className='absolute z-10 w-[100vw] h-[6vh] bg-pink-600 flex items-center justify-center align-middle' align={'bottom'} justify={'start'}>
                <Typography.Title level={5} className='font-sans'
                    style={{
                        color: 'white',
                        letterSpacing: '1vw',
                        fontStyle: 'italic'
                    }}>
                    Mollecrochet @ admin
                </Typography.Title >
            </Row>
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
                    background: '#ffffff',
                    marginTop: '6vh'
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
                            case '5':
                                navi("/manage/images");
                                break;
                            case '6':
                                navi("/manage/sizes");
                                break;
                            case '7':
                                navi("/manage/comments");
                                break;
                            case '8':
                                navi("/");
                                localStorage.clear();
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
                    <Menu.Item key="5" icon={<PictureOutlined />}>
                        Images
                    </Menu.Item>
                    <Menu.Item key="6" icon={<BookOutlined />}>
                        Sizes
                    </Menu.Item>
                    <Menu.Item key="7" icon={<CommentOutlined />}>
                        Comments
                    </Menu.Item>
                    <Menu.Item key="8" icon={<LogoutOutlined />}>
                        Logout
                    </Menu.Item>
                </Menu>
            </Sider>

            {/* Main Content */}
            <Layout>

                <Content
                    style={{
                        padding: '20px',
                        paddingTop: '8vh',
                        minHeight: '100vh',
                        overflowX:'hidden'
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

