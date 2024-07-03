import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Row, Col, Typography } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { apis } from '../../services/apis';
import { ApiTypes } from '../../services/types/api-types';
import { routes } from '../../services/constants';
import { useAuth } from '../../context/auth-context';
import { useLoader } from '../../services/utils/loader-hook';
import './signup.css';

const { Title, Text } = Typography;

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const { login } = useAuth()
  const { loading, invokeApi } = useLoader()

  const handleSignup = async (values: ApiTypes.Signup) => {
      invokeApi({
        api: async () => await apis.signup(values),
        callBack: (data: ApiTypes.AuthResponse) => {
          const { access_token = '', user } = data
          login(access_token, user)
          toast.success('Signup Successfully.')
          navigate(routes.dashboard);
        },
        errorCallback:(err: any) => {
          toast.error(err?.response?.data?.message)
        }
      })
  };

  const handleLogin = () => {
    navigate(routes.login)
  }

  const validatePassword = (rule: any, value: string) => {
    if (!value) {
      return Promise.reject('Please input your password!');
    }
    if (value.length < 8) {
      return Promise.reject('Password must be at least 8 characters long');
    }
    if (!/[A-Za-z]/.test(value)) {
      return Promise.reject('Password must contain at least one letter');
    }
    if (!/\d/.test(value)) {
      return Promise.reject('Password must contain at least one number');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return Promise.reject('Password must contain at least one special character');
    }
    return Promise.resolve();
  };

  return (
    <Row align="middle" justify="center" className="signup-container">
      <Col xs={22} sm={16} md={12} lg={8}>
        <div className="form-container">
          <Title level={2} className="form-title">Signup</Title>
          <Form
            name="signup"
            initialValues={{ remember: true }}
            onFinish={handleSignup}
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Please input your name!', type: 'string' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Name" />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ validator: validatePassword }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
            </Form.Item>

            <Form.Item>
              <Button loading={loading} type="primary" htmlType="submit" className="signup-button">
                Sign Up
              </Button>
            </Form.Item>
          </Form>
          <div className="password-requirements">
            <Text>Password must:</Text>
            <ul>
              <li>
                {password.length >= 8 ? <CheckOutlined /> : <CloseOutlined />} Be at least 8 characters long
              </li>
              <li>
                {/[A-Za-z]/.test(password) ? <CheckOutlined /> : <CloseOutlined />} Contain at least one letter
              </li>
              <li>
                {/\d/.test(password) ? <CheckOutlined /> : <CloseOutlined />} Contain at least one number
              </li>
              <li>
                {/[!@#$%^&*(),.?":{}|<>]/.test(password) ? <CheckOutlined /> : <CloseOutlined />} Contain at least one special character
              </li>
            </ul>
          </div>
          <div className="signup-area">
            <Typography.Text>Already have an account?</Typography.Text>
            <Button type="link" onClick={handleLogin}>
              Login
            </Button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Signup;
