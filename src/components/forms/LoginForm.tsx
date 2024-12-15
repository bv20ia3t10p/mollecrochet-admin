import React from "react";
import { Button, Form, Input, Row, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import { useAuthService } from "../../hooks/useAuthService";

export const LoginForm: React.FC = () => {
    const { isLoggingIn, login } = useAuthService();
    const [form] = useForm();
    return (
        <div className="container p-8 mx-auto my-auto bg-grey-100">
            <Form
                disabled={isLoggingIn}
                form={form}
                layout="vertical"
                initialValues={{
                    email: '',
                    password: ''
                }}
                className="container"
                onFinish={(values) => {
                    login({ ...values });
                }}>
                <Typography.Title>Welcome, manager!</Typography.Title>
                <Form.Item label="Enter your email, manager!" name="email">
                    <Input addonBefore={<UserOutlined />} placeholder="Enter your email here please, we'll know if you're our manager or not" />
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input.Password addonBefore={<KeyOutlined />} placeholder="password" />
                </Form.Item>
                <Row justify={"end"}>
                    <Form.Item
                        label={
                            <Typography>
                                Sign in over here!
                            </Typography>
                        }
                        labelAlign="right">
                        <Row justify={"end"}>
                            <Button loading={isLoggingIn} type="primary" htmlType="submit">
                                Login
                            </Button>
                        </Row>
                    </Form.Item>
                </Row>
            </Form>
        </div>
    );
};

export default LoginForm;
