import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Row, Col, Typography } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { ApiTypes } from '../../services/types/api-types';
import { apis } from '../../services/apis';
import { useAuth } from '../../context/auth-context';
import { routes } from '../../services/constants';
import { useLoader } from '../../services/utils/loader-hook';
import './login.css';

const { Title } = Typography;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { loading, invokeApi } = useLoader()

  const handleLogin = async (values: ApiTypes.Login) => {
    invokeApi({
      api: async () => await apis.login(values),
      callBack: (data: ApiTypes.AuthResponse) => {
        const { access_token = '', user } = data;
        login(access_token, user)
        toast.success('Login Successful.');
        navigate(routes.dashboard); 
      },
      errorCallback: (err: any) => {
        toast.error(err?.response?.data?.message || 'Login failed');
      }
    });
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
              <Button loading={loading} type="primary" htmlType="submit" className="login-button">
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
