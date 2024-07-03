import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu, Typography} from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/auth-context';
import './dashboard.css';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { clearToken, user } = useAuth();

  const handleLogout = async () => {
    clearToken();
    toast.info('Logged Out Successfully');
    navigate('/login');
  };

  return (
    <Layout className="dashboard-layout">
      <Header className="dashboard-header">
        <div className="logo">Easy Generator Authentication App</div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['user']} items={[
          {
            key: 'user',
            icon: <UserOutlined />,
            label: user?.name,
          },
          {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Logout',
            onClick: handleLogout,
          },
        ]} />
      </Header>
      <Content className="dashboard-content">
        <div className="greeting-container">
          <Title level={2}>Greetings! Welcome to the Dashboard</Title>
        </div>
      </Content>
      <Footer className="dashboard-footer">
        EG-Authentication App Created by <b>Umar Farooq</b>
      </Footer>
    </Layout>
  );
};

export default Dashboard;
