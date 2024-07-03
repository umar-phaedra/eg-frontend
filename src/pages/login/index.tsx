import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Row, Col, Typography } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { ApiTypes } from '../../services/types/api-types';
import { apis } from '../../services/apis';
import { useAuth } from '../../context/auth-context';
import { routes } from '../../services/constants';
import './login.css';

const { Title } = Typography;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (values: ApiTypes.Login) => {
    try {
      const resp = await apis.login(values);
      const {access_token = '', user = {}} = resp.data;
      login(access_token, user);
      toast.success('Login Successful.');
      navigate(routes.dashboard);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleSignup = () => {
    navigate(routes.signup);
  };

  return (
    <Row align="middle" justify="center" className="login-container">
      <Col xs={22} sm={16} md={12} lg={8}>
        <div className="form-container">
          <Title level={2} className="form-title">Login</Title>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={handleLogin}
          >
            <Form.Item
              name="email"
              rules={[
                { 
                  required: true, 
                  message: 'Please input your email!', 
                  type: 'email' 
                }
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-button">
                Login
              </Button>
            </Form.Item>
          </Form>
          <div className="signup-area">
            <Typography.Text>Don't have an account?</Typography.Text>
            <Button type="link" onClick={handleSignup}>
              Sign Up
            </Button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
